import ChatBottombar from "@/components/chatBottomBar"
import { IMessage } from "@/store"

const ChatList = () => {
    const handleSendMessage = (newMessage: IMessage) => {
        console.log(newMessage);
    }

    return (
        <ChatBottombar sendMessage={handleSendMessage} isMobile={false} />
    )
}

export default ChatList;