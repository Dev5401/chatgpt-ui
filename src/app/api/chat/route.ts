export async function POST() {
  const mockStream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(
        encoder.encode('Hello! This is a mock AI response. Hello! This is a mock AI response.')
      );
      controller.enqueue(encoder.encode('(Your OpenAI quota is exhausted.)'));
      controller.close();
    },
  });

  return new Response(mockStream);
}
