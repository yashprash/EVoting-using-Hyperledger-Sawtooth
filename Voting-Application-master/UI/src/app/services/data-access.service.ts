import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  ec2Url = ""
  constructor(private http: HttpClient) { }

  addCandidate(data: any)
  {
    return this.http.post(this.ec2Url+"3000/api/addCandidate",data).toPromise().then(res=>{
      return res;
    })
  }

  getParties()
  {
    return this.http.get(this.ec2Url+"3000/api/getParties").toPromise().then(res=>{
      return res;
    })
  }

  getConstituencies(){
    return this.http.get(this.ec2Url+"3000/api/getConstituencies").toPromise().then(res=>{
      return res;
    })
  }

  addParty(data: any)
  {
    return this.http.post(this.ec2Url+"3000/api/addParty",data).toPromise().then(res=>{
      return res;
    })
  }

  addVoter(data: any)
  {
    return this.http.post(this.ec2Url+"3000/api/addVoter",data).toPromise().then(res=>{
      return res;
    })
  }

  login(data: any)
  {
    return this.http.post(this.ec2Url+"3000/api/login",data).toPromise().then(res=>{
      return res;
    })
  }

  getCandidates(data: any)
  {
    console.log({voterId: data});
    return this.http.post(this.ec2Url+"3000/api/getCandidates", {voterId: data}).toPromise().then(res=>{
      return res;
    })
  }

  getElection(electionId: any)
  {
    return this.http.get(this.ec2Url+"5000/election/"+electionId).toPromise().then(res=>{
      return res['election_value'];
    })
  }
  
  getVoterStatus(voterId: any, constId: any)
  {
    var param=voterId+constId;
    console.log(param)
    return this.http.get(this.ec2Url+"5000/voter/"+param).toPromise().then(res=>{
      return res['voter_status'];
    })
  }

  vote(voterId: any, partyId: any, constituencyId: any)
  {
    var obj={voter_id: voterId, party_id: partyId, constituency_id: constituencyId};
  
    return this.http.post(this.ec2Url+"3000/api/encrypt", obj).toPromise().then(encryptedVote=>{
      //console.log(res);
      return this.http.post(this.ec2Url+"5000/vote",encryptedVote).toPromise().then(res=>{
        return res;
      })
    })
  }

  moveToBlockchain()
  {
    return this.http.get(this.ec2Url+"5000/blockchain").toPromise().then(res=>{
      //console.log(res);
      return res;
    })
  }

  startElection(electionId: any)
  {
    return this.http.put(this.ec2Url+"5000/election/"+electionId,{'election_trigger':1}).toPromise().then(res=>{
      //console.log(res);
      return res;
    })
  }  

  stopElection(electionId: any)
  {
    return this.http.put(this.ec2Url+"5000/election/"+electionId,{'election_trigger':2}).toPromise().then(res=>{
      //console.log(res);
      return res;
    })
  }  

  getResults()
  {
    return this.http.get(this.ec2Url+"5000/result").toPromise().then(res=>{
      //console.log(res);
      return res['response'];
    }) 
  }

  addElection(data: any)
  {
    return this.http.post(this.ec2Url+"3000/api/updateElection",data).toPromise().then(res=>{
      return this.http.post(this.ec2Url+"5000/election/"+data['electionId'],{}).toPromise().then(res=>{
        //console.log(res);
        return res;
      }) 
    })
  }

  getElectionDb()
  {
    return this.http.get(this.ec2Url+"3000/api/getElectionDb").toPromise().then(res=>{
      //console.log(res);
      return res;
    }) 
  }

  getVoteCount()
  {
    return this.http.get(this.ec2Url+"5000/voteCount").toPromise().then(res=>{
      //console.log(res);
      return res['vote_count'];
    }) 
  }
}
