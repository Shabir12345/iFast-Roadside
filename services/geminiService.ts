import { GoogleGenAI } from "@google/genai";

const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI(apiKey) : null;

const SYSTEM_INSTRUCTION = `
You are the AI Dispatch Assistant for "iFAST Roadside & Mobile Tires".
Your goal is to be helpful, calm, and professional to stranded motorists.

PRIMARY FOCUS:
You specialize in the East GTA area, specifically: Pickering, Ajax, Whitby, Oshawa, and Scarborough.
If a user mentions these areas, confirm that we have local dispatch units nearby and can arrive within 15-30 minutes.

SERVICES & PRICING:
You can answer questions about services:
- Mobile Tire Change: Starts at $75
- Jump Start: Starts at $50
- Lockout: Starts at $65
- Fuel: Starts at $45 + fuel cost
- Towing: Starts at $95

IMPORTANT RULES:
1. You CANNOT give exact final prices. Always use "starts at".
2. Always advise users to call +1 437-215-3468 for immediate emergency service, especially if they are in danger.
3. Keep responses concise (under 50 words).
4. Do not use excessive markdown formatting.
5. If the user is in the West End (Mississauga, Brampton, etc.), let them know our primary rapid response zone is the East GTA, but we may still be able to help (refer to dispatch).
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