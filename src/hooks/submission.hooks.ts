import {
  createProjectSubmission,
  getAllSubmissions,
  getMySubmissions,
  getSubmissionStats,
  updateSubmissionStatus,
} from "@/api";
import { toast } from "@/components/ui/toast";
import type {
  ICreateSubmissionPayload,
  ISubmissionsQueryParams,
  SubmissionStatus,
} from "@/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const SUBMISSION_KEYS = {
  all: ["submissions"] as const,
  my: ["submissions", "my"] as const,
  list: (params: ISubmissionsQueryParams) =>
    ["submissions", "list", params] as const,
  stats: ["submissions", "stats"] as const,
};

export const useMySubmissions = () => {
  return useQuery({
    queryKey: SUBMISSION_KEYS.my,
    queryFn: getMySubmissions,
  });
};

export const useSubmissionStats = () => {
  return useQuery({
    queryKey: SUBMISSION_KEYS.stats,
    queryFn: getSubmissionStats,
    refetchInterval: 30000, // Refresh stats every 30s
  });
};

export const useSubmissions = (params: ISubmissionsQueryParams) => {
  return useQuery({
    queryKey: SUBMISSION_KEYS.list(params),
    queryFn: () => getAllSubmissions(params),
    placeholderData: keepPreviousData,
  });
};

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateSubmissionPayload) =>
      createProjectSubmission(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBMISSION_KEYS.all });
      queryClient.invalidateQueries({ queryKey: SUBMISSION_KEYS.my });
      queryClient.invalidateQueries({ queryKey: SUBMISSION_KEYS.stats });
    },
  });
};

export const useUpdateSubmissionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: SubmissionStatus }) =>
      updateSubmissionStatus(id, status),
    onSuccess: (response, variables) => {
      toast.add({
        title: "Status Updated",
        description:
          response?.message ||
          `Submission has been marked as ${variables.status}.`,
        type: "success",
      });

      // Refetch submissions table & statistics cards
      queryClient.invalidateQueries({ queryKey: SUBMISSION_KEYS.all });
      queryClient.invalidateQueries({ queryKey: SUBMISSION_KEYS.stats });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to update submission status. Please try again.";

      toast.add({
        title: "Update Failed",
        description: errorMessage,
        type: "error",
      });
    },
  });
};
