const config=require("./dbconfig")
const mysql=require('mysql')
const NodeRSA = require('node-rsa');
const crypto = require("crypto");
const fs = require('fs')
const pem = require('pem-file')
const dbname=config.dbname;
const con=mysql.createConnection(config.config);

//insert into candidate
exports.insertCandidate = function(data){
    return new Promise((resolve,reject)=>{
    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
        con.query(`INSERT INTO ${dbname}.candidate VALUES ('${data.candidateId}', '${data.partyId}', '${data.constituencyId}')`, function(err, result, fields) {
            if (err) 
            {
                //con.end();
                reject(err);
            }
            else 
            {
                //con.end();
                resolve(result);
            }
        });
    });
    // .catch(err=>{
    //     throw err;
    // });
    // });
}

//select
exports.select = function(table){
    return new Promise((resolve,reject)=>{
    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
        con.query(`SELECT * FROM ${dbname}.${table}`, function(err, result, fields) {
            if (err) 
            {
                //con.end();
                reject(err);
            }
            else 
            {
                //con.end();
                resolve(result);
            }
        });
    });
    // .catch(err=>{
    //     throw err;
    // });
    // });
}

exports.insertParty = function(data){
    return new Promise((resolve,reject)=>{
    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
        con.query(`INSERT INTO ${dbname}.party VALUES ('${data.partyId}', '${data.partySymbol}')`, function(err, result, fields) {
            if (err) 
            {
                //con.end();
                reject(err);
            }
            else 
            {
                //con.end();
                resolve(result);
            }
        });
    });
    // .catch(err=>{
    //     throw err;
    // });
    // });
}

exports.insertVoter = function(data){
    return new Promise((resolve,reject)=>{
    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
        con.query(`INSERT INTO ${dbname}.voter VALUES ('${data.voterId}', '${data.password}', '${data.constituencyId}')`, function(err, result, fields) {
            if (err) 
            {
                //con.end();
                reject(err);
            }
            else 
            {
                //con.end();
                resolve(result);
            }
        });
    });
    // .catch(err=>{
    //     throw err;
    // });
    // });
}

exports.login = function(data){
    return new Promise((resolve,reject)=>{
    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
        con.query(`SELECT * FROM ${dbname}.voter WHERE voterId='${data.voterId}' and password='${data.password}'`, function(err, result, fields) {
            if (err) 
            {
                //con.end();
                reject(err);
            }
            else 
            {
                //con.end();
                resolve(result);
            }
        });
    });
    // .catch(err=>{
    //     throw err;
    // });
    // });
}

exports.getCandidates = function(data){
    //console.log(data);
    return new Promise((resolve,reject)=>{
    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
        con.query(`SELECT c.candidateId, c.partyId, p.partySymbol FROM ${dbname}.candidate c, ${dbname}.party p, ${dbname}.voter v WHERE v.voterId='${data}' AND v.constituencyId=c.constituencyId AND c.partyId=p.partyId`, function(err, result, fields) {
            if (err) 
            {
                //con.end();
                reject(err);
            }
            else 
            {
                //con.end();
                //console.log(result);
                resolve(result);
            }
        });
    });
    // .catch(err=>{
    //     throw err;
    // });
    // });
}

exports.encrypt=function(payload){
    //console.log(payload);
    // const file1 = fs.readFileSync(__dirname+'/public_key.pem','utf-8');
    // //const file2=fs.readFileSync(__dirname+'/private_key.pem','utf-8');
    // const publicKey=new NodeRSA(file1);
    // //const privateKey=new NodeRSA(file2);
    // // publicKey.importKey(pem.decode(file1));
    // // privateKey.importKey(pem.decode(file2));
    // const encrypted = publicKey.encrypt(payload, 'base64');
    // console.log('encrypted: ', encrypted);
    // //const decrypted = privateKey.decrypt(encrypted, 'utf8');
    // //console.log('decrypted: ', decrypted);
    const publicKey = fs.readFileSync(__dirname+'/public_key.pem');
    var toEncrypt=Buffer.from(payload);
    var encrypted=crypto.publicEncrypt(publicKey,toEncrypt).toString("base64");
    //var toDecrypt=Buffer.from(encrypted,"base64");
    // var decrypted=crypto.privateDecrypt(privateKey,toDecrypt).toString("utf-8");
    // console.log(decrypted);
    return encrypted;
}

exports.updateElection=function(data){
    return new Promise((resolve,reject)=>{
        // con.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
            con.query(`DELETE FROM ${dbname}.election`, function(err, result, fields) {
                if (err) 
                {
                    //con.end();
                    reject(err);
                }
                else 
                {
                    con.query(`INSERT INTO ${dbname}.election VALUES ('${data.electionId}')`, function(err, result, fields) {
                        if (err) 
                        {
                            //con.end();
                            reject(err);
                        }
                        else 
                        {
                            //con.end();
                            //console.log(result);
                            resolve(result);
                        }
                    });
                }
            });
        });
        // .catch(err=>{
        //     throw err;
        // });
        // });
}