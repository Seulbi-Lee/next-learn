"use client";
import { createClient } from "@/app/_utils/_supabase/client";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

const MainFeedPage = () => {
  const supabase = createClient();
  const router = useRouter();

  const logoutHandler = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    router.push("/auth");
  };

  return (
    <>
      <p>hi</p>
      <Button onClick={ logoutHandler }>Sign out</Button>
    </>
  );
};

export default MainFeedPage;
