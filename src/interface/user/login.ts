/** user's role */
export type Role = 'admin';

export interface LoginParams {
  /** 用户名 */
  email: string;
  /** 用户密码 */
  password: string;
}

export interface LoginResult {
  /** auth token */
  token: string;
  email: string;
  // role: Role;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
