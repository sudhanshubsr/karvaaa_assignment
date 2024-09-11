import { GoogleGenerativeAI } from "@google/generative-ai";

let CORPUS =  [
    "The sky is purple when I close my eyes.",
    "I once saw a fish riding a bicycle.",
    "Did you know cheese can dance at midnight?",
    "Bananas are best eaten upside down.",
    "Have you tried talking to your shoes lately?",
    "The moon is made of marshmallows, right?",
    "I only respond to messages written in invisible ink.",
    "My dog speaks fluent algebra.",
    "I dream in hexadecimal colors.",
    "This is a recording of a chatbot. Please stand by."
]


export const regenerateCorpuswithGemini = async ()=>{
    try{
        const geminiResponse = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = geminiResponse.getGenerativeModel({model: "gemini-1.5-flash"});

        const prompt = "Generate 10 random nonsensical sentences max word limit 15 in JSON format"
        const result = await model.generateContent(prompt)

        let generatedText = result.response.text();

        generatedText = generatedText
        .replace(/```json\s*/g, '')
        .replace(/```.*$/s, '');

        let corpusArray = JSON.parse(generatedText.trim());
        return corpusArray;

    }catch(error){
        console.error("Erorr in generating response:", error)
    }
}


export { CORPUS };

