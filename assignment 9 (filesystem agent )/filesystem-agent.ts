import "dotenv/config";
import fs from "fs-extra";
import path from "path";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

const dir = "./files";
fs.ensureDirSync(dir);
const p = (f) => path.join(dir, f);


const tools = [
    new DynamicStructuredTool({
        name: "list_files",
        description: "List files",
        schema: z.object({}),
        func: async () => (await fs.readdir(dir)).join(", ") || "No files",
    }),
    new DynamicStructuredTool({
        name: "read_file",
        description: "Read file",
        schema: z.object({ filename: z.string() }),
        func: async ({ filename }) =>
            (await fs.pathExists(p(filename)))
                ? fs.readFile(p(filename), "utf8")
                : "Not found",
    }),
    new DynamicStructuredTool({
        name: "write_file",
        description: "Write file",
        schema: z.object({ filename: z.string(), content: z.string() }),
        func: async ({ filename, content }) => {
            await fs.writeFile(p(filename), content);
            return "Done";
        },
    }),
];


const agent = createReactAgent({
    llm: new ChatOpenAI({
        apiKey: process.env.OPENROUTER_API_KEY,
        model: "google/gemini-2.0-flash-001",
        configuration: { baseURL: "https://openrouter.ai/api/v1" },
    }),
    tools,
});

const r = await agent.invoke({
    messages: [{ role: "user", content: "Create hello.txt with Hello World then read it" }],
});

console.log(r.messages[r.messages.length - 1].content);
