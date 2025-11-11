
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const productSchema = {
  type: Type.OBJECT,
  properties: {
    products: {
      type: Type.ARRAY,
      description: "A list of 20 creative and diverse products for an e-commerce catalog.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.NUMBER, description: "Unique product identifier" },
          name: { type: Type.STRING, description: "Product name" },
          category: { type: Type.STRING, description: "Product category (e.g., Electronics, Apparel, Home Goods, Books)" },
          price: { type: Type.NUMBER, description: "Product price in USD" },
          description: { type: Type.STRING, description: "A compelling, brief product description (2-3 sentences)." },
          imageUrl: { type: Type.STRING, description: "A placeholder image URL from picsum.photos, e.g., https://picsum.photos/400/300" }
        },
        required: ["id", "name", "category", "price", "description", "imageUrl"]
      }
    }
  },
  required: ["products"]
};


export const generateProducts = async (): Promise<Product[]> => {
  console.log("Generating products with Gemini...");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a diverse list of 20 fictional products for a modern e-commerce store. Include various categories like Electronics, Apparel, Home Goods, and Books. Make the product names and descriptions creative and appealing. Assign a unique ID to each, starting from 1.",
      config: {
        responseMimeType: "application/json",
        responseSchema: productSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);

    if (parsedData && Array.isArray(parsedData.products)) {
        // Ensure unique image for each product by adding a random seed
        return parsedData.products.map((p: Product) => ({
            ...p,
            imageUrl: `https://picsum.photos/seed/${p.id}/400/300`
        }));
    } else {
        throw new Error("Invalid data structure received from API");
    }

  } catch (error) {
    console.error("Error generating products:", error);
    throw new Error("Failed to fetch products from Gemini API.");
  }
};
