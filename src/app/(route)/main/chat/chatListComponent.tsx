"use client";
import { UnstyledButton } from "@mantine/core";
import { useChatSwitchContext } from "../_contexts/chatSwitchProvider";

const ChatListComponent = ({
  roomData,
  roomUsersData,
}: {
  roomData: any;
  roomUsersData: any;
}) => {
  const chatSwitch = useChatSwitchContext();

  const chatRoomHandler = (chatRoom: string, roomName: string | null) => {
    chatSwitch.action({ roomId: chatRoom, roomName: roomName });
  };

  // roomList = [c69f52e2-1be3-4d00-8524-ce818db72ba3, {username: ['test', 'bee'], roomname: undefined}]
  const roomList: any = new Map();
  roomUsersData.map((user: any) => {
    if (roomList.has(user.chat_room)) {
      roomList.get(user.chat_room).username.push(user.user_info.username);
    } else {
      roomList.set(user.chat_room, {
        username: [user.user_info.username],
        roomname: user.chat_rooms.username,
      });
    }
  });
  const roomListArr = [...roomList];

  if (!roomUsersData) return;
  return (
    <>
      {roomListArr.map((room: any, index: number) => {
        let username = "";

        for (let i = 0; i < 4; i++) {
          if (room[1].username[i] === undefined) username += "";
          else {
            if (i > 0) username += `, ${room[1].username[i]}`;
            else username += `${room[1].username[i]}`;
          }
        }

        return (
          <UnstyledButton
            key={index}
            onClick={() => chatRoomHandler(room[0], username)}
          >
            {username}
          </UnstyledButton>
        );
      })}

      {/* {chatRooms.map((data: any, index: number) => {
        const roomId = data.chat_room;
        const friend = { id: null, username: null };

        for (let val of roomUsers) {
          if (roomId === val.chat_room) {
            if (val.user_id !== userId) {
              friend.id = val.user_id;
            }
          }
        }

        for (let val of users) {
          if (friend.id === val.id) {
            friend.username = val.username;
          }
        }

        return (
          <UnstyledButton
            key={index}
            onClick={() => chatRoomHandler(roomId, friend.username)}
          >
            {friend.username}
          </UnstyledButton>
        );
      })} */}
    </>
  );
};

export default ChatListComponent;
