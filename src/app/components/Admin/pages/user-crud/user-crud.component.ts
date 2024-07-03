import { MaterialModule } from '../../../../material.module';
import { getuser, unlockuser } from '../../../../shared/store/user/user.action';
import { AddEditMemberComponent } from './../add-edit-member/add-edit-member.component';
import { MatDialog } from '@angular/material/dialog';
import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  viewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { users } from '../../../../shared/store/user/user.model';
import { deleteUser, loaduser,lockuser } from '../../../../shared/store/user/user.action';
import { getUserList } from '../../../../shared/store/user/user.selectors';
import { NgxPaginationModule } from 'ngx-pagination';
import { MemberView } from '../../model/memberView';
import { AdminService } from '../../services/admin.service';

//@ts-ignore
const $ = window['$'];
@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, RouterLink,NgxPaginationModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.scss',
})
export class UserCrudComponent {
  storeNgrx = inject(Store<{ user: { user: users } }>);
totalLength:any;
page:number=1;
  members: MemberView[] = [];

  memberToDelete: MemberView | undefined;
  @ViewChild('modal') modal?: ElementRef;


  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) {
    
  }
  ngOnInit(): void {
    this.storeNgrx.dispatch(loaduser());

    this.storeNgrx.select(getUserList).subscribe((item) => {
      this.members = item;
    });
    this.adminService.getMembers().subscribe({
      next: (members) => {
        this.members = members;
      },
    });
  }
  lockMember(id: string) {
    this.storeNgrx.dispatch(lockuser({ id: id }));

  }
  unlockMember(id: string) {
    this.storeNgrx.dispatch(unlockuser({ id: id }));

  }

  
  private findMember(id: string): MemberView | undefined {
    let member = this.members.find((x) => x.id === id);
    if (member) {
      return member;
    }
    return undefined;
  }
  confirm() {
    if (this.memberToDelete) {
 
      this.storeNgrx.dispatch(deleteUser({ id: this.memberToDelete.id })); // Dispatch the deleteUser action with the user's id
      this.toastrService.success(
        `Member ${this.memberToDelete.firstName} has been deleted`
      );
      this.memberToDelete = undefined;
      this.closeModal();
    }
  }
  decline() {
    this.memberToDelete = undefined;
    this.closeModal();
  }
  deleteMember(id: string) {
    let member = this.findMember(id);
    if (member) {
      this.memberToDelete = member;
      this.openModal();
    }
  }
  openModal() {
    $(this.modal?.nativeElement).modal('show');
  }
  closeModal() {
    $(this.modal?.nativeElement).modal('hide');
  }
  editAndUpdate(id?:string){
   
    
    if(id!=null){
      console.log("yes id");
      console.log(id+"if yesss");
      
      
      this.storeNgrx.dispatch(getuser({id:id}))
      this.openEditCreatePopup(id);

    }else{
      console.log("no id");

      this.openEditCreatePopup();
    }

  }
  openEditCreatePopup(id?: string) {
    this.dialog.open(AddEditMemberComponent, {
      width: '40%',
      data: {
        id: id,
      },
    });
  }
}
