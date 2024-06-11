import ChatBottombar from "@/components/chatBottomBar"
import { IChat, IMessage, useChatStore, useUserStore } from "@/store"
import FileMessageCard from "@/components/fileMessageCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import VideoMessageCard from "@/components/videoMessageCard";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { COMMON_CONFIG } from "@/config";
import NewMessageToast from "./newMessageToast";
import { ToastAction } from "./ui/toast";
import { cacheGet } from "@/lib/localstorage";

const ChatList = () => {
    const { chatList, setChatList, currentChat, setCurrentChat, currentMessageList, setCurrentMessageList } = useChatStore();
    const { toast } = useToast();
    const { user } = useUserStore();

    const getWSURL = () => {
        const token = cacheGet(COMMON_CONFIG.TOKENCACHEKEY);
        return `${COMMON_CONFIG.WSURL}?token=${token}`;
    }

    const { sendMessage, lastMessage, readyState } = useWebSocket(getWSURL(), {
        reconnectAttempts: 10,
        reconnectInterval: 3000,
    });



    const handleSendMessage = useCallback((message: IMessage) => {
        sendMessage(JSON.stringify(message));
        // addMessage(message, false);
    }, [sendMessage]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    useEffect(() => {
        console.log('connectionStatus', connectionStatus);
    });

    useEffect(() => {
        if (!lastMessage?.data) return;
        const result = lastMessage?.data;
        const data = JSON.parse(result);
        const newMessage = {
            id: data.id,
            chatListId: data.chatListId,
            messageContent: data.messageContent,
            sendTime: data.sendTime,
            userId: data.userId,
            userAvatar: data.userAvatar,
            messageType: 0,
            userName: data.userName,
            readStatus: 1,
        };

        if (data.chatListId !== currentChat?.chatListId) {
            toast({
                description: <NewMessageToast
                    messageContent={data.messageContent}
                    chatListId={data.chatListId}
                    sendTime={data.sendTime}
                />,
                duration: 5000,
                action: <ToastAction
                    onClick={() => { handleClickNewMessageToast(data.chatListId) }}
                    altText={"Turn to"}>Turn To</ToastAction>
            });
        }
        addMessage(newMessage, data.chatListId !== currentChat?.chatListId);
    }, [lastMessage]);




    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [currentMessageList]);

    const addMessage = (newMessage: IMessage, hasNewMessage: boolean) => {
        const newChatList = chatList.map((chat) => {
            if (chat.chat.chatListId === newMessage.chatListId) {
                const newCurrentMessageList = [...chat.messageList, newMessage];
                saveCurrentMessageListToLocalStorage(newCurrentMessageList, chat.chat);
                return {
                    chat: {
                        ...chat.chat,
                        lastMessageContent: newMessage.messageContent,
                        lastSendTime: newMessage.sendTime,
                        hasNewMessage: hasNewMessage,
                    },
                    messageList: newCurrentMessageList,
                }
            }
            return chat;
        });

        if (currentChat?.chatListId === newMessage.chatListId) {
            const newCurrentChat = newChatList.find((chat) => chat.chat.chatListId === newMessage.chatListId)?.chat;
            if (!newCurrentChat) return;
            const newCurrentMessageList = newChatList.find((chat) => chat.chat.chatListId === newMessage.chatListId)?.messageList;
            if (!newCurrentMessageList) return;
            setCurrentChat(newCurrentChat);
            setCurrentMessageList(newCurrentMessageList);
        }

        setChatList(newChatList);

    }
    const getChatListCacheKey = (chatListId: number) => {
        return `${COMMON_CONFIG.CHATLISTCACHEKEY}_${chatListId}`
    }

    const saveCurrentMessageListToLocalStorage = (messageList: IMessage[], chat: IChat) => {
        const chatListCacheKey = getChatListCacheKey(chat.chatListId);
        console.log('saveCurrentMessageListToLocalStorage', messageList);
        localStorage.setItem(chatListCacheKey, JSON.stringify(messageList));
    }

    const handleClickNewMessageToast = (chatListId: number) => {
        const chat = chatList.find((chat) => chat.chat.chatListId === chatListId);
        if (!chat) return;

        setCurrentChat(chat.chat);
        setCurrentMessageList(chat.messageList);
    }


    return (
        <div className="p-1 w-full  h-full flex flex-col"
        >
            <AnimatePresence>
                <ScrollArea
                    className="h-96"
                >
                    {
                        currentMessageList?.map((message, index) => (
                            <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                                exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                                transition={{
                                    opacity: { duration: 0.1 },
                                    layout: {
                                        type: "spring",
                                        bounce: 0.3,
                                        duration: currentMessageList.indexOf(message) * 0.05 + 0.2,
                                    },
                                }}
                                style={{
                                    originX: 0.5,
                                    originY: 0.5,
                                }}
                                className={cn(
                                    "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                                    message.userId === user.id ? "items-end" : "items-start"
                                )}
                            >
                                <div className="flex gap-3 items-center">
                                    {message.userId !== user.id && (
                                        <Avatar
                                            className="flex justify-center items-center"
                                        >
                                            <AvatarImage
                                                src={message.userAvatar}
                                                alt={message.userName}
                                            />
                                            <AvatarFallback>{message.userName}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    {
                                        message.messageContent.startsWith('https://chat-ncu.oss-cn-nanjing.aliyuncs.com') ? (
                                            <FileMessageCard
                                                message={message}
                                                isOther={message.userId === user.id}
                                            />
                                        ) : (
                                            <VideoMessageCard message={message.messageContent} />
                                        )
                                    }
                                    {message.userId === user.id && (
                                        <Avatar className="flex justify-center items-center">
                                            <AvatarImage
                                                src={message.userAvatar}
                                                alt={message.userName}
                                                width={6}
                                                height={6}
                                            />
                                            <AvatarFallback>{message.userName}</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    }
                    <div ref={messagesEndRef} />
                </ScrollArea>
            </AnimatePresence>
            <ChatBottombar sendMessage={handleSendMessage} />
        </div>
    )
}

export default ChatList;