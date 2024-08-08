import { NextResponse } from 'next/server'

export async function POST(req) {
  const data = await req.json();
  console.log(data);

  const message = data.message.toLowerCase();
  let responseText = "Hello from the server!";

  if (message.includes("gold medals")) {
    responseText = "Here is the list of gold medal winners in the past few years: [Insert gold medal winners list]";
  } else if (message.includes("sports")) {
    responseText = "Here is the list of all Olympic sports: [Insert list of Olympic sports]";
  } 
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const text = encoder.encode(responseText);
        controller.enqueue(text);
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    }
  });

  return new NextResponse(stream, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
