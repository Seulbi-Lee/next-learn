"use client";

import { createClient } from "@/app/_utils/_supabase/client";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  sent_at: string;
  sent_from: string;
  body: string;
  username: string;
};

const RealtimeComponent = ({
  currId,
  messages,
  users,
}: {
  currId: string | undefined;
  messages: Post[];
  users: Post[];
}) => {
  const supabase = createClient();
  const [ posts, setPosts ] = useState(messages);

  useEffect(() => {
    const channel = supabase
      .channel("realtime chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        (payload) => {    // payload: HTTP 요청을 보낼 때 전달되는 데이터(JSON 형태)
          console.log(payload.new);
          setPosts([...posts, payload.new as Post]);
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, posts, setPosts]);

  return (
    <>
      {posts.map((data: any, index: number) => {
        let sentUser = null;

        for (let val of users) {
          if (val.id === data.sent_from) {
            sentUser = val.username;
          }
        }

        if (data.sent_from === currId) {
          return (
            <div className="sent" key={data.id}>
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

export default RealtimeComponent;
