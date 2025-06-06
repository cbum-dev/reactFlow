
import main from "@/configs/AiModel";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        const ChatReact = `You are an AI Assistant specialized in React Development.
        GUIDELINES:
        - Clearly describe what you're building
        - Keep responses under 15 lines
        - Avoid code examples and commentary`;
        let promptText = "" ;
        if (typeof prompt === 'string') {
            try {
                const messages = JSON.parse(prompt);
                if (Array.isArray(messages) && messages.length > 0) {
                    const lastMessage = messages[messages.length - 1];
                    promptText = lastMessage?.content || prompt;
                } else {
                    promptText = prompt;
                }
            } catch {
                promptText = prompt;
            }
        } else {
            promptText = prompt;
        }

        const result = await main(promptText+ChatReact);
        
        return new Response(JSON.stringify({ result }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error ) {
        console.error("Error in AI chat route:", error);
        return new Response(JSON.stringify({ 
            error: "Failed to generate response",
            details: error instanceof Error ? error.message : 'An unknown error occurred'
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}