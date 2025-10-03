from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import google.generativeai as genai
import os

app = Flask(__name__)

CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://agri-optimize-ai.vercel.app" 
            # Make sure this URL is exactly your Vercel app's URL
        ]
    }
})



# --- CONFIGURATION ---

# URLs for ML Servers
CROP_RECOMMENDATION_URL = os.environ.get('CROP_RECOMMENDATION_URL')
FERTILIZER_RECOMMENDATION_URL = os.environ.get('FERTILIZER_RECOMMENDATION_URL')
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')

# --- CHATBOT CONFIGURATION (Agro) ---
# ⚠️ PASTE YOUR ACTUAL API KEY HERE ⚠️
GEMINI_API_KEY = "AIzaSyAdkkvDW1rAxLMvo-yuELvXz3tw1nOLBJg"

# Configure the Gemini Library
genai.configure(api_key=GEMINI_API_KEY)

# Define Agro's Persona
agro_persona = """
You are 'Agro', a friendly, concise, and knowledgeable AI farming assistant designed specifically for farmers in India. 
Your goal is to provide practical, easy-to-understand advice on crops, fertilizers, pest control, and general farming practices.
Keep your answers brief and helpful. If you don't know something, admit it and suggest consulting a local agricultural expert.
Always maintain a polite and encouraging tone.
"""

# Select the model
try:
    model = genai.GenerativeModel('gemini-2.5-flash')
except Exception as e:
    print(f"Error initializing Gemini: {e}")
    model = None

# API Endpoints (Crop and Fertilizer are unchanged)
@app.route('/api/recommend/crop', methods=['POST'])
def recommend_crop():
    try:
        response = requests.post(CROP_RECOMMENDATION_URL, json=request.json)
        response.raise_for_status(); return jsonify(response.json())
    except Exception as e: return jsonify({'error': f'Crop model connection error: {e}'}), 503

@app.route('/api/recommend/fertilizer', methods=['POST'])
def recommend_fertilizer():
    try:
        response = requests.post(FERTILIZER_RECOMMENDATION_URL, json=request.json)
        response.raise_for_status(); return jsonify(response.json())
    except Exception as e: return jsonify({'error': f'Fertilizer model connection error: {e}'}), 503

@app.route('/api/chat', methods=['POST'])
def chat_with_agro():
    if "PASTE_YOUR" in GEMINI_API_KEY or not model:
        return jsonify({'reply': "Chatbot is not configured yet in backend/app.py."})
    
    try:
        data = request.json
        user_message = data.get('message', '')
        language = data.get('language', 'en') # Get language from frontend request

        if not user_message:
            return jsonify({'reply': "Please ask me something!"})

        # --- NEW: Language-specific instructions for the AI ---
        if language == 'hi':
            language_instruction = "YOU MUST ANSWER THE FOLLOWING QUESTION IN HINDI."
        else:
            language_instruction = "YOU MUST ANSWER THE FOLLOWING QUESTION IN ENGLISH."

        # Combine persona, language instruction, and user message for the prompt
        full_prompt = f"{agro_persona}\n\n{language_instruction}\n\nFarmer asked: {user_message}\nAgro's Answer:"

        response = model.generate_content(full_prompt)
        return jsonify({'reply': response.text})

    except Exception as e:
        print(f"Error in chat: {e}")
        return jsonify({'reply': "Sorry, I'm having trouble connecting right now."}), 500

if __name__ == '__main__':
    print("Starting Main Backend Server with Multi-Language Agro...")
    app.run(host='0.0.0.0', port=5000, debug=False)