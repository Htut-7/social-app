import { NextResponse } from "next/server";
import { ZodError } from "zod";

const handleSuccessResponse = (data: unknown, status: number = 200) => {
  return NextResponse.json(
    {
      data,
      success: true,
    },
    { status }
  );
};

const handleErrorResponse = (e: unknown) => {
  let status = 500;
  let details = null;
  let message = e instanceof Error ? e.message : "Something went wrong";

  if (e instanceof ZodError) {
    details = e.flatten().fieldErrors;
    status = 400;
    message = "Validation Error";
  }

  return NextResponse.json(
    {
      message,
      details,
      success: false,
    },
    { status }
  );
};

const actionError = (e: unknown) => {
  let message = e instanceof Error ? e.message : "Internal Server Error";
  let details = null;

  if (e instanceof ZodError) {
    details = e.flatten().fieldErrors;
    message = "Validation Error";
  }

  return NextResponse.json({
    message,
    details,
  });
};

export { actionError, handleErrorResponse, handleSuccessResponse };
