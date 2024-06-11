import ChatTopBar from "@/components/sideBarTopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { IMessage, useChatStore } from "@/store";
import { useEffect } from "react";
import { IChat } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import { getNewChatMessageList, getUserChatList } from "@/api/chat";
import { COMMON_CONFIG } from "@/config";


const SideBar = ({ isCollapsed, }: { isCollapsed: boolean }) => {
    const { chatList, setChatList, currentChat, setCurrentChat, setCurrentMessageList } = useChatStore();
    const handleChange = (chatListId: number) => {
        const chat = chatList.find((chat) => chat.chat.chatListId === chatListId);
        if (chat) {
            const newChatList = chatList.map((chat) => {
                if (chat.chat.chatListId === chatListId) {
                    return {
                        ...chat,
                        chat: {
                            ...chat.chat,
                            hasNewMessage: false,
                        }
                    }
                }
                return chat;
            });
            const newChat = {
                ...chat.chat,
                hasNewMessage: false,
            }
            setChatList(newChatList);
            setCurrentChat(newChat);
            setCurrentMessageList(chat.messageList);
        }
    };

    const padZero = (num: number): string => num.toString().padStart(2, '0');

    // input 1986-01-07 01:02:00
    // if today return 01:02
    // else return 86/01/07
    const parseLastTime = (time: string) => {
        const date = new Date(time);
        const now = new Date();
        if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) {
            return `${padZero(date.getHours())}:${padZero(date.getMinutes())}`
        } else {
            return `${date.getFullYear().toString().slice(2)}/${date.getMonth() + 1}/${date.getDate()}`
        }
    }

    const getChatListCacheKey = (chatListId: number) => {
        return `${COMMON_CONFIG.CHATLISTCACHEKEY}_${chatListId}`
    }

    const getCurrentChatListMessageFromLocalStorage = (chatListId: number) => {
        const chatListCacheKey = getChatListCacheKey(chatListId);
        const chatListCache = localStorage.getItem(chatListCacheKey);
        if (chatListCache) {
            return JSON.parse(chatListCache) as IMessage[]
        }
        return [];
    }

    const getUserNewMessageList = async (chatListId: number, oldMessageId: number) => {
        const res = await getNewChatMessageList({
            chatListId: chatListId,
            oldMessageId: oldMessageId,
        });
        return res;
    }


    const fetchChatList = async () => {
        try {
            const res = await getUserChatList();
            if (!res) return;
            const chatListPromises = res.map(async (chat) => {
                const localMessageList = getCurrentChatListMessageFromLocalStorage(chat.chatListId);
                const oldMessageId = localMessageList.length > 0 ? localMessageList[localMessageList.length - 1].id : 0;
                const newMessageList = await getUserNewMessageList(chat.chatListId, oldMessageId);
                const messageList = [...localMessageList, ...newMessageList];
                localStorage.setItem(getChatListCacheKey(chat.chatListId), JSON.stringify(messageList));
                return {
                    chat: {
                        chatListId: chat.chatListId,
                        chatName: chat.chatName,
                        chatAvatar: chat.chatAvatar,
                        lastMessageType: chat.lastMessageType,
                        lastMessageContent: chat.lastMessageContent,
                        readStatus: chat.readStatus,
                        lastSendTime: chat.lastSendTime,
                        hasNewMessage: newMessageList.length > 0,
                    },
                    messageList,
                };
            });

            const chatList = await Promise.all(chatListPromises);
            console.log('chatList:', chatList);
            setChatList(chatList);
        } catch (error) {
            console.error('Error fetching chat list:', error);
        }
    }

    useEffect(() => {
        fetchChatList();
    }, []);


    const sidebarVariants = {
        open: {
            width: "100%",
            transition: { duration: 0.5 }
        },
        collapsed: {
            width: "100%",
            transition: { duration: 0.5 }
        }
    };


    const contentVariants = {
        open: {
            opacity: 1,
            x: 0,
            display: "block",
            transition: { duration: 0.5 }
        },
        collapsed: {
            opacity: 0,
            x: -20,
            transition: { duration: 0.5 },
            transitionEnd: { display: "none" }
        }
    };

    const handleChatListClick = (clickChat: IChat) => {
        setCurrentChat(clickChat);
    }

    return (
        <AnimatePresence>
            <motion.div
                initial="collapsed"
                animate={isCollapsed ? "collapsed" : "open"}
                exit="collapsed"
                variants={sidebarVariants}
                className="h-full"
            >
                {!isCollapsed && <ChatTopBar />}
                <ScrollArea className="h-[91%] rounded-md border">
                    {chatList.map((chat) => (
                        <motion.div
                            key={chat.chat.chatListId}
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={sidebarVariants}
                            transition={{ duration: 0.5 }}
                            onClick={() => handleChange(chat.chat.chatListId)}
                            className={"max-w-80 flex items-center p-2 hover:bg-gray-100 space-x-0 h-16" + (currentChat?.chatListId === chat.chat.chatListId ? " bg-gray-200" : "")}
                        >
                            <div className="relative">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={chat.chat.chatAvatar} alt="@shadcn" />
                                    <AvatarFallback>userName</AvatarFallback>
                                </Avatar>
                                {
                                    chat.chat.hasNewMessage && <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                                }
                            </div>
                            <motion.div
                                variants={contentVariants}
                                animate={isCollapsed ? "collapsed" : "open"}
                                className="flex flex-col w-full pl-3"
                                onClick={() => handleChatListClick(chat.chat)}
                            >
                                <div className="flex max-w-56">
                                    <div className="flex w-44 flex-col justify-between">
                                        <div className="text-base font-semibold">
                                            {chat.chat.chatName}
                                        </div>
                                        <div className="text-xs text-gray-500 line-clamp-1">
                                            {chat.chat.lastMessageContent}
                                        </div>
                                    </div>
                                    <div className="max-w-52 text-sm text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap">
                                        {
                                            parseLastTime(chat.chat.lastSendTime)
                                        }
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                    <div className="h-3 flex items-center justify-center text-lg">
                    </div>
                </ScrollArea>
            </motion.div>
        </AnimatePresence>
    );
}


export default SideBar;