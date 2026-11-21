import asyncio
import os
import json
import edge_tts

VOICE = "en-US-ChristopherNeural"  # Authoritative, calm, cinematic voice
AUDIO_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public/audio"))

async def generate_speech(text: str, output_path: str):
    print(f"[Pipeline 4] Generating voiceover using {VOICE}...")
    communicate = edge_tts.Communicate(text, VOICE, rate="-2%", pitch="-1Hz")
    
    submaker = edge_tts.SubMaker()
    with open(output_path, "wb") as file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                file.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.feed(chunk)
                
    print(f"[Pipeline 4] Voiceover generated at {output_path}")

def main():
    os.makedirs(AUDIO_DIR, exist_ok=True)
    out_file = os.path.join(AUDIO_DIR, "voiceover_tts.mp3")
    script_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../generated/script.json"))
    
    sample_text = (
        "I spent years building the perfect poker face, and I was wrong about it. "
        "Not about what it is, about what it does to the people around you, "
        "because a neutral face doesn't look neutral to everyone else."
    )
    
    if os.path.exists(script_path):
        with open(script_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            sample_text = data.get("fullVoiceoverText", sample_text)
            
    asyncio.run(generate_speech(sample_text, out_file))

if __name__ == "__main__":
    main()
