import { GetRegisterById } from "@/components/lib/action/GetRegister.action";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = await GetRegisterById({ userId: id });

  return NextResponse.json(result, {
    status: result.success ? 200 : 400,
  });
}
