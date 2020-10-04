import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataAccessService } from 'src/app/services/data-access.service';
import { DomSanitizer } from '@angular/platform-browser';
import { select } from '@angular-redux/store';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-voting-screen',
  templateUrl: './voting-screen.component.html',
  styleUrls: ['./voting-screen.component.css']
})
export class VotingScreenComponent implements OnInit {

  voterId: string;
  constituencyId: string
  candidates: any[];
  electionStatus: any;
  votedStatus: any;
  electionId: any;
  winner: any;
  @select() voter;
  resultsByConst: any;
  resultsByParty: any;

  constructor(private route: ActivatedRoute, private spinner: NgxSpinnerService, private dataAccess: DataAccessService, 
    private sanitizer: DomSanitizer, private dialog: MatDialog, private router: Router) { 
  }

  ngOnInit() {
    //this.voterId=this.route.snapshot.paramMap.get('id');
    this.spinner.show();
    this.voter.subscribe(res=>{
    this.voterId=res.voterId;
    this.constituencyId=res.constituency;
      this.dataAccess.getCandidates(this.voterId).then(res=>{
        //console.log(res);
        this.candidates=res as any[];
        //var reader = new FileReader();
        // this.candidates.forEach(element => {
        //   reader.onloadend = (evt)=> {
            //let objectURL = 'data:application/octet-stream;base64,' + reader.result;
           // element['partyImage']=reader.result;
          //element['partyImage'] = this.sanitizer.bypassSecurityTrustUrl(objectURL);                
           // console.log(element['partyImage']);
        //}
        //reader.readAsDataURL(element['partySymbol']['data']); 
        //});
        
        //this.candidates.forEach(element => {
          // let objectURL = URL.createObjectURL(new Blob(element['partySymbol']['data']));       
          // element['partyImage'] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
         // let objectURL = 'data:image/jpeg;base64,' + element['partySymbol']['data'];
         // element['partyImage'] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        //});
        //console.log(this.candidates);
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
        console.log("Election Status:", this.electionStatus);
          if(this.electionStatus=='1'){
        this.dataAccess.getVoterStatus(this.voterId, this.constituencyId).then(res=>{
          this.votedStatus=res;
          console.log("Voted status:",this.votedStatus);
          this.spinner.hide();
          })
        }
        else if(this.electionStatus=='2'){
          this.dataAccess.getResults().then(res=>{
            this.resultsByConst=res[0];
              this.resultsByParty=res[1];
              this.winner=res[2]['winner'];
            this.spinner.hide();
          })
        }
        else if(this.electionStatus=='-1' || this.electionStatus=='0')
        {
          this.spinner.hide();
        }
      })
    })
    })
  })
       
  }

  vote(candidateId, partyId)
  {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '70vh',
      height: '50vh',
      data: {candidate: candidateId, party: partyId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result==true)
      {
        this.spinner.show();
        this.dataAccess.vote(this.voterId, partyId, this.constituencyId).then(res=>{
          //console.log(res);
          this.votedStatus='1';
          this.spinner.hide();
        })
      }
    });
    
  }

}
