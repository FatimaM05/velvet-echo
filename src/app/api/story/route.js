import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { mood } = await req.json();

    if (!mood) {
      return NextResponse.json(
        { error: "Input is required." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        analysis: {
          primaryEmotion: "connection",
          secondaryEmotions: ["curiosity", "openness"],
          intensity: 5,
          tone: "reflective",
          hiddenIntent: "expression",
          cognitiveDistortion: null,
          emotionState: "calm",
        },
        reflection:
          "There's something quietly brave about reaching inward — about choosing to name what lives beneath the surface. You're here, and that matters more than it might feel right now.",
        reframe:
          "What feels like uncertainty is often just the space between one chapter ending and another beginning. That pause is not emptiness — it's breath.",
        insight:
          "Naming an emotion doesn't trap you in it. It creates just enough distance to see it clearly — and sometimes, that's all the relief we need.",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // ─── STAGE 1 + 2 + 3 unified prompt ─────────────────────────────────────
    const prompt = `You are Velvet Echo — an emotionally intelligent presence. You help people feel understood, reflected, and gently stabilized.

A person has shared their emotional state with you. Your task is to process it in three internal stages and return a structured JSON response.

USER INPUT:
"${mood}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STAGE 1 — EMOTION ANALYSIS (Internal)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Analyze the emotional content and extract:
- primaryEmotion: the dominant emotion in one word (e.g., grief, anxiety, longing, joy, anger, fear, hope)
- secondaryEmotions: array of 2–3 supporting emotions
- intensity: 0–10 scale of emotional weight
- tone: one of [reflective, anxious, calm, chaotic, melancholic, hopeful, conflicted, numb]
- hiddenIntent: what the person is really seeking — one of [comfort, clarity, expression, release, connection, validation]
- cognitiveDistortion: identify if present (e.g., catastrophizing, all-or-nothing thinking, mind reading) or null
- emotionState: map to one of [sadness, calm, anxiety, hope, anger, joy] — used for visual theming

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STAGE 2 — DECISION LAYER (Internal, never exposed)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Choose a response mode based on analysis:
- Comfort Mode: for grief, loneliness, feeling lost, pain
- Reflection Mode: for confusion, mixed emotions, introspection
- Clarity Mode: for overthinking, spiraling, seeking answers
- Reframing Mode: for negative self-talk, distortions, stuck perspectives
- Stabilization Mode: for acute anxiety, panic, overwhelm

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STAGE 3 — RESPONSE GENERATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generate three distinct text sections. Each must be deeply human, specific to THIS person's input, and avoid clichés.

1. reflection (2–3 sentences): A calm, grounded acknowledgment of their emotional state. Speak directly to them. Mirror what they feel without labeling it clinically. Make them feel truly seen.

2. reframe (1–2 sentences): A subtle, non-preachy perspective shift. Not advice — more like holding the situation in a different light.

3. insight (1–2 sentences): A quiet psychological or emotional truth that emerges naturally from their state. Draw from depth psychology, mindfulness, or emotional intelligence — but never in academic language.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRICT RULES:
- Never sound like a chatbot or therapist
- Never use phrases like "I understand", "It's okay", "That's valid", "Remember that"
- Never give advice unless it arises naturally from insight
- Never be generic or repetitive
- Responses must feel like they come from a calm, wise presence — not a tool

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "analysis": {
    "primaryEmotion": "string",
    "secondaryEmotions": ["string", "string"],
    "intensity": number,
    "tone": "string",
    "hiddenIntent": "string",
    "cognitiveDistortion": "string or null",
    "emotionState": "string"
  },
  "reflection": "string",
  "reframe": "string",
  "insight": "string"
}`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    // Strip markdown code fences if present
    text = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      // Fallback: return raw text as reflection if JSON parsing fails
      return NextResponse.json({
        analysis: {
          primaryEmotion: "presence",
          secondaryEmotions: ["stillness", "depth"],
          intensity: 5,
          tone: "reflective",
          hiddenIntent: "connection",
          cognitiveDistortion: null,
          emotionState: "calm",
        },
        reflection: text,
        reframe:
          "Sometimes the most honest thing we can do is simply sit with what is — without needing it to be anything else.",
        insight:
          "Presence itself is a kind of healing. You don't have to understand everything to begin feeling better.",
      });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Velvet Echo generation failed:", error);
    return NextResponse.json(
      { error: "Failed to process your emotional state." },
      { status: 500 }
    );
  }
}
