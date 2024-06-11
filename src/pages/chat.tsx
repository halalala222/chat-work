import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import SideBar from "@/components/sideBar"

import { useState } from "react"
import ChatList from "@/components/chatList";
import ChatListTopBar from "@/components/chatListTopBar";
import { useChatStore } from "@/store";

const ChatPage = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { currentChat } = useChatStore();
    
    return (
        <div className="flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-24 gap-4">
            <div className="flex justify-between max-w-5xl w-full items-center">
                <div className="text-4xl font-bold text-gradient">lets chat</div>
            </div>
            <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
                <ResizablePanelGroup direction="horizontal" className="">
                    <ResizablePanel
                        defaultSize={320}
                        collapsedSize={7}
                        collapsible={true}
                        minSize={30}
                        maxSize={30}
                        onCollapse={() => {
                            setIsCollapsed(true);
                        }}
                        onExpand={() => {
                            setIsCollapsed(false);
                        }}
                    >
                        <SideBar isCollapsed={isCollapsed} />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel
                        defaultSize={480}
                        minSize={30}
                    >
                        {
                            currentChat ? (
                                <>
                                    <ChatListTopBar />
                                    <div>
                                        <ChatList />
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full text-2xl text-gray-400">
                                    <div
                                        className="text-5xl"
                                    >
                                        {String.fromCodePoint(parseInt('1F975', 16))}
                                    </div>
                                    Select a chat to start messaging
                                </div>
                            )
                        }
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>

        </div >

    )
}

export default ChatPage