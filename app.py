from flask import Flask, request, redirect, url_for, send_from_directory, send_file
from flask_cors import CORS
import json
import random
import os
# import IBM API

app = Flask(__name__, 
	static_folder='views/build/static'
	)
CORS(app)

@app.route('/', methods=['GET'])
def index():
	return send_file('views/build/index.html')
	# return send_file_directory('index.html', url_for('views/build'))

# Mock
@app.route('/msg', methods=['POST'])
def sendMessage():
	return str(random.random())
	# return json.loads(list(request.form.keys())[0])['message']
	# print(request.args)
	# return request.form.get('message') or request.args.get('message')
	# API call here to IBM watson assistant API
	# API.sendmessage

@app.route('/sendCoordinates', methods=['POST'])
def sendCoordinates():
	print(json.loads(list(request.form.keys())[0])['latitude'], json.loads(list(request.form.keys())[0])['longitude'])
	return str(json.loads(list(request.form.keys())[0])['latitude']) + ' ' + str(json.loads(list(request.form.keys())[0])['longitude'])

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), threaded=True, debug=True)