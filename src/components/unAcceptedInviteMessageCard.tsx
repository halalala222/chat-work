import { IInviteMessage } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger, Dialog } from "@/components/ui/dialog";
import InviteMessageAccepting from "./inviteMessageAccepting";

const UnAcceptedInviteMessageCard = ({ inviteMessage, reset }: { inviteMessage: IInviteMessage, reset: () => void }) => {
    const getSexColor = () => {
        switch (inviteMessage.from.sex) {
            case 0:
                return "bg-sky-500"
            case 1:
                return "bg-pink-500"
            default:
                return "bg-gray-500"
        }
    }

    return (
        <div>
            <button onClick={reset} className="hover:text-black text-gray-700 absolute top-3 left-2 p-2">
                <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="p-4 space-y-6">
                <div className="flex items-center space-x-4 h-16">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={inviteMessage.from.avatar} />
                        <AvatarFallback>{inviteMessage.from.userName}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center space-x-2 self-start">
                        <div className="text-2xl font-bold">
                            {inviteMessage.from.userName}
                        </div>
                        <div className={"rounded-sm w-6 " + getSexColor()}>
                            <UserRound className="text-white" />
                        </div>
                    </div>
                </div>
                <div className="text-slate-400">
                    {inviteMessage.from.userName}:{inviteMessage.invaiteMessage}
                </div>
                <hr />
                <div className="flex justify-end space-x-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Accept</Button>
                        </DialogTrigger>
                        <InviteMessageAccepting selectUserID={inviteMessage.from.userID} />
                    </Dialog>
                </div>
            </div>
        </div>

    )
};

export default UnAcceptedInviteMessageCard;