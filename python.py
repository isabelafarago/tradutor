from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

OPENAI_API_KEY = 'Bearer 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'
API_URL = "https://api.openai.com/v1/completions"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/send_question', methods=['POST'])
def send_question():
    sQuestion = request.form.get('question')

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer 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" ,
    }

    data = {
        "model": "text-davinci-003",
        "prompt": sQuestion,
        "max_tokens": 2048,
        "temperature": 0.5,
    }

    try:
        response = requests.post(API_URL, headers=headers, json=data)
        response_data = response.json()

        if 'choices' in response_data and response_data['choices'][0].get('text'):
            text = response_data['choices'][0]['text']
        else:
            text = "Sem resposta"

        return jsonify({"response": text})

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
