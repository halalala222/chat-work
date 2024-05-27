import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import SideBar from "@/components/sideBar"

import { useState } from "react"
import ChatList from "@/components/chatList";



const ChatPage = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
            <div className="flex justify-between max-w-5xl w-full items-center">
                <div className="text-4xl font-bold text-gradient">let-chat</div>
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
                        <div>
                            <ChatList />
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>

        </div >

    )
}

export default ChatPage