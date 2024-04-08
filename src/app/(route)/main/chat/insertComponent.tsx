"use client";
import { createClient } from "@/app/_utils/_supabase/client";
import { Group, TextInput, Button } from "@mantine/core";
import { FC, FormEvent, useRef } from "react";
import { useChatSwitchContext } from "../_contexts/chatSwitchProvider";

const InsertComponent = ({
  currId,
}: {
  currId: string;
}) => {
  const supabase = createClient();
  const sendRef = useRef<HTMLInputElement>(null);
  const chatSwitch = useChatSwitchContext();

  const sendTextHandler = async (event: FormEvent) => {
    event.preventDefault();

    if(!sendRef.current) return;
    const newMessage = sendRef.current.value;
    
    const { error } = await supabase.from("chat_messages").insert({
      body: newMessage,
      sent_from: currId,  // auth.uid() 로 설정 바꿨는데 이거 지우면 오류남
      sent_to: chatSwitch.store.roomId,
    });

    if( error ) {
      console.log(error);
      return;
    }

    sendRef.current.value = "";
  }

  if (!chatSwitch.store) return;
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