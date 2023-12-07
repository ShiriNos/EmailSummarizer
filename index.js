const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const ENGINE_ID = 'gpt-3.5-turbo';

app.listen(PORT, () => console.log(`It's alive at: http://localhost:${PORT}/`));

app.post('/EmailSummarizer/email', async (req, res) => {
  try {
    const emailText = req.body.emailText;

    const summary = await generateOpenAISummary(emailText);
    const sentiment = await generateOpenAISentiment(emailText);
    const awaitingResponse = determineIfAwaitingResponse(emailText);

    res.status(200).json({
      summary,
      sentiment,
      awaitingResponse,
    });
  } catch (error) {
    console.error('Error processing the request:', error);
    //console.error(error.stack); // Log the error stack for detailed information
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function generateOpenAISummary(emailText) {
  const response = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'Summarize the following email:' },{ role: 'user', content: emailText }],
    model: ENGINE_ID,
    max_tokens: 150,
    temperature: 0.5,
  });

  return response.choices[0].message.content || 'Unable to generate summary';
}

async function generateOpenAISentiment(emailText) {
  const response = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'Analyze the sentiment of the following email: ' },{ role: 'user', content: emailText }],
    model: ENGINE_ID,
    max_tokens: 50,
    temperature: 0.5,
  });
  return response.content || 'neutral';
}

function determineIfAwaitingResponse(emailText) {
  const responseKeywords = ['please', 'could you', 'can you', 'let me know', 'get back to me', 'your thoughts'];

  const containsResponseKeyword = responseKeywords.some(keyword => emailText.toLowerCase().includes(keyword));

  return containsResponseKeyword;
}
