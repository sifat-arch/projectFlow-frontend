export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ISubmissionUser {
  id: string;
  name: string;
  email: string;
}

export interface ISubmission {
  id: string;
  projectName: string;
  frontendRepoUrl: string;
  backendRepoUrl?: string | null;
  liveLink: string;
  description: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: ISubmissionUser;
}

export interface IMySubmissionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ISubmission[];
}

export interface ICreateSubmissionPayload {
  projectName: string;
  frontendRepoUrl: string;
  backendRepoUrl?: string;
  liveLink: string;
  description: string;
}

export interface ICreateSubmissionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ISubmission;
}

export interface ISubmissionStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface ISubmissionMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ISubmissionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: ISubmissionMeta;
  data: ISubmission[];
}

export interface ISubmissionStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ISubmissionStats;
}

export interface IUpdateSubmissionStatusResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ISubmission;
}

export interface ISubmissionsQueryParams {
  page?: number;
  limit?: number;
  status?: SubmissionStatus | "ALL";
}
