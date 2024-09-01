/* tslint:disable */
/* eslint-disable */
export interface UserResponse {
  aboutYou?: string;
  activated?: boolean;
  banned?: boolean;
  birthday?: string;
  email?: string;
  firstname?: string;
  id?: number;
  lastname?: string;
  nickname?: string;
  password?: string;
  role?: 'TEST' | 'USER' | 'ADMIN' | 'MODER';
  userCover?: Array<string>;
  userPageId?: string;
}
