import z from "zod";

const GetRegisterSchema = z.object({
  userId: z.string(),
});

export default GetRegisterSchema;
