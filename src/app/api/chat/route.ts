import { OpenAI } from 'openai';

export async function POST(req: Request) {
  const mockStream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(
        encoder.encode(
          'Hello! This is a mock AI response. Hello! This is a mock AI response.'
        )
      );
      controller.enqueue(encoder.encode('(Your OpenAI quota is exhausted.)'));
      controller.close();
    },
  });

  return new Response(mockStream);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo', // Use 'gpt-4-turbo' for better results
//     messages,
//     stream: true, // Enable streaming
//   });

//   const stream = new ReadableStream({
//     async start(controller) {
//       const encoder = new TextEncoder();
//       for await (const chunk of response) {
//         const content = chunk.choices[0]?.delta?.content || '';
//         controller.enqueue(encoder.encode(content));
//       }
//       controller.close();
//     },
//   });

//   return new Response(stream);
// }
