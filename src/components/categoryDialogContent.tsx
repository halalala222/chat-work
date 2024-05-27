import { DialogContent } from "@/components/ui/dialog"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import CategoryDialogContentSideBar from "@/components/categoryDialogContentSideBar";
import CategoryDialogContentFriendList from "@/components/categoryDialogContentFriendList";

const CategoryDialogContent = () => {
    return (
        <DialogContent
            className="max-w-4xl w-full h-[500px] flex flex-col"
        >
            <ResizablePanelGroup direction="horizontal" className="">
                <ResizablePanel
                    defaultSize={380}
                    minSize={28}
                    maxSize={30}
                >
                    <CategoryDialogContentSideBar />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                    defaultSize={420}
                    minSize={30}
                >
                    <CategoryDialogContentFriendList />
                </ResizablePanel>
            </ResizablePanelGroup>
        </DialogContent>
    )
}

export default CategoryDialogContent;