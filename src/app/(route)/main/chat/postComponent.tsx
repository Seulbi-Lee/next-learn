import { createServer } from "@/app/_utils/_supabase/server";
import { FC, PropsWithChildren } from "react";
import RealtimeComponent from "./realtimeComponent";

type chatProps = {
  currId: string | undefined;
};

const PostsComponent: FC<PropsWithChildren<chatProps>> = async ({
  currId,
}) => {
  const supabase = createServer();

  const messages = await supabase.from("chat_messages").select();
  if (messages.error) {
    console.log(messages.error);
    return;
  }

  const users = await supabase.from("user_info").select();
  if (users.error) {
    console.log(users.error);
    return;
  }
 
  if (!messages.data) return;
  return (
    <>
      <RealtimeComponent messages={messages.data} users={users.data} currId={currId}/>
    </>
  );
};

export default PostsComponent;

