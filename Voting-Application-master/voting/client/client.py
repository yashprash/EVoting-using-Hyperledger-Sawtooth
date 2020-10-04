import sys
import os
from hashlib import sha512
from transaction import VotingClient
from flask import Flask, jsonify, request
import rds
import json
import decryption
from flask_cors import CORS

app= Flask(__name__)
CORS(app)

#rest api url
DEFAULT_URL = 'http://rest-api:8008'
KEY_NAME = 'votingjar'

@app.route("/election/<string:election_id>", methods=['POST','GET','PUT'])
def api_election(election_id):
     if(request.method=='POST'):
          add_election(election_id) #either SUCCESS or FAILURE to be returned
          return jsonify({'status':'success'}),201

     if(request.method=='GET'):
          election_value=get_election(election_id).decode("utf8")
          return jsonify({'election_value':election_value}),200
     
     if(request.method=='PUT'):
          json_trigger=request.get_json(force=True)
          if json_trigger['election_trigger']==1:
               start_election(election_id)
               return jsonify({})
               
          if json_trigger['election_trigger']==2:
               stop_election(election_id)
               return jsonify({})

@app.route("/blockchain")    #add both voters and parties list
def add_voter():
     voters_list=rds.get_voters()
     party_list=rds.get_parties()
     for voter in voters_list:
          add_voter(voter)
     for party in party_list:
          add_action(party)
     return jsonify({})
     
@app.route("/voter/<string:voter_id>", methods=['GET','POST']) 
def voter_status(voter_id):
     if request.method=='GET':
          flag=get_voter(voter_id).decode('utf8')
          return jsonify({'voter_status':flag})
     if request.method=='POST':
          flag=add_voter(voter_id)
          return jsonify({'status':'success'}),201

@app.route("/party/<string:party_id>", methods=['GET','POST']) 
def party_status(party_id):
     if request.method=='GET':
          flag=get_votes(party_id).decode('utf8')
          return jsonify({'party_votes':flag})
     if request.method=='POST':
          flag=add_action(party_id)
          return jsonify({'status':'success'}),201

@app.route("/voteCount", methods=['GET']) 
def get_voteCount():
     party_list=rds.get_parties()
     count=0
     votes=[]
     for party in party_list:
          c=int(get_votes(party))
          votes.append(c)
          count=count+c
     print(party_list)
     print(votes)
     print(count)
     return jsonify({'vote_count':count})

@app.route("/result", methods=['GET']) 
def election_result():
     if request.method=='GET':
          party_list=rds.get_parties()
          response=get_results(party_list)
          return jsonify({'response':response}),201

@app.route("/vote", methods=['POST']) 
def vote_details():
     if request.method=='POST':
          vote_json=request.get_json(force=True)
          cipher_text=vote_json['data']
          vote_info=decryption.data_decrypt(cipher_text)
          voter_id=vote_info['voter_id']
          party_id=vote_info['party_id']
          constituency_id=vote_info['constituency_id']
          vote_action(party_id+":"+constituency_id,voter_id+constituency_id)
          return jsonify({'status':'success'}), 200



def _get_private_keyfile(key_name):
    '''Get the private key for key_name.'''
    home = os.path.expanduser("~")
    key_dir = os.path.join(home, ".sawtooth", "keys")
    return '{}/{}.priv'.format(key_dir, key_name)


def add_election(election_id):
     ''' Start or stop election'''
     privkeyfile = _get_private_keyfile(KEY_NAME)
     client = VotingClient(base_url=DEFAULT_URL, key_file=privkeyfile)
     client.add_election(election_id) 
     ''' Return required '''

def start_election(election_id):
     ''' Start or stop election'''
     privkeyfile = _get_private_keyfile(KEY_NAME)
     client = VotingClient(base_url=DEFAULT_URL, key_file=privkeyfile)
     client.start_election(election_id) 
     ''' Return required '''

def stop_election(election_id):
     ''' Start or stop election'''
     privkeyfile = _get_private_keyfile(KEY_NAME)
     client = VotingClient(base_url=DEFAULT_URL, key_file=privkeyfile)
     client.stop_election(election_id)  
     ''' Return required '''

def get_election(election_id):
      ''' lists elections status'''
      privkeyfile = _get_private_keyfile(KEY_NAME)
      client = VotingClient(base_url=DEFAULT_URL, key_file=privkeyfile)
      flag = client.list_election(election_id) 
      return flag

def vote_action(party,name):
    '''
    votes party from user with name using client functions
    ''' 
    privkeyfile = _get_private_keyfile(KEY_NAME)
    client = VotingClient(base_url=DEFAULT_URL, key_file=privkeyfile)
    client.vote(party,name)    
    ''' Return required '''

def add_action(party):
      '''
      adds a new party to blockchain with name party
      '''
      privkeyfile = _get_private_keyfile(KEY_NAME)
      client = VotingClient(base_url=DEFAULT_URL, key_file=privkeyfile)
      print('adding party.........'+party)
      client.add(party)   
      ''' Return required '''

def add_voter(voter_id):
      '''
      adds a new voter to blockchain with voter_id
      '''
      privkeyfile = _get_private_keyfile(KEY_NAME)
      client = VotingClient(base_url=DEFAULT_URL, key_file=privkeyfile)
      print('adding voter.........'+voter_id)
      client.add_voter(voter_id)   
      ''' Return required '''

def get_votes(party):
      ''' lists number of votes to the party'''
      privkeyfile = _get_private_keyfile(KEY_NAME)
      client = VotingClient(base_url=DEFAULT_URL, key_file=privkeyfile)
      votes = client.list_parties(party)
      return votes 

def get_results(party_list):
     ''' Calculates the winner based on the number of votes '''
     if party_list is not None:
          parties=[]
          consts=[]
          for party in party_list:
               const=party.split(":")[1]
               if const not in consts:
                    consts.append(const)
               pa=party.split(":")[0]
               if pa not in parties:
                    parties.append(pa)
          data={}
          for party in party_list:
               votes=get_votes(party)
               data[party]=int(votes)
          results={}
          for const in consts:
               max_votes=-1
               for (i,j) in data.items():
                    if i.split(":")[1]==const:
                         if j>max_votes:
                              max_votes=j
                              results[const]=i.split(":")[0]
                         elif max_votes==j:
                              results[const]+=","+i.split(":")[0]
                         if max_votes==0:
                              results[const]="No votes casted!"
          temp={}
          for party in parties:
               temp[party]=0
               for (i,j) in results.items():
                    if party==j:
                         temp[party]+=1
          winner=""
          maxi=-1
          for (i,j) in temp.items():
               if j>maxi:
                    maxi=j
                    winner=i
          return [results,temp,{'winner':winner}]
          # winner = party_list[0]
          # max_votes = 0
          # for party in party_list:
          #      if get_votes(party)>max_votes:
          #           max_votes = get_votes(party)
          #           winner = party
          # return winner
     else:
          return "Election should have atleast 1 party"

def get_voter(voter_id):
      ''' lists if voter has voted'''
      privkeyfile = _get_private_keyfile(KEY_NAME)
      client = VotingClient(base_url=DEFAULT_URL, key_file=privkeyfile)
      flag = client.list_voter(voter_id) 
      return flag

def run():
     args=sys.argv
     if len(args)<2: 
          print('....Enter arguments...')
          return
     if args[1]=='vote':
          try: vote_action(args[2],args[3]) 
          except : print('Voting Error')     
     elif args[1]=='add':
          if len(args[2]) == 0: return
          try: add_action(args[2])
          except : print('Party creation error')     
     elif args[1]=='list':
          try:get_votes(args[2])
          except:print('display error party non existant')  
     elif args[1] == 'add_voter':
          if len(args[2]) == 0: return
          try: add_voter(args[2])
          except : print('Voter creation error') 
     elif args[1]=='list_voter':
          try:get_voter(args[2])
          except:print('display error voter non existant') 
     elif args[1]=='get_results':
          try:get_results(args[2])
          except:print('display error parties non existant')  
     elif args[1]=='add_election':
          try:add_election(args[2])
          except:print('display error election non existant')  
     elif args[1]=='get_election':
          try:get_election(args[2])
          except:print('display error election non existant') 
     elif args[1]=='start_election':
          try:start_election(args[2])
          except:print('display error election non existant') 
     elif args[1]=='stop_election':
          try:stop_election(args[2])
          except:print('display error election non existant') 
     else: print('<<Operations allowed are vote [party name][user id or name], list [party name], add [party name] avoid spaced names>>')          
     
     
if __name__ == "__main__":   
     app.run(debug=True,host='0.0.0.0')    
     #run()
