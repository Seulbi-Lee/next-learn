import { createServer } from "./_utils/_supabase/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const supabase = createServer();
  const authInfo = await supabase.auth.getSession();
  const session = authInfo.data.session;

  if (!session) {
    redirect("/auth");
  }
  redirect("/main");
};

export default Home;
