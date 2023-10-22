import {NextResponse} from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

// TODO: return array of suggestions for each item
export async function GET() {
  const grocery = "peanut butter";
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: "user", content: `List 3 alternative grocery items to ${grocery}. Do not explain. Separate by a comma. All lowercase.` }],
    model: "gpt-3.5-turbo",
  };

  const completion = await openai.chat.completions.create(params);
  const suggestions = completion.choices[0].message.content.split(/,\s*/);

  return NextResponse.json({ data: suggestions });
}
