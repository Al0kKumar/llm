import Together from "together-ai";
import { postGeneratorTemplate } from "./prompts";

const together = new Together();

export default class TogetherAIServices {
  async generatePost(topic: string, tone: string) {
    const systemMessage = postGeneratorTemplate({ topic, tone });

    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      messages: [
        { role: "system", content: "You are an expert LinkedIn content writer." },
        { role: "user", content: systemMessage }, // <== Force it to generate a post
      ],
    });

    return response.choices?.[0]?.message?.content || "No response generated.";
  }
}
