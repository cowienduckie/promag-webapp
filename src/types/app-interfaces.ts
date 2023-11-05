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
  image: string | null;
  applicationSetting: ApplicationSetting;
  userLogin: LoginUser | null;
  authenticated: boolean;
  isSettingMenu: boolean;
  isNavBarOpen: boolean;
  access_token: string | null;
  toggleNavBar: () => void;
  toggleSettingMenu: () => void;
  toggleLoadImage: (id: string) => void;
  updateToken: (access_token: string) => void;
}
