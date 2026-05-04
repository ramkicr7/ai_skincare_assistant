from groq import Groq
from config import GROQ_API_KEY
import json
import re

client = Groq(api_key=GROQ_API_KEY)

def extract_skin_info(text):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            temperature=0,
            messages=[
                {
                    "role": "system",
                    "content": "Return ONLY valid JSON. No explanation."
                },
                {
                    "role": "user",
                    "content": f"""
Extract skincare details.

Text: {text}

Return JSON:
{{
  "skin_type": "",
  "concerns": [],
  "sun_exposure": ""
}}
"""
                }
            ]
        )

        content = response.choices[0].message.content.strip()

        print("RAW:", content)

        content = content.replace("```json", "").replace("```", "").strip()

        # Try direct JSON
        try:
            return json.loads(content)
        except:
            pass

        # Try regex extraction
        match = re.search(r"\{.*\}", content, re.DOTALL)
        if match:
            return json.loads(match.group())

    except Exception as e:
        print("AI ERROR:", e)

    # 🔥 STEP 1: SMART DEFAULT (based on input)
    text_lower = text.lower()

    skin_type = "unknown"
    concerns = []
    sun_exposure = "medium"

    if "oily" in text_lower:
        skin_type = "oily"
    elif "dry" in text_lower:
        skin_type = "dry"
    elif "combination" in text_lower:
        skin_type = "combination"

    if "acne" in text_lower or "pimple" in text_lower:
        concerns.append("acne")
    if "pigment" in text_lower:
        concerns.append("pigmentation")
    if "tan" in text_lower:
        concerns.append("tanning")

    if "daily" in text_lower or "sun" in text_lower:
        sun_exposure = "high"

    # 🔥 STEP 2: FINAL FAKE DEFAULT (if nothing detected)
    if skin_type == "unknown" and not concerns:
        return {
            "skin_type": "oily",
            "concerns": ["acne"],
            "sun_exposure": "high"
        }

    return {
        "skin_type": skin_type,
        "concerns": concerns,
        "sun_exposure": sun_exposure
    }