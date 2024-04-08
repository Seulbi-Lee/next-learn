"use client";
import { useChatSwitchContext } from "../_contexts/chatSwitchProvider";

const ChatHeaderComponent = () => {
  const chatSwitch = useChatSwitchContext();

  return(
    <>
      <div className="chat-header">
        <div className="chat-name">{chatSwitch.store.roomName}</div>
      </div>
    </>
  )
}

export default ChatHeaderComponent;
