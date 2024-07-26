import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberView } from '../model/memberView';
import { environment } from '../../../../environments/environment';
import { MemberAddEdit } from '../model/memberAddEdit';
import { AdminDashboardStatistics } from '../model/AdminDashboardStatistics';
import { UserRoleStatistics } from '../model/UserRoleStatistics';
import {TopCompaniesDto} from '../model/TopCompaniesDto'
@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<MemberView[]>(
      `${environment.apiUrl}Admin/get-members`
    );
  }
  getMember(id: string) {
    return this.http.get<MemberAddEdit>(
      `${environment.apiUrl}Admin/get-member/${id}`
    );
  }
  getApplicationRoles() {
    return this.http.get<string[]>(
      `${environment.apiUrl}Admin/get-application-roles`
    );
  }
  getAdminDashboardStatistics() {
    return this.http.get<AdminDashboardStatistics>(
      `${environment.apiUrl}Admin/dashboard-statistics`
    );
  }
  getUserRoleStatistics() {
    return this.http.get<UserRoleStatistics>(
      `${environment.apiUrl}Admin/user-role-statistics`
    );
  }
  getTopPerformingCompanies() {
    return this.http.get<TopCompaniesDto[]>(
      `${environment.apiUrl}Admin/top-performing-companies`
    );
  }
  addEditMember(model: MemberAddEdit) {
    return this.http.post(
      `${environment.apiUrl}Admin/add-edit-member`,
      model
    );
  }
  lockMember(id: string) {
    return this.http.put(
      `${environment.apiUrl}Admin/lock-member/${id}`,
      {}
    );
  }
  unlockMember(id: string) {
    return this.http.put(
      `${environment.apiUrl}Admin/unlock-member/${id}`,
      {}
    );
  }
  deleteMember(id: string) {
    return this.http.delete(
      `${environment.apiUrl}Admin/delete-member/${id}`,
      {}
    );
  }
}
