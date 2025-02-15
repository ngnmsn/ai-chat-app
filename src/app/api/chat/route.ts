import OpenAI from 'openai';

// モックレスポンスを定義
const mockResponse = {
  role: "assistant",
  content: "これはモックレスポンスです。実際のAPIレスポンスの代わりに使用されます。"
};

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  // 開発環境の場合はモックレスポンスを返す
  if (process.env.NODE_ENV === 'development') {
    return Response.json(mockResponse);
  }

  // 本番環境では実際のAPIを使用
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
  });
  
  return Response.json(response.choices[0].message);
}