"use client"
import { Box, Button, Group, PasswordInput } from "@mantine/core";
import { useRef } from "react";
import AccountComponent from "../_components/account";
import { createClient } from "@/app/_utils/_supabase/client";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();

  const passwordHandler = async() => {
    const { data, error } = await supabase.auth.updateUser({
      password: passwordRef.current!.value
    });

    if(error) {
      console.log(error);
      return;
    }

    alert("Password change successful");

    router.push("/");
  }

  return (
    <>
      <AccountComponent
        message=""
        urlAddress="/auth/signin"
        btnText="Back to login"
      >
        <Group justify="center" mt="lg" mb="md">
          <p>
            Enter your new password.
          </p>
        </Group>
        <Box mt="xl" mb="sm">
          <form onSubmit={passwordHandler}>
            <PasswordInput
              ref={passwordRef}
              placeholder="password"
            />
            <Button mt="md" fullWidth type="submit">
              Reset password
            </Button>
          </form>
        </Box>   
      </AccountComponent>   
    </>
  );
}

export default ResetPasswordPage;