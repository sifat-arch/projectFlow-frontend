import { z } from "zod";

export const submissionValidationSchema = z.object({
  projectName: z
    .string({ error: "Project name is required" })
    .trim()
    .min(3, "Project name must be at least 3 characters long"),

  frontendRepoUrl: z
    .string({ error: "Frontend repository URL is required" })
    .trim()
    .min(1, "Frontend repository URL is required")
    .url("Please enter a valid URL (e.g. https://github.com/username/project)"),

  backendRepoUrl: z
    .string()
    .trim()
    .url("Please enter a valid URL (e.g. https://github.com/username/backend)")
    .optional()
    .or(z.literal("")),

  liveLink: z
    .string({ error: "Live demo link is required" })
    .trim()
    .min(1, "Live demo link is required")
    .url("Please enter a valid URL (e.g. https://myproject.vercel.app)"),

  description: z
    .string({ error: "Description is required" })
    .trim()
    .min(10, "Description must be at least 10 characters long"),
});

export type SubmissionFormValues = z.infer<typeof submissionValidationSchema>;
