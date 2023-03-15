import { initialPrompt } from '@/schemas/initialPrompt';
import { Configuration, OpenAIApi } from 'openai';


interface message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}


export default async function getData(responseDialog: any | null) {
    const configuration = new Configuration({
        apiKey: process.env.apiKEY
    });
    const messages: message[] = [{ role: 'system', content: initialPrompt }];
    console.log('enviroment Variable', process.env.apiKEY);
    console.log('enviroment Variable', process.env.data);

    if (responseDialog) {
        messages.push({ role: 'user', content: JSON.stringify(responseDialog) });
    }
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0,
    });
    if (response.data.choices[0].message) {
        messages.push(response.data.choices[0].message);
        console.log('response', response.data.choices[0].message.content);
        return response.data.choices[0].message.content;
    }
    return null;
};
