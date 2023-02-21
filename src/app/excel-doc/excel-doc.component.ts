import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'excel-doc',
  templateUrl: './excel-doc.component.html',
  styleUrls: ['./excel-doc.component.css']
})
export class ExcelDocComponent implements OnInit {

  arrayC:any|undefined;
  arrayI:any|undefined;

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef | undefined;
  fileUploadForm: FormGroup = new FormGroup({

  })
  fileInputLabel: string | undefined;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
  }

  onFileSelect(event: any) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event?.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm?.get('myfile')?.setValue(file);
      }
    }
  }


  async onFormSubmit(): Promise<any> {

    if (!this.fileUploadForm?.get('myfile')?.value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('formFile', this.fileUploadForm?.get('myfile')?.value);
    formData.append('agentId', '007');


    await this.http.post<any>('https://localhost:7172/api/ReadExcel/import', formData).subscribe(response => {
      console.log(response);
      if (response.msg === "OK") {
        console.log(response.data)
        this.arrayC=response.data.corrects
        this.arrayI=response.data.inCorrects
        // Reset the file input
        if (this.uploadFileInput)
          this.uploadFileInput.nativeElement.value = "";
        this.fileInputLabel = undefined;
      }
    }, error => {
      console.log(error);
    });
    console.log("array",this. arrayC)
    
  }
}
