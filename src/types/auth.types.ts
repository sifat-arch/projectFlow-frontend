export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "MENTOR";
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  };
}
