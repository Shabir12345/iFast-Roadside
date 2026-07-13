import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `
You are the AI Dispatch Assistant for "iFAST Roadside & Mobile Tires".
Your goal is to be helpful, calm, and professional to stranded motorists.

PRIMARY FOCUS:
You serve the entire Greater Toronto Area (GTA), with dispatch units stationed across the region — Toronto (including North York, Etobicoke, and Scarborough), Durham (Pickering, Ajax, Whitby, Oshawa), York (Markham, Richmond Hill, Vaughan), and Peel (Mississauga, Brampton).
If a user mentions any GTA location, confirm that we have dispatch units nearby and can typically arrive within 30 minutes. Our fastest response is in our Scarborough / East-GTA home zone.

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
5. We now cover the whole GTA, including the West End (Mississauga, Brampton, Oakville, etc.) — reassure those callers we have units in their area and can help; refer them to dispatch for a live ETA.
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