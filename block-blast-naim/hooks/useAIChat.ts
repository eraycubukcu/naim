import { useState } from 'react';
import { Alert } from 'react-native';

export type UIConfig = {
  backgroundColor: string;
  gridSize: number;
  blockColors: {
    red: string;
    blue: string;
    green: string;
  };
  showScoreCard: boolean;
  theme: string;
};

const DEFAULT_CONFIG: UIConfig = {
  backgroundColor: "#0a0e1a",
  gridSize: 8,
  blockColors: {
    red: "#ff4757",
    blue: "#5352ed", 
    green: "#2ed573"
  },
  showScoreCard: true,
  theme: "dark"
};

const SYSTEM_PROMPT = `You are a UI controller for a Block Blast mobile game. 
The user will describe changes they want to see in the game.
You MUST respond with ONLY a valid JSON object, no extra text, no markdown.
JSON schema:
{
  "action": "update_ui",
  "changes": {
    "backgroundColor": "string (hex color)",
    "blockColors": { "red": "string", "blue": "string", "green": "string" },
    "showScoreCard": true,
    "theme": "dark or light",
    "gridSize": 8
  }
}`;

export function useAIChat() {
  const [uiConfig, setUiConfig] = useState<UIConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    setIsLoading(true);

    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      Alert.alert("API Key Missing", "Please add EXPO_PUBLIC_GEMINI_API_KEY to your .env file.", [{ text: "OK" }]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: message }]
            }
          ],
          generationConfig: {
            temperature: 0.1, // Low temperature for consistent JSON
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      // Clean markdown tags in case the model ignores output limitations
      const jsonString = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(jsonString);

      if (parsed.action && parsed.changes) {
        setUiConfig(prev => ({ 
          ...prev, 
          ...parsed.changes,
          blockColors: {
            ...prev.blockColors,
            ...(parsed.changes.blockColors || {})
          }
        }));
      } else {
        throw new Error("Invalid payload action format");
      }
    } catch (err) {
      console.error("Gemini API Error:", err);
      Alert.alert("Hata", "AI API ile bağlantı kurulamadı veya hatalı format döndü.", [{ text: "Tamam" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { uiConfig, sendMessage, isLoading };
}
