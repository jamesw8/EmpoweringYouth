from flask import Flask, request
from flask_cors import CORS
import json
import random
# import IBM API

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():
	return 'hi'

# Mock
@app.route('/msg', methods=['POST'])
def sendMessage():
	return str(random.random())
	# return json.loads(list(request.form.keys())[0])['message']
	# print(request.args)
	# return request.form.get('message') or request.args.get('message')
	# API call here to IBM watson assistant API
	# API.sendmessage


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, threaded=True, debug=True)