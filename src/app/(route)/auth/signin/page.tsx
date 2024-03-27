"use client";
import AccountComponent from "@/app/(route)/auth/_components/account";
import { createClient } from "@/app/_utils/_supabase/client";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";

const SignInPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();

  const signInHandler = async (event: FormEvent) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    });

    if (error) {
      if (error.status === 400) {
        alert ("Wrong username or password");
      } else {
        alert("Unknown Error: try again");
      } 
      return;
    }

    router.push("/main");
  };

  useEffect(() => {}, []);

  return (
    <>
      <AccountComponent
        message="Don't have an account?"
        urlAddress="/auth/signup"
        btnText="Sign up"
      >
        <Box mt="xl" mb="sm">
          <form onSubmit={signInHandler}>
            <TextInput
              ref={emailRef}
              placeholder="Phone number, username or email"
              required
            />
            <PasswordInput ref={passwordRef} mt="xs" placeholder="Password" required/>

            <Button mt="md" fullWidth type="submit">
              Log in
            </Button>
          </form>
        </Box>
        <Group justify="center" mt="xl" mb="md">
          <Link className="font-sm" href="/auth/forgotpw">
            Forgot password?
          </Link>
        </Group>
      </AccountComponent>
    </>
  );
};

export default SignInPage;
