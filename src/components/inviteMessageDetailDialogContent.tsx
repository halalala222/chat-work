import { IInviteMessage } from "@/store";
import { DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

const InviteMessageDetailDialogContent = ({ message }: { message: IInviteMessage }) => {
    const getSexColor = () => {
        switch (message.from.sex) {
            case 0:
                return "bg-sky-500"
            case 1:
                return "bg-pink-500"
            default:
                return "bg-gray-500"
        }
    }

    return (
        <DialogContent>
            <div className="w-full flex items-center space-x-2">
                <Avatar className="w-[70px] h-[70px]">
                    <AvatarImage src={message.from.avatar} />
                    <AvatarFallback>{message.from.userName}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center space-x-2 self-start">
                        <div className="text-2xl font-bold">{message.from.userName}</div>
                        <div className={"rounded-sm w-[24px] rounded-sm " + getSexColor()}>
                            <UserRound className="text-white" />
                        </div>
                    </div>
                    <div className="text-slate-400 text-sm">{message.from.signature}</div>
                </div>
            </div>
        </DialogContent>
    )
};

export default InviteMessageDetailDialogContent;