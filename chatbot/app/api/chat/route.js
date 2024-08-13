import { SYSTEM_ENTRYPOINTS } from 'next/dist/shared/lib/constants';
import { NextResponse } from 'next/server';

const sysPrompt = "You are a chatbot designed to answer questions specifically about the Olympics, past and current. Remind the user of your purpose if they stray from the topic of Olympics."

export async function POST(req) {
  const data = await req.json();

  const completion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.LLAMA_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "meta-llama/llama-3.1-8b-instruct:free",
      "messages": [
        {"role": "system", "content": sysPrompt},
        ...data
      ],
      "top_p": 1,
      "temperature": 1,
      "repetition_penalty": 1,
      //"stream": true
    })
  })
  const apiResponseData = await completion.json();
  // Assuming the API returns a 'choices' array with a 'text' field
  if (apiResponseData.choices && apiResponseData.choices.length > 0) {
    const responseText = apiResponseData.choices[0].message.content;
    return new NextResponse(responseText, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  // Return plain text instead of JSON
  return new NextResponse("Hello", {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}
