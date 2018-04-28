from flask import Flask
# import IBM API

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
	return 'hi'

@app.route('/chatbot', methods=['POST'])
def chatbot():
	# API call here to IBM watson assistant API
	# API.sendmessage


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, debug=True)