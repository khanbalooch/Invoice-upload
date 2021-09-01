import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices: null;
  constructor() { }

  async ngOnInit() {
    try {
      let result = await axios.get('http://localhost:3000/invoices');
      this.invoices = result.data;
      console.log(result);
    } catch (error) {
      console.log(error)
    }
  }

}
