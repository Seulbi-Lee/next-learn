import AccountComponent from "@/app/(route)/auth/_components/account";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import Link from "next/link";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "sign in · instagram",
};

const SignInPage = async () => {
  return (
    <>
      <AccountComponent
        message="Don't have an account?"
        urlAddress="/auth/signup"
        btnText="Sign up"
      >
        <Box mt="xl" mb="sm">
          <TextInput placeholder="Phone number, username or email" />
          <PasswordInput mt="xs" placeholder="Password" />

          <Button mt="md" fullWidth>
            Log in
          </Button>
        </Box>
        <Group justify="center" mt="xl" mb="md">
          <Link className="font-sm" href="/auth/resetpw">
            Forgot password?
          </Link>
        </Group>
      </AccountComponent>
    </>
  );
};

export default SignInPage;
