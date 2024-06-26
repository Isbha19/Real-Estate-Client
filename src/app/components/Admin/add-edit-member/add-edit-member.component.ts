import { ToastrService } from 'ngx-toastr';
import { MemberAddEdit } from './../../../core/model/admin/memberAddEdit';
import { Router } from '@angular/router';
import { AdminService } from './../../../core/service/admin.service';

import {  Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { users } from '../../../shared/store/user/user.model';
import {
  adduser,
  addusersuccess,
  getuser,
  updateUser,
  updateUserSuccess,
} from '../../../shared/store/user/user.action';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs';
import { getUser } from '../../../shared/store/user/user.selectors';

@Component({
  selector: 'app-add-edit-member',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-member.component.html',
  styleUrl: './add-edit-member.component.scss',
})
export class AddEditMemberComponent {
  memberForm: FormGroup = new FormGroup({});

  formInitialized = false;
  addNew = true;
  submitted = false;
  errorMessages: string[] = [];
  applicationRoles: string[] = [];
  existingMemberRoles: string[] = [];
  data = inject(MAT_DIALOG_DATA);
  storeNgrx = inject(Store<{ user: { user: users } }>);
  actions$ = inject(Actions);
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<AddEditMemberComponent>,
    private toastr: ToastrService
  ) {
    this.actions$
      .pipe(
        ofType(addusersuccess, updateUserSuccess),
        take(1) // Only take the first occurrence and then unsubscribe
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
  ngOnInit(): void {
    
    this.intializeForm();
    const id = this.data.id;
    if (id) {
      this.addNew = false; 
      this.storeNgrx.select(getUser).subscribe(res=>{
        console.log("again"+JSON.stringify(res));
        
        this.updateForm(res);

            })
     
    } else {
      this.addPasswordValidator();
    }
    this.getRoles();
  } //d

  getMember(id: string) {
    this.adminService.getMember(id).subscribe({
      next: (member) => {
        this.updateForm(member);
      },
    });
  }
  getRoles() {
    this.adminService.getApplicationRoles().subscribe({
      next: (roles) => (this.applicationRoles = roles),
    });
  }

  intializeForm() {
    this.memberForm = this.formBuilder.group({
      id: [''],
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern("^[-'a-zA-Z]+$"),
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern("^[-'a-zA-Z]+$"),
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern(
            "^[A-Za-z0-9!#%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$"
          ),
        ],
      ],
      password: [''],
      roles: ['', Validators.required],
    });
    this.formInitialized = true;
  }
  updateForm(member: MemberAddEdit) {
    if (member) {
      this.memberForm.patchValue({
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        userName: member.userName,
        roles: member.roles,
      });
    }
    this.existingMemberRoles = member.roles.split(',');
    this.formInitialized = true;
  }
  passwordOnChange() {
    if (this.addNew == false) {
      if (this.memberForm.get('password')?.value) {
        this.memberForm.controls['password'].setValidators([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ]);
      } else {
        this.memberForm.get('password')?.clearValidators();
      }
      this.memberForm.controls['password']?.updateValueAndValidity();
    }
  }
  roleOnChange(selectedRole: string) {
    let roles = this.memberForm.get('roles')?.value.split(',');
    const index = roles.indexOf(selectedRole);
    index !== -1 ? roles.splice(index, 1) : roles.push(selectedRole);
    if (roles[0] === '') {
      roles.splice(0, 1);
    }
    this.memberForm.controls['roles'].setValue(roles.join(','));
    console.log(this.memberForm);
  }
  submit() {
    this.submitted = true;

    if (this.memberForm.valid) {
      if (this.addNew) {
        // If it's a new member, dispatch an action to add the user
        this.storeNgrx.dispatch(adduser({ userinput: this.memberForm.value }));
      } else {
        // If it's an existing member being edited, dispatch an action to update the user
        this.storeNgrx.dispatch(
          updateUser({ userInput: this.memberForm.value })
        );
      }
    }
  }
  addPasswordValidator() {
    this.memberForm
      .get('password')
      ?.setValidators([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]);
    this.memberForm.get('password')?.updateValueAndValidity();
  }
}
