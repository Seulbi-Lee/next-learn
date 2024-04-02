import { createServer } from "@/app/_utils/_supabase/server";
import { Flex, UnstyledButton } from "@mantine/core";
import InsertComponent from "./insertComponent";
import PostsComponent from "./postComponent";

const ChatPage = async () => {
  const supabase = createServer();
  const authInfo = await supabase.auth.getSession();
  const session = authInfo.data.session;
  const userId = session?.user.id;

  return (
    <>
      <Flex justify="flex-start" align="flex-start" gap="0" w="100%" h="100%">
        <div className="chat-list">
          <div className="title">Message</div>
          <UnstyledButton>username</UnstyledButton>
          <UnstyledButton>username</UnstyledButton>
        </div>

        <div className="chat-room">
          <div className="chat-header">
            <div className="chat-name">bee</div>
          </div>

          <div className="chat-message">
            <div>
              <PostsComponent currId = {userId}/>
            </div>
          </div>

          <InsertComponent currId = {userId}/>
        </div>
      </Flex>
    </>
  );
};

export default ChatPage;
