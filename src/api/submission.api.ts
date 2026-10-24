import apiClient from "@/lib/apiClient";
import type {
  ICreateSubmissionPayload,
  ICreateSubmissionResponse,
  IMySubmissionsResponse,
  ISubmissionStatsResponse,
  ISubmissionsQueryParams,
  ISubmissionsResponse,
  IUpdateSubmissionStatusResponse,
  SubmissionStatus,
} from "@/types";

export const createProjectSubmission = async (
  payload: ICreateSubmissionPayload,
): Promise<ICreateSubmissionResponse> => {
  return await apiClient<ICreateSubmissionResponse>("/submissions", {
    method: "POST",
    body: payload,
  });
};

export const getMySubmissions = async (): Promise<IMySubmissionsResponse> => {
  return await apiClient<IMySubmissionsResponse>("/submissions/my-submition", {
    method: "GET",
  });
};

export const getSubmissionStats =
  async (): Promise<ISubmissionStatsResponse> => {
    return await apiClient<ISubmissionStatsResponse>("/submissions/stats", {
      method: "GET",
    });
  };

export const getAllSubmissions = async (
  params?: ISubmissionsQueryParams,
): Promise<ISubmissionsResponse> => {
  const query: Record<string, string | number> = {};

  if (params?.page) {
    query.page = params.page;
  }
  if (params?.limit) {
    query.limit = params.limit;
  }
  if (params?.status && params.status !== "ALL") {
    query.status = params.status;
  }

  return await apiClient<ISubmissionsResponse>("/submissions", {
    method: "GET",
    query,
  });
};

export const updateSubmissionStatus = async (
  id: string,
  status: SubmissionStatus,
): Promise<IUpdateSubmissionStatusResponse> => {
  return await apiClient<IUpdateSubmissionStatusResponse>(
    `/submissions/${id}/status`,
    {
      method: "PATCH",
      body: { status },
    },
  );
};
