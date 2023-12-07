### Introduction
This API provides functionalities for summarizing emails, analyzing sentiment, and determining if a response is expected.

### Technologies Used

* **Express:** Web framework for building server-side applications.
* **Body-Parser:** Middleware for parsing JSON data in POST requests.
* **OpenAI:** API for accessing OpenAI's large language models.
* **GPT-3.5-Turbo:** Specific OpenAI engine used for generating summaries and analyzing sentiment.

### API Endpoints

* **POST /EmailSummarizer/email**
    * This endpoint takes an email body as input and returns a JSON object containing the following information:
        * **summary:** A short summary of the email content.
        * **sentiment:** The sentiment of the email (positive, negative, or neutral).
        * **awaitingResponse:** Whether the email indicates an expectation for a response.

### Request Format

* **Method:** POST
* **URL:** /EmailSummarizer/email
* **Body:** JSON object with the following property:
    * **emailText:** The email body to be analyzed.

### Response Format

* **Status Code:**
    * 200: Successful operation.
    * 500: Internal server error.
* **Body:** JSON object with the following properties:
    * **summary:** A string containing the email summary.
    * **sentiment:** A string representing the email sentiment ("positive", "negative", or "neutral").
    * **awaitingResponse:** A boolean indicating whether a response is expected (true) or not (false).

### Error Handling

* Internal server errors will be logged and a generic error message will be returned to the client.
* Specific error messages may be added in future versions for more informative error handling.

### Notes

* This API uses OpenAI's GPT-3.5-Turbo engine, which is a powerful language model but may not always be perfect.
* The accuracy of the summary and sentiment analysis may vary depending on the complexity and style of the email.
* The awaitingResponse detection is based on simple heuristics and may not be accurate in all cases.

### Using Email Summarizer API with example email

Here's how to use the Email Summarizer API with the provided example email:

**1. Prepare the request body:**

```json
{
  "emailText": "Hey Shiri, it was a pleasure meeting you this morning. I am attaching the exercise we are giving Fullstack Developer candidates. I'll be happy to see the results whenever you're ready. Please feel free to contact me via email or phone for whatever you need. Good luck and speak soon."
}
```

**2. Send a POST request to the API endpoint:**


curl -X POST -H "Content-Type: application/json" -d @request.json http://localhost:8080/EmailSummarizer/email


**3. Parse the response:**

```json
{
  "summary": "Shiri received an exercise for Fullstack Developer candidates and is ready to review it whenever she's ready. She can be contacted for any questions.",
  "sentiment": "positive",
  "awaitingResponse": false
}
```

**Interpretation:**

* **Summary:** The email is about an exercise for Fullstack Developer candidates sent to Shiri. She is happy to review it whenever she is ready and can be contacted for any questions.
* **Sentiment:** The email is positive in tone.
* **Awaiting Response:** The email does not explicitly ask for a response, so it is marked as "false".

This information can be used for various purposes, such as:

* Quickly understanding the key points of an email.
* Identifying the sentiment of an email without reading it in full.
* Determining if an email requires a response.

**Note:** The API utilizes OpenAI's GPT-3.5-Turbo model, which while powerful, may not always provide perfect accuracy. The results should be interpreted with consideration for the limitations of the model.
