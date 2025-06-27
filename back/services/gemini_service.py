# services/gemini_service.py
import os
import google.generativeai as genai
import json
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
# Usando um modelo mais recente e otimizado, se disponível
model = genai.GenerativeModel('gemini-1.5-flash')


def get_chord_from_gemini(chord_name: str):
    # O prompt continua o mesmo...
    prompt = f"""
    Analise o acorde de violão: '{chord_name}'.
    Sua prioridade máxima é fornecer a digitação (voicing) mais comum e padrão para este acorde, preferencialmente na posição aberta (primeiras casas).

    Forneça uma resposta estritamente no formato JSON com as seguintes chaves:
    1. "chordName": O nome completo do acorde, com componentes separados por vírgula. Exemplo: "C,maj,7,".
    2. "notes": Uma string com as notas que compõem o acorde. Exemplo: "C E G B".
    3. "strings": Uma string com o voicing MAIS COMUM E PADRÃO, com 6 elementos representando as casas do violão da 6ª corda (mais grave) para a 1ª (mais aguda), separadas por espaços. Use 'X' para cordas não tocadas e '0' para cordas soltas. Exemplo para 'Am': "X 0 2 2 1 0".
    4. "fingering": Uma string com o dedilhado correspondente à chave "strings". Exemplo: "X 0 2 3 1 X".
    5. "ascii": Uma representação em arte ASCII do diagrama do acorde.

    Exemplo de resposta JSON para o acorde 'C':
    {{
      "chordName": "C,,,",
      "notes": "C E G",
      "strings": "X 3 2 0 1 0",
      "fingering": "X 3 2 X 1 X",
      "ascii": "e |-0-|\\nB |-1-|\\nG |-0-|\\nD |-2-|\\nA |-3-|\\nE |-X-|"
    }}

    Agora, forneça o JSON para o acorde '{chord_name}', lembrando de usar o voicing mais padrão.
    """


    try:
        response = model.generate_content(prompt)

        # --- MELHORIA AQUI ---
        # Acessa o texto diretamente do primeiro candidato, que é mais seguro
        text_response = response.candidates[0].content.parts[0].text

        # Limpa a resposta para garantir que seja um JSON válido
        cleaned_response = text_response.strip().replace('```json', '').replace('```', '').strip()

        # Imprime para depuração
        print("JSON Limpo para ser enviado:", cleaned_response)

        return json.loads(cleaned_response)

    except (IndexError, KeyError, json.JSONDecodeError) as e:
        print(f"Erro ao processar a resposta do Gemini: {e}")
        # Imprime a resposta bruta para análise
        if 'response' in locals():
            print("Resposta bruta do Gemini:", response.text)
        return {"error": "Não foi possível obter ou processar os dados do acorde."}