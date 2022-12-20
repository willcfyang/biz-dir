#import pymongo
from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import json_util 
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin
import sys
from flask import send_from_directory
import urllib.parse

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

username = urllib.parse.quote_plus('flask-mongodb')
password = urllib.parse.quote_plus('P71Z1GaEQMI7xo7DEhCKd7ruKiUf7cm5hqNDbnb4R663hNQ4IoBAAsSXEmXHS0UMJPGbCBMGGta9ACDbzBY2Cw==')
#client = MongoClient('localhost', 27017)
client = MongoClient('mongodb://%s:%s@flask-mongodb.mongo.cosmos.azure.com' % (username, password), port = 10255, tls=True, retrywrites=False)
#client = MongoClient('lask-mongodb.mongo.cosmos.azure.com', port = 10255, tls=True,)

db = client.biz_dir
com_info = db.company_info

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/get_biz_list")
def get_biz_list():
    all_com_info = com_info.find({})
    documents = [doc for doc in all_com_info ]
    return json_util.dumps({'ret':0, 'msg':'', 'data': documents})
    #return jsonify(all_com_info)
    #return 'get biz list';

@app.route('/search_companies')
def search_companies():
    return json_util.dumps({'ret':0, 'msg':''})

@app.route("/get_biz_info")
def get_biz_info():
    biz_id = request.args.get('id')
    biz_info = com_info.find_one({'_id':ObjectId(biz_id)})
    return json_util.dumps({'ret':0, 'msg':'', 'data': biz_info})
    #return 'get biz info';

@app.route("/delete_biz_info")
def delete_biz_info():
    biz_id = request.args.get('id')
    biz_info = com_info.delete_one({'_id':ObjectId(biz_id)})
    return json_util.dumps({'ret':0, 'msg':'', 'data': biz_info})
    #return 'get biz info';

@app.route('/add_company_info', methods=['GET', 'POST'])
def add_company_info():
    #company_name = request.form['company_name']
    #location_type = request.form['location_type']
    #country = request.form['country']
    #address = request.form['address']
    jsondata = request.get_json()
    com_info.insert_one({
        'company_name': jsondata.get('company_name'), 
        'location_type': jsondata.get('location_type'),
        'country': jsondata.get('country'),
        'address': jsondata.get('address'),
    })
    return json_util.dumps({'ret':0, 'msg':''})

@app.route('/update_company_info', methods=['GET', 'POST'])
def update_company_info():
    #company_name = request.form['company_name']
    #location_type = request.form['location_type']
    #country = request.form['country']
    #address = request.form['address']
    biz_id = request.args.get('id')
    jsondata = request.get_json()
    #.({'matchable_field': field_data_to_match}, {"$set": upsertable_data}, upsert=True)
    com_info.update_one(
    {'_id':ObjectId(biz_id)},
    { 
       '$set':
        {
            'company_name': jsondata.get('company_name'), 
            'location_type': jsondata.get('location_type'),
            'country': jsondata.get('country'),
            'address': jsondata.get('address'),
        },
    },
    upsert=True,
    )
    return json_util.dumps({'ret':0, 'msg':''})

@app.route('/<first>')
@app.route('/<first>/<path:rest>')
def fallback(first=None, rest=None):
    return send_from_directory('dist/todo', first)
    #return 'This one catches everything else'



if __name__ == '__main__':
    logger.info('starting web server life cycle')
    app.run(host='0.0.0.0', port=5002, debug=True, threaded=True)
