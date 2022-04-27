export interface User {
  id: number;
  email: string;
  password: string;
}
export type createUserData = Omit<User, 'id'>;
