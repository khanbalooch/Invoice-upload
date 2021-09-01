import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices/invoices.component';


const routes: Routes = [
  { path: '', redirectTo: 'file-upload', pathMatch:'full' },
  { path: 'file-upload', component: FileUploadComponent },
  { path: 'invoices', component: InvoicesComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
