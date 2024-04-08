"use client";

import { createClient } from "@/app/_utils/_supabase/client";
import { useEffect, useRef, useState } from "react";
import { useChatSwitchContext } from "../_contexts/chatSwitchProvider";

const PostComponent = ({ currId }: { currId: string }) => {
  const supabase = createClient();
  const [posts, setPosts] = useState<any>([]);
  const usersRef = useRef<any>([]);
  const chatSwitch = useChatSwitchContext();

  useEffect(() => {
    if (!chatSwitch.store.roomId) return;

    (async () => {
      const { data: currUsers, error: userError } = await supabase
        .from("chat_room_users")
        .select("user_id, user_info(username)")
        .eq("chat_room", chatSwitch.store.roomId);
      if (userError) {
        console.log(userError);
        return;
      }
      usersRef.current = currUsers;
    })();
  }, [chatSwitch.store.roomId, supabase])

  useEffect(() => {
    if (!chatSwitch.store.roomId) return;

    (async () => {
      const { data: crrMsg, error: msgError } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("sent_to", chatSwitch.store.roomId);
      if (msgError) {
        console.log(msgError);
        return;
      }
      setPosts(crrMsg);
    })();
  }, [chatSwitch.store.roomId, supabase]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `sent_to=eq.${chatSwitch.store.roomId}`,
        },
        // payload: HTTP 요청을 보낼 때 전달되는 데이터(JSON 형태)
        (payload) => {
          setPosts([...posts, payload.new as any]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, posts, setPosts, chatSwitch.store.roomId]);

  if (!chatSwitch.store) return;
  return (
    <>
      {posts.map((data: any) => {
        let sentUser = null;

        for (let val of usersRef.current) {
          if (val.user_id === data.sent_from) {
            sentUser = val.user_info.username;
          }
        }

        if (data.sent_from === currId) {
          return (
            <div className="send" key={data.id}>
              <div className="message-box">
                <div className="sent-body">{data.body}</div>
              </div>
            </div>
          );
        }

        return (
          <div className="receive" key={data.id}>
            <div className="message-box">
              <div className="sent-from">{sentUser}</div>
              <div className="sent-body">{data.body}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostComponent;
