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

      // Here is some AI-generated response
      if (userMessage.includes("gold medals")) {
        responseText = "In the past few years, the top gold medal winners have been the USA, China, and Russia. The USA won 39 gold medals in the Tokyo 2020 Olympics, China won 38, and Japan won 27.";
      } else if (userMessage.includes("sports")) {
        responseText = "The Olympics feature a wide range of sports, including Athletics, Swimming, Gymnastics, Basketball, Football (Soccer), Boxing, and many more. In total, there are over 30 sports and hundreds of events.";
      } else if (userMessage.includes("countries")) {
        responseText = "Over 200 countries participate in the Olympics. Some of the most successful countries in terms of medal counts are the USA, China, Russia, and Germany.";
      } else if (userMessage.includes("schedule")) {
        responseText = "The Olympic events are scheduled across two weeks. For detailed schedules, you can visit the official Olympics website or check sports-specific schedules on popular sports news websites.";
      } else if (userMessage.includes("records")) {
        responseText = "Some of the most famous Olympic records include Usain Bolt's 100m sprint record of 9.58 seconds and Michael Phelps' 23 Olympic gold medals. New records are often set during each Olympic Games.";
      } else if (userMessage.includes("history")) {
        responseText = "The Olympic Games have a rich history dating back to ancient Greece in 776 BC. The modern Olympics began in 1896 in Athens, and they have since become the world's leading sports event, held every four years.";
      } else if (userMessage.includes("opening ceremony")) {
        responseText = "The Olympic opening ceremony is a grand event featuring the parade of nations, the lighting of the Olympic flame, and performances showcasing the host nation's culture. It's a celebration watched by millions worldwide.";
      } else if (userMessage.includes("closing ceremony")) {
        responseText = "The closing ceremony marks the end of the Olympics, featuring the lowering of the Olympic flag, speeches, and performances. The Olympic flame is extinguished, symbolizing the end of the Games.";
      } else if (userMessage.includes("medal tally")) {
        responseText = "The current Olympic medal tally shows the USA leading with the most gold medals, followed by China and Russia. You can find the latest updates on the official Olympics website or sports news channels.";
      } else if (userMessage.includes("help")) {
        responseText = "I'm here to help! You can ask me about: \n- Gold medal winners\n- Olympic sports\n- Participating countries\n- Event schedule\n- Olympic records\n- Olympic history\n- Opening ceremony\n- Closing ceremony\n- Medal tally";
      } else {
        responseText = "I'm not sure how to help with that. Try asking about Olympic sports, gold medals, or type 'help' for more options.";
      }
    }
  }

  // Return plain text instead of JSON
  return new NextResponse(responseText, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}
