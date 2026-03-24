import { GoogleGenAI } from "@google/genai";

const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI(apiKey) : null;

const SYSTEM_INSTRUCTION = `
You are the AI Dispatch Assistant for "iFAST Roadside & Mobile Tires".
Your goal is to be helpful, calm, and professional to stranded motorists.
You can answer questions about services: Mobile Tire Change, Jump Starts, Lockouts, Fuel Delivery, and Towing.
You CANNOT give exact final prices, but you can give "starting at" estimates based on standard industry rates if not provided in context, but prefer referencing:
- Tire Change: Starts at $75
- Jump Start: Starts at $50
- Lockout: Starts at $65
- Fuel: Starts at $45 + fuel cost
- Towing: Starts at $95

Always advise the user to call +1 437-215-3468 for immediate emergency service if they are in danger or on a busy highway.
Keep responses concise (under 50 words) as users are likely on mobile phones and in a hurry.
Do not use markdown formatting like bold or italics excessively.
`;

export const sendMessageToGemini = async (history: string[], newMessage: string): Promise<string> => {
  if (!apiKey) {
    return "I'm currently offline (API Key missing). Please call us directly.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: `Conversation History:\n${history.join('\n')}\n\nUser: ${newMessage}` }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I'm having trouble connecting. Please call us directly.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I can't process that right now. Please call our dispatch line.";
  }
};