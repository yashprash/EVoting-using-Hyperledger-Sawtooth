import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { DataAccessService } from 'src/app/services/data-access.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.css']
})
export class AddPartyComponent implements OnInit {

  partyForm = this.fb.group({
    partyId: ['',[Validators.required,Validators.pattern('[A-Za-z0-9]*')]]
    //,partySymbol: ['', Validators.required]
  });
  selectedFile: File;
  formJson: any;
  constructor(private fb: FormBuilder, private dataAccess: DataAccessService, private spinner: NgxSpinnerService, 
    private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.spinner.show();
    this.formJson=this.partyForm.value;
    var fileByteArray=[];
    var reader=new FileReader();
    reader.onload=(evt)=>{
      var theBytes=reader.result;
      fileByteArray.push(theBytes);
      this.formJson['partySymbol']=fileByteArray[0];
      //this.formJson['partySymbol']=Array.from(new Uint8Array(fileByteArray[0]));
      //console.log(this.formJson['partySymbol']);
      this.dataAccess.addParty(this.formJson).then(res=>{
        this.snackbar.open("Party successfully added!", null, {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.spinner.hide();
        this.router.navigate(['/admin']);
      })
    }
    reader.readAsDataURL(this.selectedFile);
  }

  onFileChanged(event)
  {
    if(event.target.files[0].size>2097152)
    {
      this.selectedFile=null;
      this.snackbar.open("Image should be lesser than 2MB!", null, {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    }
    else{
      this.selectedFile=event.target.files[0];
    }
  }
}
