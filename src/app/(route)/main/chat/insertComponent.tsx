"use client";
import { createClient } from "@/app/_utils/_supabase/client";
import { Flex, Group, TextInput, UnstyledButton, Button } from "@mantine/core";
import { FC, FormEvent, PropsWithChildren, useRef } from "react";

type chatProps = {
  currId: string | undefined;
};

const InsertComponent:FC<PropsWithChildren<chatProps>>  = ({
  currId,
}) => {
  const supabase = createClient();
  const sendRef = useRef<HTMLInputElement>(null);

  const sendTextHandler = async (event: FormEvent) => {
    event.preventDefault();

    if(!sendRef.current) return;
    const newMessage = sendRef.current.value;
    
    const { error } = await supabase.from("chat_messages").insert({
      body: newMessage,
      sent_from: currId,
    });

    if( error ) {
      console.log(error);
      return;
    }

    sendRef.current.value = "";
  }

  return (
    <>
      <form onSubmit={sendTextHandler}>
        <Group justify="flex-start" gap="sm" className="insert-form">
          <TextInput ref={sendRef} className="insert-input" radius="xl" placeholder="Enter Text"/>
          <Button variant="filled" size="sm" radius="xl" type="submit">send</Button>
        </Group>
      </form>
    </>
  )
}

export default InsertComponent;