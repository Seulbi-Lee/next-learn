"use client";
import { FC, PropsWithChildren } from "react";
import { createClient } from "@/app/_utils/_supabase/client";
import { UnstyledButton } from "@mantine/core";
import { useRouter } from "next/navigation";
import Link from "next/link";

type navProps = {
  username: string | null;
}

const NavComponent:FC<PropsWithChildren<navProps>> = ({
  username,
}) => {
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
      <nav className="nav-bar">
        <div className="user-name">{username}</div>
        <div className="nav-link"><Link href="/main">HOME</Link></div>
        <div className="nav-link"><Link href="/main/chat">MESSAGE</Link></div>
        <div className="nav-link"><Link href="/main/upload">UPLOAD</Link></div>
        <div className="nav-link"><Link href="/main/profile">PROFILE</Link></div>
        <div className="nav-link logout-btn"><UnstyledButton onClick={logoutHandler}>LOGOUT</UnstyledButton></div>
      </nav>
    </>
  );
};

export default NavComponent;
