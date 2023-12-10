export interface LoginUser {
  userName: string;
  email: string;
}

export interface ApplicationSetting {
  pageSize: number;
}

export interface LoadImage {
  image: string;
}

export interface AuthorizeInfo {
  access_token: string;
}

export interface AppState {
  userLogin: LoginUser | null;
  authenticated: boolean;
  access_token: string | null;
  updateToken: (access_token: string) => void;
}
