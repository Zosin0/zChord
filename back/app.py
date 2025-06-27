# app.py
from flask import Flask, jsonify
from flask_cors import CORS
from services.gemini_service import get_chord_from_gemini

app = Flask(__name__)
# Habilita o CORS para permitir requisições do seu front-end
CORS(app)

@app.route('/api/chord/<string:chord_name>', methods=['GET'])
def find_chord(chord_name):
    """
    Endpoint que recebe um nome de acorde e retorna os dados do Gemini.
    """
    if not chord_name:
        return jsonify({"error": "Nome do acorde não fornecido"}), 400

    chord_data = get_chord_from_gemini(chord_name)

    if "error" in chord_data:
        return jsonify(chord_data), 500

    return jsonify(chord_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)