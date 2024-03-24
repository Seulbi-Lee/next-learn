import AccountComponent from "@/app/(route)/auth/_components/account";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "reset password · instagram",
}

const ResetPasswordPage = () => {
  return (
    <>
      <AccountComponent message="" urlAddress="/auth/signin" btnText="Back to login">
        <Group justify="center" mt="lg" mb="md">
          <p>Trouble logging in?</p>
          <p>Enter your email, phone, or username and we will send you a link to get back into your account.</p>
        </Group>
        <Box mt="xl" mb="sm">
          <TextInput placeholder="Phone number, username or email" />

          <Button mt="md" fullWidth>
            Send login link
          </Button>
        </Box>
      </AccountComponent>
    </>
  );
}

export default ResetPasswordPage;