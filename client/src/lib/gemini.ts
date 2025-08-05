import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Rubric, EvaluationResult } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);


export async function evaluateSubmission(
  fileContent: string,
  rubric: Rubric[]
): Promise<EvaluationResult[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  // Check if the content is a base64 data URL (for binary images)
  const isBase64Image = fileContent.startsWith('data:image/');

  const prompt = `
    Evaluate the following student submission based on the given rubric:

    **Rubric Criteria:**
    ${rubric.map(r => `- ${r.criteria} (Max Score: ${r.maxScore})`).join('\n')}

    **Submission Content:**
    ${isBase64Image ? 'This is a binary image file. Please evaluate based on the visual content.' : fileContent}

    **Instructions:**
    - Provide the evaluation **only** in a valid JSON array format.
    - Do not include any extra text, explanations, or formatting.
    - The output must strictly follow this structure:
    
    [
      {
        "criteriaId": "string",
        "score": number,
        "feedback": "string"
      }
    ]
  `;

  try {
    let result;
    
    if (isBase64Image) {
      // For image content, we need to send the image as part of the request
      result = await model.generateContent([
        prompt,
        { inlineData: { data: fileContent.split(',')[1], mimeType: fileContent.split(',')[0].split(':')[1].split(';')[0] } }
      ]);
    } else {
      // For text content (like SVG), just send the prompt with the content embedded
      result = await model.generateContent(prompt);
    }
    
    const response = await result.response;
    let text = response.text();

    // Remove potential markdown code block formatting (```json ... ```)
    text = text.replace(/^```json/, '').replace(/```$/, '').trim();

    return JSON.parse(text);
  } catch (error) {
    console.error('Error evaluating submission:', error);
    throw error;
  }
}
