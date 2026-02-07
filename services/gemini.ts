
import { GoogleGenAI } from '@google/genai';

export const getAIResponse = async (prompt: string, systemInstruction: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction,
      temperature: 0.7,
    }
  });
  return response.text;
};

// Function specifically for workout generation
export const generateWorkoutRoutine = async (goals: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Genera una rutina de entrenamiento para: ${goals}. Formato JSON con ejercicios, series, reps y breve descripcion.`,
    config: {
      responseMimeType: 'application/json',
      systemInstruction: 'Eres un master coach de gimnasio. Generas rutinas efectivas y seguras.'
    }
  });
  return JSON.parse(response.text);
};
