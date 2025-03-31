import OpenAIServices from "../../../../integration/together/together";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const openai = new OpenAIServices();
  const { prompts, voice } = await request.json();
  const response = await openai.generatePost(prompts, voice);
  return NextResponse.json(response);
}
