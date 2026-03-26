# Velvet Echo 🌌

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-teal?style=flat&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-orange?style=flat&logo=framer)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_flash-purple?style=flat)

Velvet Echo is a serene, interactive storytelling web application designed to be a digital safe haven. Users can type out their current mood, feelings, or emotional state into a calming interface, and an empathetic AI will generate a deeply personalized, poetic, and comforting response. 

Unlike typical conversational agents, Velvet Echo acts as a kind spirit quietly sitting beside you inside a calm digital world—offering warmth, emotional intelligence, and gentle storytelling energy tailored explicitly to how you feel.

---

## ✨ Features
- **Empathetic AI Storytelling:** Powered by Google's Gemini 2.5 Flash, the application parses emotional nuance to deliver beautifully poetic and validating responses.
- **Immersive Visuals:** A dynamic, neon-themed glassmorphic UI featuring floating particles and drifting starlight.
- **Fluid Animations:** Smooth, staggered text reveals and viewport transitions built with Framer Motion.
- **Rich Typography:** Carefully curated Google Fonts (Playfair Display for stories, Poppins for inputs, Inter for UI) that enhance the reading experience.
- **Responsive Design:** A fully responsive layout that feels native and comforting on both mobile and desktop screens.

---

## 🛠️ Tech Stack

### Framework & Core
- **[Next.js 15 (App Router)](https://nextjs.org/):** React framework for seamless server-side rendering, routing, and optimized builds.
- **[React 19](https://react.dev/):** UI library for building component-driven interfaces.
- **Capabilities:** Utilizing Server API Routes to securely communicate with AI models without exposing keys to the client.

### AI & Logic
- **[@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai):** The official SDK integrating **Gemini 2.5 Flash**. The AI is explicitly prompted to act as a comforting presence, dynamically shifting its tone based on the user's emotional state (sad, angry, happy, etc.) using soft imagery and non-robotic language.

### Styling & Animation
- **[Tailwind CSS v4](https://tailwindcss.com/):** Utility-first CSS framework configured with custom variables for our signature neon pink (`#ff4ec1`) and neon purple (`#a14eff`) aesthetic.
- **[Framer Motion](https://www.framer.com/motion/):** Production-ready animation library powering the background blobs, floating stars, staggered paragraph reveals, and smooth component mounting/unmounting.
- **[Lucide React](https://lucide.dev/):** Beautiful, consistent iconography used throughout the interface.

---

## 📖 The Poetry of Velvet Echo

When a user shares their feelings, the AI does *not* behave like a chatbot answering a prompt. Instead, it is instructed to respond with deep poetic resonance. 

For example, if a user feels overwhelmed, the app might respond:
> *"I can feel the weight you're carrying right now. It is completely okay to feel this way. The world can sometimes be incredibly loud, asking too much of us all at once.*
> 
> *Take a deep breath and just exist in this moment. You don't have to figure everything out right now. Imagine a soft, warm light wrapping around you, keeping you safe from the noise outside."*

The AI is rigorously constrained to avoid robotic tropes, hashtags, or introductory phrases, ensuring the user feels genuinely heard.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later.
- A free **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/FatimaM05/velvet-echo.git
   cd velvet-echo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contributing
Contributions, issues, and feature requests are always welcome! Feel free to check the [issues page](https://github.com/FatimaM05/velvet-echo/issues).

## 📄 License
This project is open-source and available under the MIT License.
