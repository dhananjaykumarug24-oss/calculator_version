from flask import Flask, send_file

app = Flask(__name__)

@app.route('/')
def home():
    return send_file('index.html')

@app.route('/style.css')
def style():
    return send_file('style.css')

if __name__ == '__main__':
    app.run(debug=True)