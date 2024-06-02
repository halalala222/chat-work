import { IInviteMessage } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AcceptedInviteMessageCard = ({ inviteMessage, reset }: { inviteMessage: IInviteMessage, reset: () => void }) => {
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
                <div className="flex items-center space-x-4 h-20">
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
                <hr />
                <div className="text-slate-400 space-x-4">
                    <span className="text-black text-lg">signature</span>
                    <span className="text-slate-400 text-lg">
                        {inviteMessage.from.signature}
                    </span>
                </div>
                <hr />
                <div className="flex justify-center space-x-4">
                    <Button variant="ghost" className="h-20">
                        <div className="flex flex-col items-center space-y-2">
                            <MessageCircle className="w-8 h-8" />
                            <span>Message</span>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AcceptedInviteMessageCard;
