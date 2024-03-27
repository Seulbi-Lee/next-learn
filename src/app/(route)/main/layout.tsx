import { createServer } from "@/app/_utils/_supabase/server";
import { redirect } from "next/navigation";

const MainFeedLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServer();
  const authInfo = await supabase.auth.getSession();
  const session = authInfo.data.session;

  if (!session) {
    redirect("/");
  }

  return <>{children}</>;
};

export default MainFeedLayout;
