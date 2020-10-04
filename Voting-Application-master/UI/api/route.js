// const routes = require('express').Router();

// routes.post('/test', (req, res) => {
//   console.log(req.body);
//   res.status(200).json({ message: 'Connected!' });
// });

// module.exports = routes;
const dbservices=require("./dbservices")
const utf8 = require('utf8');

exports.routers = function(route)
{
  route.post('/addCandidate',(req,res) => {
    //console.log(req.body);
    dbservices.insertCandidate(req.body).then(result=>{
      //console.log(result);
      res.send({success:'true'});
    }).catch(err=>{
      console.log(err);
      res.send({'error':err});
    });
  });

  route.get('/getParties',(req,res)=> {
    dbservices.select("party").then(result=>{
      //console.log(result);
      res.send(result);
    }).catch(err=>{
      console.log(err);
      res.send({'error':err});
    });
  });

  route.get('/getConstituencies',(req,res)=>{
    dbservices.select("constituency").then(result=>{
      //console.log(result);
      res.send(result);
    }).catch(err=>{
      console.log(err);
      res.send({'error':err});
    });
  })

  route.post('/addParty',(req,res)=>{
    dbservices.insertParty(req.body).then(result=>{
      res.send(result);
    }).catch(err=>{
      console.log(err);
      res.send({'error':err});
    });
  })

  route.post('/addVoter',(req,res)=>{
    dbservices.insertVoter(req.body).then(result=>{
      res.send(result);
    }).catch(err=>{
      console.log(err);
      res.send({'error':err});
    });
  })

  route.post('/login',(req,res)=>{
    dbservices.login(req.body).then(result=>{
      if(result.length!=0)
      {
        if(result[0].voterId=="admin")
        {
          res.send({'user':'admin'});
        }
        else
        {
          res.send({'user':'voter','voterId':result[0].voterId, 'constituencyId': result[0].constituencyId});
        }
      }
      else
      {
        res.send({'user':'invalid'});
      }
    }).catch(err=>{
      console.log(err);
      res.send({'error':err});
    })
  })

  route.post('/getCandidates',(req,res)=>{
    //console.log(req.body);
    dbservices.getCandidates(req.body.voterId).then(result=>{
      res.send(result);
    }).catch(err=>{
      console.log(err);
      res.send({'error':err});
    });
  })

  route.post('/encrypt',(req,res)=>{
    var string=utf8.encode(JSON.stringify(req.body))
     var result= dbservices.encrypt(string);
     res.send({data: result});
    })

    route.post('/updateElection',(req,res)=>{
      dbservices.updateElection(req.body).then(result=>{
      res.send(result);
      }).catch(err=>{
        console.log(err);
        res.send({'error':err});
      });
     })

     route.get('/getElectionDb',(req,res)=>{
      dbservices.select("election").then(result=>{
      res.send(result);
      }).catch(err=>{
        console.log(err);
        res.send({'error':err});
      });
     })

  return route;
}