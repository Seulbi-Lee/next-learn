import type { Metadata } from "next";
import FooterComponent from "./_components/footer";

export const metadata: Metadata = {
  title: "instagram",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="account">
      <section className="account-container">{children}</section>

      <FooterComponent />
    </main>
  );
};

export default AuthLayout;

