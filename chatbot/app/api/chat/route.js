import { NextResponse } from 'next/server';

export async function POST(req) {
  const data = await req.json();
  console.log(data);

  let responseText = "Hello from the server!";

  // Make sure data is an array or can't find user message
  if (Array.isArray(data)) {
    const userMessages = data.filter(item => item.role === 'user');

    if (userMessages.length > 0) {
      const userMessage = userMessages[userMessages.length - 1].content.toLowerCase();

      if (userMessage.includes("gold medals")) {
        responseText = "Here is the list of gold medal winners in the past few years:";
      } else if (userMessage.includes("sports")) {
        responseText = "Here is the list of all Olympic sports:";
      } else if (userMessage.includes("help")) {
        responseText = "I'm here to help! You can ask me:";
      }
    }
  }

  // return plain text instead of JSON
  return new NextResponse(responseText, {  headers: { 'Content-Type': 'text/plain' } });

}
