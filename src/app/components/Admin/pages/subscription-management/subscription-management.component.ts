import { AddEditPackageComponent } from './../add-edit-package/add-edit-package.component';
import { getPackage, getPackageList } from './../../../../shared/store/SubscriptionPackages/package.selector';
import { deletepackage, getpackage, loadpackage } from './../../../../shared/store/SubscriptionPackages/package.action';
import { Packages } from './../../../../shared/store/SubscriptionPackages/package.model';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Package } from '../../../Subscriptions/model/package';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialog } from '@angular/material/dialog';
//@ts-ignore
const $ = window['$'];
@Component({
  selector: 'app-subscription-management',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgxPaginationModule],
  templateUrl: './subscription-management.component.html',
  styleUrl: './subscription-management.component.scss',

})
export class SubscriptionManagementComponent {
  storeNgrx = inject(Store<{ packages: { package: Packages } }>);

  packages!:Package[];
  page:number=1;
  totalLength:number=0;
  @ViewChild('modal') modal?: ElementRef;
  packagetoDelete: Package | undefined;

  constructor(private fb: FormBuilder,private toastr:ToastrService,private dialog: MatDialog
  ) {
  
  }
  ngOnInit(): void {
    this.storeNgrx.dispatch(loadpackage());
    this.storeNgrx.select(getPackageList).subscribe((item) => {  
      console.log("packages"+JSON.stringify(item));
        
      this.packages = item;
      this.totalLength = item.length;
  
    });
  }

  // createPackage() {
  //   if (this.packageForm.valid) {
  //     const formValue = this.packageForm.value;
  //     this.http.post(`${environment.apiUrl}Subscription/create-product`, formValue)
  //     .subscribe((item) => {
      
  //   this.toastr.success("product created!!!");
  //     });
  //   }
  // }

  // deletePackage(packageId: string) {
  //   this.http.delete(`${environment.apiUrl}Subscription/delete-product/${packageId}`)
  //     .subscribe(response => {
  //       // Handle success
  //     }, error => {
  //       // Handle error
  //     });
  // }

  deletePackage(packageId:string){
    let packagefound = this.findPackage(packageId);
    if (packagefound) {
      this.packagetoDelete = packagefound;
      this.openModal();
    }
    }
    private findPackage(id: string): Package | undefined {
      let packagefound = this.packages.find((x) => x.id === id);
      if (packagefound) {
        return packagefound;
      }
      return undefined;
    }
  openModal() {
    $(this.modal?.nativeElement).modal('show');
  }
  closeModal() {
    $(this.modal?.nativeElement).modal('hide');
  }
  confirm(){
    if (this.packagetoDelete) {
 
      this.storeNgrx.dispatch(deletepackage({ id: this.packagetoDelete.id })); // Dispatch the deleteUser action with the user's id
      this.packagetoDelete = undefined;
      this.closeModal();
    }
  }
  decline(){
    this.packagetoDelete = undefined;
    this.closeModal();
  }

editAndUpdate(id?:string){
   
  if(id!=null){

    this.storeNgrx.dispatch(getpackage({id:id}))
    this.openEditCreatePopup(id);

  }else{
    console.log("no id");

    this.openEditCreatePopup();
  }

}
openEditCreatePopup(id?:string){
  this.dialog.open(AddEditPackageComponent, {
    width: '40%',
    data: {
      id: id,
    },
  });
}
}
