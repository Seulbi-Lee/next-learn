"use client";
import AccountComponent from "@/app/(route)/auth/_components/account";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import { useRef } from "react";
import { createClient } from "@/app/_utils/supabase/client";

const SignUpPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  
  const signInHandler = async (event: any) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    });
    if (error) {
      throw error;
    }
    console.log(emailRef.current!.value, passwordRef.current!.value);
  };

  return (
    <>
      <AccountComponent
        message="Have an account?"
        urlAddress="/auth/signin"
        btnText="Log in"
      >
        <Group justify="center" mt="lg" mb="md">
          <p>Sign up to see photos and videos from your friends.</p>
        </Group>
        <Box mt="xl" mb="sm">
          <form onSubmit={signInHandler}>
            <TextInput ref={emailRef} placeholder="Mobile Number or Email" />
            {/* <TextInput mt="xs" placeholder="Full Name" /> */}
            {/* <TextInput mt="xs" placeholder="Username" /> */}
            <PasswordInput ref={passwordRef} mt="xs" placeholder="Password" />

            <Button mt="md" fullWidth type="submit">
              Sign up
            </Button>
          </form>
        </Box>
      </AccountComponent>
    </>
  );
};

export default SignUpPage;
