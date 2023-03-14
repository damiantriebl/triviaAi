'use client'
import { apiKey, npc } from "@/schemas/constants"
import { initialPrompt } from "@/schemas/initialPrompt";
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
    apiKey: "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"
});

interface message {
    role: "user" | "assistant" | "system",
    content: string
}

const messages: message[] = [{ "role": "system", "content": initialPrompt }]

const ApiCall = async (responseDialog: any | null) => {
    if (responseDialog) {
        messages.push({ "role": "user", "content": JSON.stringify(responseDialog) })
    }
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0,
    });
    if (response.data.choices[0].message) {
        messages.push(response.data.choices[0].message)
        console.log('response', response.data.choices[0].message.content)
        return response.data.choices[0].message.content;
    }
    if (response.error) {
        console.log('error', response.error)
    }
    return null;

}
export default ApiCall