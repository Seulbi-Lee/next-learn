import type { Metadata } from "next";
import FooterComponent from "./_components/footer";
import { createServer } from "@/app/_utils/_supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "instagram",
};

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServer();
  const authInfo = await supabase.auth.getSession();
  const session = authInfo.data.session;

  if (!session) {
    return (
      <main className="account">
        <section className="account-container">{children}</section>

        <FooterComponent />
      </main>
    );
  }

  redirect("/");
};

export default AuthLayout;
