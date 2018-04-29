from flask import Flask, request, jsonify
from watson_developer_cloud import AssistantV1
import pandas as pd
import os
import json
from flask_cors import CORS
from data import get_info

data_csv = "datdatatho.csv"

assistant = AssistantV1(
    username=os.environ['IBM_CLOUD_USER'],
    password=os.environ['IBM_CLOUD_PASS'],
    version='2017-04-21')
assistant.set_http_config({'timeout': 100})

app = Flask(__name__)
CORS(app)

@app.route("/msg", methods=["POST"])
def process_message():
    req = json.loads(list(request.form.keys())[0])
    # print(req)
    if "context" in req:
        print(req['text'])
        print(req['context'])

    if "context" in req:
        response = assistant.message(workspace_id=os.environ['IBM_WORKSPACE_ID'],
            input={'text': req['text']}, context= req['context'])
    else:
        response = assistant.message(workspace_id=os.environ['IBM_WORKSPACE_ID'],
            input={'text': ""})

    retval = {}
    if response["output"]["text"][-1][:2] == "%%":
        retval["type"] = "info"
        retval["info"] = get_info(response["output"]["text"])

    else:
        retval["type"] = "question"
        retval["text"] = response["output"]["text"]
        retval["context"] = response["context"]

    return jsonify(retval)

if __name__ == '__main__':
	port = int(os.environ.get('PORT', 5000))
	app.run(debug=True, host='0.0.0.0', port=port, threaded=True)
