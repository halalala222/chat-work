import ChatTopBar from "@/components/sideBarTopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { useChatStore } from "@/store";
import { useEffect } from "react";
import { IChat } from "@/store";
import { AnimatePresence, motion } from "framer-motion";

const mockGetChatList = (): IChat[] => {
    return [
        {
            userID: '1',
            userName: 'lioooo1',
            latestMessage: 'hi this is lioooo1,welcome to my chat room',
            latestMessageTime: '16:11AM',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
        },
        {
            userID: '2',
            userName: 'lioooo2',
            latestMessage: 'hi this is lioooo2,welcome to my chat room',
            latestMessageTime: '16:12AM',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
        },
        {
            userID: '3',
            userName: 'lioooo3',
            latestMessage: 'hi this is lioooo3,welcome to my chat room',
            latestMessageTime: '16:13AM',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
        },
        {
            userID: '4',
            userName: 'lioooo4',
            latestMessage: 'hi this is lioooo4,welcome to my chat room',
            latestMessageTime: '16:14AM',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
        },
        {
            userID: '5',
            userName: 'lioooo5',
            latestMessage: 'hi this is lioooo5,welcome to my chat room',
            latestMessageTime: '16:15AM',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
        },
        {
            userID: '6',
            userName: 'lioooo6',
            latestMessage: 'hi this is lioooo6,welcome to my chat room',
            latestMessageTime: '16:16AM',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
        },
        {
            userID: '7',
            userName: 'lioooo7',
            latestMessage: 'hi this is lioooo7,welcome to my chat room',
            latestMessageTime: '16:17AM',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
        },
        {
            userID: '8',
            userName: 'lioooo8',
            latestMessage: 'hi this is lioooo8,welcome to my chat room',
            latestMessageTime: '16:18AM',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
        },
        {
            userID: '9',
            userName: 'lioooo9',
            latestMessage: 'hi this is lioooo9,welcome to my chat room',
            latestMessageTime: '16:19AM',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
        },
        {
            userID: '10',
            userName: 'lioooo10',
            latestMessage: 'hi this is lioooo10,welcome to my chat room',
            latestMessageTime: '16:20AM',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
        },
        {
            userID: '11',
            userName: 'lioooo11',
            latestMessage: 'hi this is lioooo11,welcome to my chat room',
            latestMessageTime: '16:21AM',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
        },
        {
            userID: '12',
            userName: 'lioooo12',
            latestMessage: 'hi this is lioooo12,welcome to my chat room',
            latestMessageTime: '16:22AM',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
        },
        {
            userID: '13',
            userName: 'lioooo13',
            latestMessage: 'hi this is lioooo13,welcome to my chat room',
            latestMessageTime: '16:23AM',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
        },
    ]
}

const SideBar = ({ isCollapsed, }: { isCollapsed: boolean }) => {
    const { chatList, setChatList, currentChat, setCurrentChat } = useChatStore();
    const handleChange = (userID: string) => {
        const chat = chatList.find((chat) => chat.userID === userID);
        if (chat) {
            setCurrentChat(chat);
        }
    };

    useEffect(() => {
        setChatList(mockGetChatList());
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
                            key={chat.userID}
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={sidebarVariants}
                            transition={{ duration: 0.5 }}
                            onClick={() => handleChange(chat.userID)}
                            className={"max-w-80 flex items-center p-2 hover:bg-gray-100 space-x-0 h-16" + (currentChat?.userID === chat.userID ? " bg-gray-200" : "")}
                        >
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={chat.avatar} alt="@shadcn" />
                                <AvatarFallback>userName</AvatarFallback>
                            </Avatar>
                            <motion.div
                                variants={contentVariants}
                                animate={isCollapsed ? "collapsed" : "open"}
                                className="flex flex-col w-full pl-3"
                                onClick={() => handleChatListClick(chat)}
                            >
                                <div className="flex flex-col max-w-52">
                                    <div className="flex justify-between">
                                        <div className="text-base font-semibold">
                                            {chat.userName}
                                        </div>
                                        <div className="text-xs text-gray-500 whitespace-nowrap self-end">
                                            {chat.latestMessageTime}
                                        </div>
                                    </div>
                                    <div className="max-w-48 text-sm text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap">
                                        {chat.latestMessage}
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