import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataAccessService } from 'src/app/services/data-access.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThrowStmt } from '@angular/compiler';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {

  candidateForm = this.fb.group({
    candidateId: ['',Validators.required],
    partyId: ['', Validators.required],
    constituencyId: ['', Validators.required]
  });
  parties: any[];
  constituencies: any[];
  // parties=[{
  //   partyId: "BJP",
  //   partySymbol: "example"
  // }];
  constructor(private fb: FormBuilder, private dataAccess: DataAccessService, private snackbar: MatSnackBar, 
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.dataAccess.getParties().then(res=>{
      //console.log(res);
      this.parties=res as any[];
      this.dataAccess.getConstituencies().then(res=>{
        this.constituencies=res as any[];
        this.spinner.hide();
      })
    })
  }

  onSubmit(){
    this.spinner.show();
    this.dataAccess.addCandidate(this.candidateForm.value).then(res=>{
      this.snackbar.open("Candidate successfully added!", null, {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
      this.spinner.hide();
      this.router.navigate(['/admin']);
    })
  }

}
