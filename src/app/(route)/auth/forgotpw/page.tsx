"use client";
import AccountComponent from "@/app/(route)/auth/_components/account";
import { createClient } from "@/app/_utils/_supabase/client";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();

  const passwordHandler = async (event: FormEvent) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.resetPasswordForEmail(
      emailRef.current!.value,
      {
        redirectTo: "http://localhost:3000/auth/resetpw",
      }
    );

    if(error){
      console.log(error);
      return;
    }

    alert("check your email");

    router.push("/");
  };

  return (
    <>
      <AccountComponent
        message=""
        urlAddress="/auth/signin"
        btnText="Back to login"
      >
        <Group justify="center" mt="lg" mb="md">
          <p>Trouble logging in?</p>
          <p>
            Enter your email, phone, or username and we will send you a link to
            get back into your account.
          </p>
        </Group>
        <Box mt="xl" mb="sm">
          <form onSubmit={passwordHandler}>
            <TextInput
              ref={emailRef}
              placeholder="Phone number, username or email"
            />
            <Button mt="md" fullWidth type="submit">
              Send login link
            </Button>
          </form>
        </Box>
      </AccountComponent>
    </>
  );
};

export default ForgotPasswordPage;
