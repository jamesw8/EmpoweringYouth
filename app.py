from flask import Flask, request
# import IBM API

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
	return 'hi'

# Mock
@app.route('/msg', methods=['POST'])
def chatbot():
	return(request.form['message'])
	# API call here to IBM watson assistant API
	# API.sendmessage


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, threaded=True, debug=True)