import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios  from 'axios';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  uploadForm: FormGroup;
  showCaseData: AOA = [[], []];
  headerRow: any [] = [];
  data: any;
  importedWorkSheet: XLSX.WorkSheet;

  constructor(private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: new FormControl(null, Validators.required),
      startingRow: new FormControl(1, [Validators.required]),
      startingColumn: new FormControl(1, [Validators.required])
    });
  }

  setRowAndColumn(){
    this.uploadForm.controls.startingColumn.setValue(1);
    this.uploadForm.controls.startingRow.setValue(1);
  }

  setHeaderRow(){
    this.headerRow = this.showCaseData[0];
  }

  async upload(evt: any) {
    try {
      this.setRowAndColumn();

      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const workBook: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary', raw: true});

        /* grab first sheet */
        const workSheetName: string = workBook.SheetNames[0];
        this.importedWorkSheet = workBook.Sheets[workSheetName];
        this.data = this.convertWorkSheetToArray(this.importedWorkSheet);
        // this.uploadfile(this.data);
        this.showCaseData  = this.data.slice(0, 6);
        this.setHeaderRow();
      };
      reader.readAsBinaryString(target.files[0]);
    } catch (error) {
      console.log(error);
    }

  }

  rowChange(){
    if (this.uploadForm.valid) {
      const firstRow = this.uploadForm.controls.startingRow.value - 1;
      this.showCaseData =  this.data.slice(firstRow, firstRow + 5);
      this.setHeaderRow();
    }
  }
  colChange(){
    if(this.uploadForm.valid){
      let firstCol = this.uploadForm.controls.startingColumn.value - 1;
      this.showCaseData = this.showCaseData.map((val) => {
      const sliced  = val.slice(firstCol , val.length);
      return sliced;
    });
    this.setHeaderRow();
    }
  }

  convertWorkSheetToArray(workSheet){
    return (XLSX.utils.sheet_to_json(workSheet, {header: 1}));
  }
  async uploadFile(){
    try {
      let result = axios.post('http://localhost:3000/invoices',{
        invoices: this.data
      });
      this.router.navigate(['invoices']);
    } catch (error) {
      console.log(error);
    }
  }
}
