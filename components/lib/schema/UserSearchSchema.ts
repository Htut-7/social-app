import z from "zod";

const UserSearchSchema = z.object({
  page: z.number().positive(),
  pageSize: z.number().positive(),
  search: z.string(),
});

export default UserSearchSchema;
