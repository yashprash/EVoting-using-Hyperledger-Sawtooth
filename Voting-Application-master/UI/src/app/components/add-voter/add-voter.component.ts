import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataAccessService } from 'src/app/services/data-access.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-voter',
  templateUrl: './add-voter.component.html',
  styleUrls: ['./add-voter.component.css']
})
export class AddVoterComponent implements OnInit {

  voterForm = this.fb.group({
    voterId: ['', [Validators.required,Validators.pattern('[A-Za-z0-9]*')]],
    constituencyId: ['',Validators.required],
    password: ['']
  });

  codes: any[];
  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private dataAccess: DataAccessService, 
    private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.spinner.show();
      this.dataAccess.getConstituencies().then(res=>{
        this.codes=res as any[];
        this.spinner.hide();
      })
  }

  onSubmit(){
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890*&^%$#@!";
    let text = "";
  for (let i = 0; i < 12; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  this.voterForm.controls.password.setValue(text);
  console.log(this.voterForm.value);
  this.spinner.show();
    this.dataAccess.addVoter(this.voterForm.value).then(res=>{
      this.snackbar.open("Voter successfully added!", null, {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
      this.spinner.hide();
      this.router.navigate(['/admin']);
    })
  }

}
