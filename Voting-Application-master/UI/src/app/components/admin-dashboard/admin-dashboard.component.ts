import { Component, OnInit } from '@angular/core';
import { DataAccessService } from 'src/app/services/data-access.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  electionStatus: any;
  electionId: any;
  launchForm = this.fb.group({
    electionId: ['', [Validators.required,Validators.pattern('[A-Za-z0-9]*')]]
  });
  resultsByConst: any;
  resultsByParty: any;
  winner: any;
  voteCount: any;
  constructor(private dataAccess: DataAccessService, private spinner: NgxSpinnerService, private fb: FormBuilder, 
    private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.spinner.show();
    this.dataAccess.getElectionDb().then(res=>{
      console.log(res);
      var result=res as Array<any>;
      if(result.length!=0){
      this.electionId=res[0]['electionName'];
      }
      else{
        this.electionId="random";
      }
        this.dataAccess.getElection(this.electionId).then(res=>{
          this.electionStatus=res;
          if(this.electionStatus==1)
          {
            // this.voteCount=0;
            // this.spinner.hide();
            this.dataAccess.getVoteCount().then(res=>{
              this.voteCount=res;
              this.spinner.hide();
            })
          }
          else if(this.electionStatus==2)
          {
            this.dataAccess.getResults().then(res=>{
              this.resultsByConst=res[0];
              this.resultsByParty=res[1];
              this.winner=res[2]['winner'];
              this.spinner.hide();
            })
          }
          else 
          {
            console.log("hiding")
            this.spinner.hide();
          }
        })
    })
  }

  move(){
    this.spinner.show();
    this.dataAccess.moveToBlockchain().then(res=>{
      this.snackbar.open("Data successfully moved to blockchain!", null, {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
      this.spinner.hide();
    })
  }

  startElection(){
    this.spinner.show();
    this.dataAccess.startElection(this.electionId).then(res=>{
      this.snackbar.open("Election started!", null, {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
      this.electionStatus=1;
      this.voteCount=0;
      this.spinner.hide();
    })
  }
  stopElection(){
    this.spinner.show();
    this.dataAccess.stopElection(this.electionId).then(res=>{
      this.dataAccess.getResults().then(res=>{
        this.snackbar.open("Election has been stopped!", null, {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.electionStatus=2;
        this.resultsByConst=res[0];
        this.resultsByParty=res[1];
        this.winner=res[2]['winner'];
        this.spinner.hide();
      })
    })
  }

  launchElection(){
    this.spinner.show();
    this.dataAccess.addElection(this.launchForm.value).then(res=>{
      this.snackbar.open(this.launchForm.value.electionId+" election launched!", null, {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
      this.electionStatus=0;
      this.spinner.hide();
    })
  }

  refreshVoteCount(){
    this.spinner.show();
    this.dataAccess.getVoteCount().then(res=>{
      this.voteCount=res;
      this.spinner.hide();
    })
  }
}
