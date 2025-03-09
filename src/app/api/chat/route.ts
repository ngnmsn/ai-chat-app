import { BedrockAgentRuntimeClient, InvokeAgentCommand } from "@aws-sdk/client-bedrock-agent-runtime";

const client = new BedrockAgentRuntimeClient({
  region: "ap-northeast-1", // 東京リージョン
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

// リトライを実装する関数
const retryWithDelay = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000,
  backoff = 2
): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    if (retries === 0 || error.name !== 'ThrottlingException') {
      throw error;
    }
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryWithDelay(fn, retries - 1, delay * backoff, backoff);
  }
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1].content;

    // AWS Bedrockコンソールで確認できる実際のIDを使用
    const command = new InvokeAgentCommand({
      agentId: process.env.BEDROCK_AGENT_ID || '', // AWS Bedrockコンソールで確認できるエージェントID
      agentAliasId: process.env.BEDROCK_AGENT_ALIAS_ID || '', // AWS Bedrockコンソールで確認できるエイリアスID
      sessionId: "session1", // セッションIDも英数字のみに変更
      inputText: latestMessage,
    });

    // リトライロジックを使用してリクエストを送信
    const response = await retryWithDelay(
      () => client.send(command),
      3, // 最大3回リトライ
      1000 // 初期遅延1秒
    );

    const decoder = new TextDecoder();
    
    // レスポンスストリームを処理
    if (response.completion) {
      const stream = response.completion;
      let fullText = '';

      try {
        for await (const chunk of stream) {
          if (chunk.chunk?.bytes) {
            const text = decoder.decode(chunk.chunk.bytes);
            fullText += text;
            
            // 各チャンクの処理後に短い遅延を入れる
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }

        return new Response(fullText, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        });
      } catch (streamError) {
        console.error("Stream error:", streamError);
        // ストリームでエラーが発生した場合でも、これまでに受信したテキストを返す
        if (fullText) {
          return new Response(fullText, {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
            },
          });
        }
        throw streamError;
      }
    }

    throw new Error("No completion in response");
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process request";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}