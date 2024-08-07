import {NextResponse} from 'next/server'
export async function POST(req){
    const data = await req.json()
    console.log(data)
    const stream = new ReadableStream({
        async start(Controller){
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if (content){
                        const text = encoder.encode(content)
                        Controller.enqueue(text)
                    }
                }
            }catch(err){
                Controller.error(err)
            }finally{
                Controller.close()
            }
            
        }
    })
    return NextResponse.json({message:"Hello from the server!"})
}
