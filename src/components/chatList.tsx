import ChatBottombar from "@/components/chatBottomBar"
import { IMessage, useMessageStore, useUserStore } from "@/store"
import FileMessageCard from "@/components/fileMessageCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { ScrollArea } from "./ui/scroll-area";
import VideoMessageCard from "@/components/videoMessageCard";

const mockMessageList = (): IMessage[] => {
    return [
        {
            id: 1,
            avatar: '/User1.png',
            userName: 'Jane Doe',
            userID: 93,
            message: 'Hey, Jakob',
        },
        {
            id: 2,
            avatar: '/LoggedInUser.jpg',
            userName: 'Jakob Hoeg',
            userID: 94,
            message: 'Hey!',
        },
        {
            id: 3,
            avatar: '/User1.png',
            userName: 'Jane Doe',
            userID: 93,
            message: 'How are you?',
        },
        {
            id: 4,
            avatar: '/LoggedInUser.jpg',
            userName: 'Jakob Hoeg',
            userID: 94,
            message: 'I am good, you?',
        },
        {
            id: 5,
            avatar: '/User1.png',
            userName: 'Jane Doe',
            userID: 93,
            message: 'I am good too!',
        },
        {
            id: 6,
            avatar: '/LoggedInUser.jpg',
            userName: 'Jakob Hoeg',
            userID: 94,
            message: 'That is good to hear!'
        },
        {
            id: 7,
            avatar: '/User1.png',
            userName: 'Jane Doe',
            userID: 93,
            message: 'How has your day been so far?',
        },
        {
            id: 8,
            avatar: '/LoggedInUser.jpg',
            userName: 'Jakob Hoeg',
            userID: 94,
            message: 'It has been good. I went for a run this morning and then had a nice breakfast. How about you?',
        },
        {
            id: 9,
            avatar: '/User1.png',
            userName: 'Jane Doe',
            userID: 93,
            message: 'I had a relaxing day. Just catching up on some reading.',
        },
        {
            id: 10,
            avatar: '/LoggedInUser.jpg',
            userName: 'Jakob Hoeg',
            userID: 94,
            message: 'https://chat-ncu.oss-cn-nanjing.aliyuncs.com/93-1717243352692.jpeg'
        },
        {
            id: 11,
            avatar: '/User1.png',
            userName: 'Jane Doe',
            userID: 93,
            message: 'https://chat-ncu.oss-cn-nanjing.aliyuncs.com/93-1717244404054.vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        {
            id: 12,
            avatar: '/LoggedInUser.jpg',
            userName: 'Jakob Hoeg',
            userID: 94,
            message: 'https://www.xiaohongshu.com/explore/663adb5a000000001e032eb7',
        },
        {
            id: 13,
            avatar: '/User1.png',
            userName: 'Jane Doe',
            userID: 93,
            message: 'https://chat-ncu.oss-cn-nanjing.aliyuncs.com/93-1717244424790.pdf',
        },
        {
            id: 14,
            avatar: '/LoggedInUser.jpg',
            userName: 'Jakob Hoeg',
            userID: 94,
            message: 'https://www.bilibili.com/video/BV1UT421v7kY/?spm_id_from=333.1007.tianma.1-1-1.click&vd_source=44558531348eed7234113e6ac4d7a07c',
        },
        {
            id: 15,
            avatar: '/User1.png',
            userName: 'Jane Doe',
            userID: 93,
            message: 'https://www.douyin.com/video/6989392755775402509',
        },
        {
            id: 16,
            avatar: '/LoggedInUser.jpg',
            userName: 'Jakob Hoeg',
            userID: 94,
            message: '分享橘子海 (Orange Ocean)的单曲《Sona》: http://163cn.tv/rFJw82a (来自@网易云音乐)',
        }
    ]
}

const ChatList = () => {
    const { messageList, setMessageList } = useMessageStore();
    const { user } = useUserStore();
    const handleSendMessage = (newMessage: IMessage) => {
        console.log(newMessage);
    };
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messageList]);



    useEffect(() => {
        setMessageList(mockMessageList());
    }, []);

    return (
        <div className="px-2 py-6 w-full  h-full flex flex-col">
            <AnimatePresence>
                <ScrollArea
                    className="h-96"
                >
                    {messageList?.map((message, index) => (
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
                                    duration: messageList.indexOf(message) * 0.05 + 0.2,
                                },
                            }}
                            style={{
                                originX: 0.5,
                                originY: 0.5,
                            }}
                            className={cn(
                                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                                message.userID !== user.id ? "items-end" : "items-start"
                            )}
                        >
                            <div className="flex gap-3 items-center">
                                {message.userID === user.id && (
                                    <Avatar
                                        className="flex justify-center items-center"
                                    >
                                        <AvatarImage
                                            src={message.avatar}
                                            alt={message.userName}
                                        />
                                        <AvatarFallback>{message.userName}</AvatarFallback>
                                    </Avatar>
                                )}
                                {
                                    message.message.startsWith('https://chat-ncu.oss-cn-nanjing.aliyuncs.com') ? (
                                        <FileMessageCard
                                            message={message}
                                            isOther={message.userID === user.id}
                                        />
                                    ) : (
                                        <VideoMessageCard message={message.message} />
                                    )
                                }
                                {message.userID !== user.id && (
                                    <Avatar className="flex justify-center items-center">
                                        <AvatarImage
                                            src={message.avatar}
                                            alt={message.userName}
                                            width={6}
                                            height={6}
                                        />
                                        <AvatarFallback>{message.userName}</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </ScrollArea>
            </AnimatePresence>
            <ChatBottombar sendMessage={handleSendMessage} />
        </div>
    )
}

export default ChatList;