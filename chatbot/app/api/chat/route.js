


import { NextResponse } from 'next/server'

export async function POST(req) {
  const data = await req.json();
  console.log(data);

  let responseText = "Hello from the server!";

  if (data.message) {
    const message = data.message.toLowerCase();

    if (message.includes("gold medals")) {
      responseText = "Here is the list of gold medal winners in the past few years: [Insert gold medal winners list]";
    } else if (message.includes("sports")) {
      responseText = "Here is the list of all Olympic sports: [Insert list of Olympic sports]";
    } else if (message.includes("help")) {
      responseText = `I'm here to help! You can ask me:
        1. Type "Gold Medals" to ask about who has won the gold medal in the past few years.
        2. Type "sports" for me to send a list of all Olympic sports.
        3. Type "events" to get the schedule of events.
        4. Type "countries" to get information about participating countries.`;
    }
  }

// testing return a JSON response using NextResponse.json

// const stream = new ReadableStream({
//     async start(controller) {
//       const encoder = new TextEncoder();
//       try {
//         const text = encoder.encode(responseText);
//         controller.enqueue(text);
//       } catch (err) {
//         controller.error(err);
//       } finally {
//         controller.close();
//       }
//     }
//   });

  return NextResponse.json({ message: responseText });
}





