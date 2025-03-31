"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Together from "together-ai";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Result from "./Result";

const together = new Together({ apiKey: process.env.NEXT_PUBLIC_TOGETHER_API_KEY });

const FormSchema = z.object({
  prompts: z.string().min(5, {
    message: "Prompt must be at least 5 characters.",
  }),
  voiceTone: z.string().nonempty({
    message: "Voice tone must be selected.",
  }),
});

const Post = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompts: "",
      voiceTone: "",
    },
  });

  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: any) {
    setIsLoading(true);
    try {
      const res = await together.chat.completions.create({
        messages: [{ role: "user", content: data.prompts }],
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      });

      setResponse(res.choices?.[0]?.message?.content || "No content generated");
      form.reset();
    } catch (error) {
      console.error("Error generating post:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col items-center md:mt-10 p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="prompts"
            render={({ field }) => (
              <FormItem>
                <FormControl className="h-16 text-lg">
                  <Input placeholder="Enter Post Topic...word limits.." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <FormField
              control={form.control}
              name="voiceTone"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormControl>
                    <Select
                      onValueChange={(value : any) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full h-12 text-lg">
                        <SelectValue placeholder="Select Tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="casual" className="text-lg">😊 Casual</SelectItem>
                          <SelectItem value="professional" className="text-lg">👔 Professional</SelectItem>
                          <SelectItem value="inspirational" className="text-lg">🌟 Inspirational</SelectItem>
                          <SelectItem value="storytelling" className="text-lg">📖 Storytelling</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full md:w-1/2 h-12 text-lg bg-[#e55c43] hover:bg-[#ff7f66]"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </div>
        </form>
      </Form>
      <Result isLoading={isLoading} response={response} />
    </div>
  );
};

export default Post;
