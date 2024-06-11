import { useInviteMessageStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger, Dialog } from "@/components/ui/dialog";
import InviteMessageAccepting from "./inviteMessageAccepting";
import { getUserProfile, handleInvitedMessage } from "@/api/chat";
import { useEffect } from "react";

const UnAcceptedInviteMessageCard = ({ selectUserID }: { selectUserID: string }) => {
    const { inviteMessageList, setInviteMessageList, selectedMessage, setSelectedMessage } = useInviteMessageStore();

    const getSenderProfile = async (userId: string) => {
        const res = await getUserProfile(userId);
        const newInviteMessageList = inviteMessageList.map((inviteMessage) => {
            if (inviteMessage.from.userID === userId) {
                return {
                    ...inviteMessage,
                    from: {
                        ...inviteMessage.from,
                        signature: res.description,
                        sex: parseInt(res.gender)
                    }
                }
            }
            return inviteMessage;
        });

        if (!selectedMessage?.from) {
            return;
        }

        const newSelectedMessage = {
            ...selectedMessage,
            from: {
                ...selectedMessage.from,
                signature: res.description,
                sex: parseInt(res.gender),
            }
        }

        setInviteMessageList(newInviteMessageList);
        setSelectedMessage(newSelectedMessage);
    };

    useEffect(() => {
        getSenderProfile(selectUserID);
    }, [selectUserID]);

    const getSexColor = () => {
        switch (selectedMessage?.from.sex) {
            case 0:
                return "bg-sky-500"
            case 1:
                return "bg-pink-500"
            default:
                return "bg-gray-500"
        }
    }

    const handleRejectInviteMessage = () => {
        const newInviteMessageList = inviteMessageList.filter((message) => message.from.userID !== selectedMessage?.from.userID);
        console.log(newInviteMessageList);
        setSelectedMessage(null);
        setInviteMessageList(newInviteMessageList);

        handleInvitedMessage({
            SenderId: parseInt(selectUserID),
            CategoryId: -1,
            Status: 2,
        });
    }

    return (
        <div>
            <button onClick={
                () => {setSelectedMessage(null)}
            } className="hover:text-black text-gray-700 absolute top-3 left-2 p-2">
                <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="p-4 space-y-6">
                <div className="flex items-center space-x-4 h-16">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={selectedMessage?.from.avatar} />
                        <AvatarFallback>{selectedMessage?.from.userName}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center space-x-2 self-start">
                        <div className="text-2xl font-bold">
                            {selectedMessage?.from.userName}
                        </div>
                        <div className={"rounded-sm w-6 " + getSexColor()}>
                            <UserRound className="text-white" />
                        </div>
                    </div>
                </div>
                <div className="text-slate-400">
                    {selectedMessage?.from.userName}:{selectedMessage?.invaiteMessage}
                </div>
                <hr />
                <div className="flex justify-end space-x-4">
                    <Button
                        variant="destructive"
                        onClick={handleRejectInviteMessage}
                    >
                        Reject
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                            >Accept</Button>
                        </DialogTrigger>
                        <InviteMessageAccepting selectUserID={selectUserID} />
                    </Dialog>
                </div>
            </div>
        </div>

    )
};

export default UnAcceptedInviteMessageCard;