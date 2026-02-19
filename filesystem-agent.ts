import "dotenv/config";
import fs from "fs-extra";
import path from "path";

import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { DynamicStructuredTool } from "@langchain/core/tools";

import { z } from "zod";


const BASE_DIR = "./files";
fs.ensureDirSync(BASE_DIR);



// List files
const listFilesTool = new DynamicStructuredTool({
    name: "list_files",
    description: "List all files in the folder",
    schema: z.object({}),
    func: async () => {
        const files = await fs.readdir(BASE_DIR);
        return files.join(", ") || "No files found";
    },
});

// Read file
const readFileTool = new DynamicStructuredTool({
    name: "read_file",
    description: "Read file content",
    schema: z.object({
        filename: z.string(),
    }),
    func: async ({ filename }) => {
        const filePath = path.join(BASE_DIR, filename);

        if (!fs.existsSync(filePath)) {
            return "File not found";
        }

        return await fs.readFile(filePath, "utf-8");
    },
});

// Write file
const writeFileTool = new DynamicStructuredTool({
    name: "write_file",
    description: "Write content to file",
    schema: z.object({
        filename: z.string(),
        content: z.string(),
    }),
    func: async ({ filename, content }) => {
        const filePath = path.join(BASE_DIR, filename);

        await fs.writeFile(filePath, content);
        return `File ${filename} created successfully`;
    },
});



const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
});



const agent = createReactAgent({
    llm: model,
    tools: [listFilesTool, readFileTool, writeFileTool],
});



async function run() {
    const res = await agent.invoke({
        messages: [
            {
                role: "user",
                content:
                    "Create file hello.txt with content Hello World then read it",
            },
        ],
    });

    console.log("\n🤖 Agent Response:\n");
    console.log(res.messages[res.messages.length - 1].content);
}

run();
