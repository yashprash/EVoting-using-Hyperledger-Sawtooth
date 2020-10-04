# coding: utf-8

from flask import Flask, jsonify, request

from Crypto.PublicKey import RSA
from Crypto import Random
from Crypto.Cipher import PKCS1_OAEP
import base64
import six
import json 

app= Flask(__name__)


@app.route("/vote", methods=['POST'])
def vote():
	if request.method=='POST':
        #   print(request)
          vote_json=request.get_json(force=True)
          cipher_text=vote_json['data']
        #   print(cipher_text)
          vote_info=data_decrypt(cipher_text)
          print(vote_info)
        #   return vote_info,201
          voter_id=vote_info['voter_id']
          party_id=vote_info['party_id']
          constituency_id=vote_info['constituency_id']
          #vote_action(party_id+constituency_id,voter_id+constituency_id)
          print(party_id,constituency_id,voter_id,constituency_id)
          return jsonify({'voter_id':voter_id,'party_id':party_id,'constitunecy_id': constituency_id}),201


f1=open('private_key.pem','rb')
private_key=RSA.importKey(f1.read())
private_key=PKCS1_OAEP.new(private_key)
# key = RSA.importKey(open('private_key.pem').read())
# cipher = PKCS1_OAEP.new(key)
# f2=open('private_key.pem','rb')
# public_key=RSA.importKey(f2.read())
# public_key=PKCS1_OAEP.new(public_key)


def data_decrypt(cipher_text):
    # text=cipher_text.encode('utf-8')
    # text=base64.b64decode(cipher_text)
    # print(cipher_text)
    temp=cipher_text.encode('utf-8')
    decoded=base64.decodebytes(temp)
    # decoded = base64.b64decodebytes(cipher_text)
    # message=message_bytes.decode('utf-8')
    # print(message)
    #toDecrypt=bytes(cipher_text,'utf-8')
    # print(decoded)
    decrypted_message=private_key.decrypt(decoded)
    str_res=six.text_type(decrypted_message, encoding='utf8')
    return json.loads(str_res)

if __name__=='__main__':
	app.run(debug=True)
