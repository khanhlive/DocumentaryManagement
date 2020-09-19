export interface UpdateUserOutput {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  fullName: string;
  lastLoginTime?: any;
  creationTime: Date;
  roleNames: string[];
  id: number;
  organization: string;
  address: string;
  provinceId: number;
  phoneNumber: string;
  fullName2: string;
}
