import { createServer } from "@/app/_utils/_supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createServer();
  const code = req.nextUrl.searchParams.get("code");
  
  // url로 code를 받아서 로그인 session 으로 변경
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect("http://localhost:3000");
}