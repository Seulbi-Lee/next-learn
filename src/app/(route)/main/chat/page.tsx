import { createServer } from "@/app/_utils/_supabase/server";
import {
  Box,
  Button,
  ComboboxData,
  Flex,
  MultiSelect,
  UnstyledButton,
} from "@mantine/core";
import InsertComponent from "./insertComponent";
import PostComponent from "./postComponent";
import { Metadata } from "next";
import ChatListComponent from "./chatListComponent";
import ChatSwitchProvider from "../_contexts/chatSwitchProvider";
import ChatHeaderComponent from "./chatHeaderComponent";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "histagram · chat",
};

const ChatLayout = async () => {
  const supabase = createServer();
  const authInfo = await supabase.auth.getSession();
  const session = authInfo.data.session;
  const userId = session!.user.id;

  // 현재 유저를 제외한 나머지 유저
  const { data: usersData, error: usersError } = await supabase
    .from("user_info")
    .select()
    .neq("id", userId);
  const users: ComboboxData | any = (usersData || []).map((user) => {
    // 여기 ComboboxData만 쓰면 오류남.. 왜지
    return {
      value: user.id,
      label: user.username,
    };
  });
  if (usersError) {
    console.log(usersError);
    return;
  }

  // 현재 유저의 채팅방
  const { data: roomData, error: roomError } = await supabase
    .from("chat_room_users")
    .select("chat_room")
    .eq("user_id", userId);
  if (roomError) {
    console.log(roomError);
    return;
  }
  // console.log("roomData", roomData);

  // (현재 유저를 제외한) 유저가 속한 채팅방 이름과 유저들
  const { data: roomUsersData, error: roomUsersError } = await supabase
    .from("chat_room_users")
    .select("*, user_info(username), chat_rooms(room_name)")
    .in(
      "chat_room",
      roomData.map((roomId) => {
        return roomId.chat_room;
      })
    )
    .neq("user_id", userId);
  if (roomUsersError) {
    console.log(roomUsersError);
    return;
  }
  console.log("roomUsersData", roomUsersData);

  // 채팅방 만들기
  const createChatRoom = async (formData: FormData) => {
    "use server";

    const rawFormData = formData.get("userIds") as string;
    if (!rawFormData) return;

    const userIds = rawFormData.split(",");
    userIds.push(userId);

    const supabase = createServer();
    const { data: newRoomData } = await supabase
      .from("chat_rooms")
      .insert({})
      .select("id")
      .single();

    const { error: insertError } = await supabase
      .from("chat_room_users")
      .insert(
        userIds.map((userId) => {
          return { chat_room: newRoomData!.id, user_id: userId };
        })
      );
    if (insertError) {
      console.log(insertError);
      return;
    }

    redirect('/main/chat');
  };

  return (
    <>
      <ChatSwitchProvider>
        <Flex justify="flex-start" align="flex-start" gap="0" w="100%" h="100%">
          <div className="chat-list">
            <div className="title">Message</div>
            <Box m="sm">
              <form action={createChatRoom}>
                <MultiSelect
                  placeholder="add friend"
                  data={users}
                  name={"userIds"}
                />
                <Button mt="sm" type={"submit"}>
                  Create Chat
                </Button>
              </form>
            </Box>

            <ChatListComponent
              roomData={roomData}
              roomUsersData={roomUsersData}
            />
          </div>

          <div className="chat-room">
            <ChatHeaderComponent />

            <div className="chat-message">
              <div>
                <PostComponent currId={userId!} />
              </div>
            </div>

            <InsertComponent currId={userId!} />
          </div>
        </Flex>
      </ChatSwitchProvider>
    </>
  );
};

export default ChatLayout;
