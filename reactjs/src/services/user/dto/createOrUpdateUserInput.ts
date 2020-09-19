export interface CreateOrUpdateUserInput {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  roleNames: string[];
  password: string;
  id: number;
  fullName: string;
  organization: string;
  address: string;
  provinceId: number;
  phoneNumber: string;
  fullName2: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}
