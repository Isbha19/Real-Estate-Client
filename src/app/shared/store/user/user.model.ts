import { MemberAddEdit } from './../../../components/Admin/model/memberAddEdit';
import { MemberView } from "../../../components/Admin/model/memberView";


export interface users {
  userlist: MemberView[];
  userobj:MemberAddEdit;
    ErrorMessage: string;
}
