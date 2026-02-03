import { GoogleGenAI } from "@google/genai";
import { PIXEL_ART_PROMPT_TEMPLATE, BACKGROUND_PROPS } from "../constants";
import { GenerationOptions } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePixelSprite(options: GenerationOptions): Promise<string> {
  let prompt = PIXEL_ART_PROMPT_TEMPLATE
    .replace('{{SUBJECT}}', options.subject)
    .replace('{{RESOLUTION}}', options.resolution)
    .replace('{{MAX_COLORS}}', options.maxColors.toString());
  
  // Construct Background Instruction
  let bgInstruction = "";
  
  if (options.bgType === 'solid') {
    bgInstruction = "Single solid flat color. Ensure high contrast with the character to define edges without outlines.";
  } else {
    // Banded
    bgInstruction = `${options.bgBandCount} ${options.bgOrientation} flat color bands. Clean, hard edges. No gradients.`;
  }

  // Props Instruction
  const propsInstruction = options.includeProps ? BACKGROUND_PROPS : "No objects in background.";

  prompt = prompt.replace('{{BACKGROUND_INSTRUCTION}}', bgInstruction);
  prompt = prompt.replace('{{PROPS_INSTRUCTION}}', propsInstruction);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ],
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("The model failed to generate content (No candidates returned). It might have been blocked by safety filters.");
    }

    const candidate = response.candidates[0];
    const parts = candidate.content?.parts;
    
    if (!parts || parts.length === 0) {
      throw new Error("The model returned an empty response.");
    }

    // Look for the part with inlineData (the image)
    const imagePart = parts.find(p => p.inlineData);

    if (imagePart && imagePart.inlineData) {
      return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
    }

    // Check if the model returned text instead (e.g. "I cannot generate this...")
    const textPart = parts.find(p => p.text);
    if (textPart && textPart.text) {
      throw new Error(`Model response: ${textPart.text}`);
    }

    throw new Error("No image data found in generation response.");

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    throw new Error(error.message || "Failed to generate pixel art.");
  }
}