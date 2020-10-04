import pymysql

host=""
port=""
dbname=""
user=""
password=""
voterslist=[]
partylist=[]

def get_voters():
	try:
		conn = pymysql.connect(host, user=user,port=port,passwd=password, db=dbname)
		print("Connected")
		voterslist=[]
		cur=conn.cursor()
		sql="SELECT voterId,constituencyId FROM evoting.voter;"
		cur.execute(sql)
		while True:
				record=cur.fetchone()
				if record==None:
					break
				else:
					voterslist.append(record[0]+record[1])
						#print (record[0],record[1])
		return voterslist
		
	except pymysql.Error as err:
		return err
    

def get_parties():
	try:
		conn = pymysql.connect(host, user=user,port=port,passwd=password, db=dbname)
		print("Connected")
		partylist=[]
		cur=conn.cursor()
		sql="SELECT partyId, constituencyId FROM evoting.candidate;"
		cur.execute(sql)
		while True:
				record=cur.fetchone()
				if record==None:
					break
				else:
					partylist.append(record[0]+":"+record[1])
		return partylist
			
	except pymysql.Error as err:
		print(err)
