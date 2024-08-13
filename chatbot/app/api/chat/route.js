import { NextResponse } from 'next/server';

export async function POST(req) {
  const data = await req.json();
  console.log(data);

  let responseText = "Hello from the server!";

  // Make sure data is an array or can't find user message
  if (Array.isArray(data)) {
    const userMessages = data.filter(item => item.role === 'user');

    if (userMessages.length > 0) {
      const userMessage = userMessages[userMessages.length - 1].content;
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.LLAMA_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "meta-llama/llama-3.1-8b-instruct:free",
          "messages": [
            {"role": "user", "content": userMessage},
          ],
          "top_p": 1,
          "temperature": 1,
          "repetition_penalty": 1,
        })
      })
      const apiResponseData = await response.json();
      // Assuming the API returns a 'choices' array with a 'text' field
      if (apiResponseData.choices && apiResponseData.choices.length > 0) {
        responseText = apiResponseData.choices[0].message.content;
      }
    }
  }

  // Return plain text instead of JSON
  return new NextResponse(responseText, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}
