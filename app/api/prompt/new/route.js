import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, prompt, tag, foto } = await req.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            foto,
            prompt,
            tag
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })

    } catch (error) {
        return new Response('Failed to create a new post', {status: 500})
    }
}