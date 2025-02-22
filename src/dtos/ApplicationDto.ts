import { z } from 'zod';

export const createApplicationZodSchema = z.object({
    jobId: z.string(),
    applicantId: z.number(),
});

export const getApplicantsZodSchema = z.object({
    userId: z.string(),
    jobId: z.string()
});

export const getApplicationZodSchema = z.object({
    applicantId: z.number()
});

export type CreateApplicationDto = z.infer<typeof createApplicationZodSchema>

export type GetApplicantsDto = z.infer<typeof getApplicantsZodSchema>

export type GetApplicationDto = z.infer<typeof getApplicationZodSchema>