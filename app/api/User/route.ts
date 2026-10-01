import { GetRegister } from "@/components/lib/action/GetRegister.action";
import { Register } from "@/components/lib/action/Register.action";
import { handleErrorResponse } from "@/components/lib/response";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await Register(body);

    return NextResponse.json(result);
  } catch (e: unknown) {
    return handleErrorResponse(e);
  }
}

export async function GET() {
  const result = await GetRegister();
  return NextResponse.json(result);
}
