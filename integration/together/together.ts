// import Together from "together-ai";
// import { postGeneratorTemplate } from "./prompts";

// const together = new Together();

// export default class TogetherAIServices {
//   async generatePost(topic: string, tone: string) {
//     const systemMessage = postGeneratorTemplate({ topic, tone });

//     const response = await together.chat.completions.create({
//       model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
//       messages: [
//         { role: "system", content: "You are an expert LinkedIn content writer." },
//         { role: "user", content: systemMessage }, // <== Force it to generate a post
//       ],
//     });

//     return response.choices?.[0]?.message?.content || "No response generated.";
//   }
// }

import Together from "together-ai";
import { postGeneratorTemplate } from "./prompts";

export default class TogetherAIServices {
  private llm: Together;

  constructor() {
    if (!process.env.NEXT_PUBLIC_TOGETHER_API_KEY) {
      throw new Error("TOGETHER_API_KEY is missing. Set it in environment variables.");
    }

    this.llm = new Together({
      apiKey: process.env.TOGETHER_API_KEY, // Explicit API key
    });
  }

  async generatePost(topic: string, tone: string) {
    const systemMessage = postGeneratorTemplate({ topic, tone });

    try {
      const response = await this.llm.chat.completions.create({
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
        messages: [
          { role: "system", content: "You are an expert LinkedIn content writer." },
          { role: "user", content: systemMessage }, // Make sure the AI knows to generate a post
        ],
      });

      return response.choices?.[0]?.message?.content ?? "Failed to generate a LinkedIn post.";
    } catch (error) {
      console.error("Error generating post:", error);
      return "Error generating post. Please try again.";
    }
  }
}

