import { useChatStore } from "@/store"
import { AvatarImage, Avatar } from "./ui/avatar";

const NewMessageToast = ({ messageContent, chatListId, sendTime }: { messageContent: string, chatListId: number, sendTime: string }) => {
    const { chatList } = useChatStore();
    const chat = chatList.find((chat) => chat.chat.chatListId === chatListId);
    const parseTime = (time: string) => {
        const date = new Date(time);
        const now = new Date();
        if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) {
            return `${date.getHours()}:${date.getMinutes()}`
        } else {
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        }
    }

    return (
        <div className="flex gap-4 items-center max-w-44">
            <Avatar
                className="w-16 h-16"
            >
                <AvatarImage
                    src={chat?.chat.chatAvatar}
                >
                </AvatarImage>
            </Avatar>
            <div className="flex flex-col">
                <div className="flex items-center gap-2 justify-between">
                    <div
                        className="text-lg font-bold text-black line-clamp-1"
                    >
                        {chat?.chat.chatName}
                    </div>
                    <div className="flex items-center gap-2">

                        <div className="text-sm text-gray-400">{
                            parseTime(sendTime)
                        }</div>
                    </div>
                </div>
                <div
                    className="max-w-40 text-lg text-black line-clamp-1"
                >
                    {messageContent}
                </div>
            </div>
        </div>
    )
}

export default NewMessageToast;