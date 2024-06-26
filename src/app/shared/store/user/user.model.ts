import { MemberAddEdit } from '../../../core/model/admin/memberAddEdit';
import { MemberView } from '../../../core/model/admin/memberView';

export interface users {
  userlist: MemberView[];
  userobj:MemberAddEdit;
    ErrorMessage: string;
}
