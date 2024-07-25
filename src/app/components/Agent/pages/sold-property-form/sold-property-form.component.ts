import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';
import { AgentPropertyService } from '../../services/agentProperty.service';
import { AllUsers } from '../../model/AllUsers';
import { map, Observable, startWith } from 'rxjs';
import { PropertyRevenue } from '../../model/propertyRevenue';

@Component({
  selector: 'app-sold-property-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MaterialModule],
  templateUrl: './sold-property-form.component.html',
  styleUrl: './sold-property-form.component.scss'
})
export class SoldPropertyFormComponent {
  soldForm: FormGroup;
users:AllUsers[]=[];
filteredUsers!: Observable<AllUsers[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SoldPropertyFormComponent>,
    private agentPropertyService:AgentPropertyService
  ) {
    this.soldForm = this.fb.group({
      revenue: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      soldTo: ['']
    });
  }
  ngOnInit(): void {
    this.agentPropertyService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        
      }
    });
    this.filteredUsers = this.soldForm.get('soldTo')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterUsers(value || ''))
    );
    
  }
  private _filterUsers(value: any): AllUsers[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    const result = this.users.filter(user =>
      user.userName && user.userName.toLowerCase().includes(filterValue)
    );
    return result;
  }

  displayFn(user:AllUsers): string {
    return user.userName;
  }
 

  onNoClick(){
    this.dialogRef.close();
  }
  onSubmit() {
    console.log(this.soldForm.value.soldTo);
    
    if (this.soldForm.valid) {
      const selectedUser = this.users.find(user => user.userId === this.soldForm.value.soldTo.userId);
      if (selectedUser) {
console.log(selectedUser);

        const propertyRevenue: PropertyRevenue = {
          SoldToUserId: selectedUser.userId,
          Revenue: parseInt(this.soldForm.value.revenue, 10),
          PropertyId: 0 
        };
        this.dialogRef.close(propertyRevenue);
      }
  }
}
}
