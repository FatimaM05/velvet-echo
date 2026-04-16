import "./globals.css";

export const metadata = {
  title: "Velvet Echo — Emotional Intelligence",
  description:
    "A cinematic emotional intelligence environment. Share what you feel and be truly heard, reflected, and gently stabilized.",
  keywords: ["emotional intelligence", "AI reflection", "mental wellness", "emotional support"],
  openGraph: {
    title: "Velvet Echo",
    description: "An emotional intelligence environment, not an AI chatbot.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
