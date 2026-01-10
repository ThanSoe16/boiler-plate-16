import z from 'zod';

export interface MetaResponse {
  success: boolean;
  message: string;
  devMessage?: string;
}
export interface APIResponse<T> {
  meta?: MetaResponse;
  body?: {
    currentPage?: number;
    total?: number;
    pageCount?: number;
    rowPerPage?: number;
    otp?: string;
    data: T;
  };
}

export const paginationFilterSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  page_size: z.number().optional(),
});
export type PaginationFilter = z.infer<typeof paginationFilterSchema>;
