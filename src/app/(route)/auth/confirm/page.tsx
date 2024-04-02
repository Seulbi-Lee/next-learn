import { Metadata } from "next";
import AccountComponent from "../_components/account";
import { Button } from "@mantine/core";

export const metadata: Metadata = {
  title: "Confirm",
};

const AuthConfirmPage = ({ searchParams }: { searchParams: { confirmUrl: string } }) => {
  return (
    <>
      <AccountComponent
        message=""
        urlAddress="/auth"
        btnText="Back to main"
      >
        <Button mt="lg" component="a" href={searchParams.confirmUrl}>
          confirm
        </Button>
      </AccountComponent>
    </>
  );
};

export default AuthConfirmPage;
