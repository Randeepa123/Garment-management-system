const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateGeminiResponse(prompt) {
  try {
    // USE THE SUGGESTED EXPERIMENTAL MODEL
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro-exp-03-25" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    throw error; // Re-throw the error to be caught in the controller
  }
}

module.exports = { generateGeminiResponse };