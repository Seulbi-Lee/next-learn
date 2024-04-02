"use client";
import AccountComponent from "@/app/(route)/auth/_components/account";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/_utils/_supabase/client";

const SignUpPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const fullnameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();
  const router = useRouter();

  const signupHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (
      !emailRef.current ||
      !passwordRef.current ||
      !fullnameRef.current ||
      !usernameRef.current
    ) {
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
      options: {
        emailRedirectTo: "http://localhost:3000/api/auth",
        data: {
          username: usernameRef.current!.value.trim(),
          fullname: fullnameRef.current!.value.trim(),
        },
      },
    });

    if (error) {
      if (error.status === 400) {
        alert("Username already exists");
      } else {
        alert("Unknown Error: try again");
      }
      return;
    }

    alert("check your email");

    router.push("/");
  }

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
          <form onSubmit={signupHandler}>
            <TextInput
              ref={emailRef}
              placeholder="Mobile Number or Email"
              required
            />
            <TextInput
              ref={fullnameRef}
              mt="xs"
              placeholder="Full Name"
              required
            />
            <TextInput
              ref={usernameRef}
              mt="xs"
              placeholder="Username"
              required
            />
            <PasswordInput
              ref={passwordRef}
              mt="xs"
              placeholder="Password"
              required
            />

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
