import { IInviteMessage, useInviteMessageStore } from "@/store"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import InviteMessageCard from "@/components/inviteMessageCard";
import UnAcceptedInviteMessageCard from "@/components/unAcceptedInviteMessageCard";
import AcceptedInviteMessageCard from "@/components/acceptedInviteMessageCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InviteMessageListDialogContent = () => {
    const { inviteMessageList } = useInviteMessageStore();
    const [selectedMessage, setSelectedMessage] = useState<IInviteMessage | null>(null);

    const handleClickToSelectMessage = (message: IInviteMessage) => {
        setSelectedMessage(message);
    }
    const handleResetSelectedMessage = () => {
        setSelectedMessage(null);
    }

    const transition = { duration: 0.5, ease: "easeInOut" };


    return (
        <DialogContent>
            <AnimatePresence>
                <motion.div
                    key={selectedMessage ? "selectedMessage" : "messageList"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={transition}
                    style={{ overflow: "hidden" }}
                >
                    {
                        !selectedMessage ? (
                            <>
                                <DialogHeader>
                                    <DialogTitle>
                                        Invite Message
                                    </DialogTitle>
                                    <DialogDescription>
                                        You have {inviteMessageList.length} invite messages
                                    </DialogDescription>
                                </DialogHeader>
                                <ScrollArea key="scrollarea" className="flex flex-col space-y-3 h-[500px] mt-3">
                                    {
                                        inviteMessageList.map((inviteMessage, index) => {
                                            return (
                                                <div key={inviteMessage.from.userID} className="py-2">
                                                    <InviteMessageCard message={inviteMessage} handleSelect={handleClickToSelectMessage} />
                                                    {
                                                        index < inviteMessageList.length - 1 && <hr className="w-full mt-2" />
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </ScrollArea>
                            </>
                        ) : (
                            selectedMessage.isRead === false ? (
                                <UnAcceptedInviteMessageCard inviteMessage={selectedMessage} reset={handleResetSelectedMessage} />
                            ) : (
                                <AcceptedInviteMessageCard inviteMessage={selectedMessage} reset={handleResetSelectedMessage} />
                            )
                        )
                    }
                </motion.div>
            </AnimatePresence>
        </DialogContent>
    );
}

export default InviteMessageListDialogContent;