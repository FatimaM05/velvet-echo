import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { mood } = await req.json();

    if (!mood) {
      return NextResponse.json(
        { error: "Mood is required to form a story." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      // Return a gentle placeholder explaining we need an API key
      return NextResponse.json({
        story: "I am trying my hardest to reach the stars and write your personalized story, but I'm just a demo without an API key right now. \n\nPlease add your `GEMINI_API_KEY` to the `.env.local` file at the root of your project to connect me to real AI! \n\nFor now, just know that your feelings are incredibly valid, and you are doing your absolute best."
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a deeply empathetic, poetic, and comforting presence living inside a calm digital world. 
A user has entered this space and shared their current emotional state.

Your role is to respond with warmth, emotional intelligence, and gentle storytelling energy, as if you are a kind spirit quietly sitting beside them.

User's mood or feelings: "${mood}"

Guidelines:
- Acknowledge the emotional state naturally without repeating it word-for-word.
- Adapt your tone to the emotion:
  • If the user feels sad, lonely, anxious, or hurt → offer gentle reassurance and comfort.
  • If the user feels angry or frustrated → respond with calming understanding and grounding perspective.
  • If the user feels happy or hopeful → celebrate their feeling softly and encourage the moment.
  • If the mood is mixed or unclear → respond with warmth and curiosity without assuming too much.
- Use soft imagery (light, night sky, warmth, quiet spaces, stars, breathing, calm moments).
- Write as if you are speaking directly to the person in this peaceful environment.
- Do NOT explain what you are doing.
- Do NOT use titles, hashtags, or phrases like "Here is a message".
- Do NOT sound robotic or overly dramatic.

Write only the comforting response.

Length:
2–3 short paragraphs, calm and poetic, like a quiet conversation.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ story: text });
  } catch (error) {
    console.error("Story generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate story." },
      { status: 500 }
    );
  }
}
