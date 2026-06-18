import { createWorker } from "tesseract.js";

/**
 * Extracts raw text from an image file using Tesseract.js
 * @param filePath Absolute or relative path to the image file
 * @returns Object containing raw text and overall confidence score
 */
export async function extractOCRText(filePath: string): Promise<{ rawText: string; confidence: number }> {
  let worker;
  try {
    // Create worker with English language
    worker = await createWorker("eng");
    
    // Recognize text from the image
    const { data: { text, confidence } } = await worker.recognize(filePath);
    
    return {
      rawText: text || "",
      confidence: (confidence ?? 0) / 100, // Normalize to 0-1 range
    };
  } catch (error) {
    console.error("Tesseract OCR extraction failed:", error);
    // Return a fallback or throw depending on design, here we throw to let the API handler catch it
    throw new Error(`OCR processing failed: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    if (worker) {
      try {
        await worker.terminate();
      } catch (err) {
        console.error("Failed to terminate Tesseract worker:", err);
      }
    }
  }
}
