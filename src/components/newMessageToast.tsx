import { useChatStore } from "@/store"

const NewMessageToast = ({ messageContent, chatListId, sendTime }: { messageContent: string, chatListId: number, sendTime: string }) => {
    const { chatList } = useChatStore();
    const chat = chatList.find((chat) => chat.chat.chatListId === chatListId);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-white shadow-lg rounded-lg p-4">
                <div className="flex items-center gap-2">
                    <div className="text-lg font-bold text-black">{chat?.chat.chatName}</div>
                    <div className="text-sm text-gray-400">{sendTime}</div>
                </div>
                <div className="text-lg text-black">{messageContent}</div>
            </div>
        </div>
    )
}

export default NewMessageToast;