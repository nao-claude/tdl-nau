import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    "google.com, ca-pub-8944633356519670, DIRECT, f08c47fec0942fa0\n",
    {
      headers: { "Content-Type": "text/plain" },
    }
  );
}
