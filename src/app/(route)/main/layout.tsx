import { createServer } from "@/app/_utils/_supabase/server";
import { redirect } from "next/navigation";
import NavComponent from "./_components/nav";
import { Flex } from "@mantine/core";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServer();
  const authInfo = await supabase.auth.getSession();
  const session = authInfo.data.session;

  // session 없으면 로그인페이지로
  if (!session) { 
    redirect("/auth");
  }

  // session 있으면, session 의 id가 user_info 테이블에 있는지 확인하고
  const uid = session.user.id;
  const { data, error } = await supabase
    .from("user_info")
    .select()
    .eq("id", uid);

  if (error) {
    console.log(error);
    return;
  }

  // 없으면 data 꺼내와서 row 생성.
  if (!data.length) {
    const { error } = await supabase.from("user_info").insert({
      id: uid,
      email: session.user.user_metadata.email,
      username: session.user.user_metadata.username,
      fullname: session.user.user_metadata.fullname,
    });

    if (error) {
      console.log(error);
      return;
    }
  }

  const userInfo = await supabase
    .from("user_info")
    .select("username")
    .eq("id", uid);

  if (!userInfo.data) return;

  const username = userInfo.data[0].username;

  if (userInfo.error) {
    console.log(error);
    return;
  }

  return (
    <>
      <Flex justify="flex-start" align="flex-start" gap="0" h="100%">
        <NavComponent username={username} />
        {children}
      </Flex>
    </>
  );
};

export default MainLayout;
