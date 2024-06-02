import { IInviteMessage } from "@/store";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import InviteMessageAccepting from "@/components/inviteMessageAccepting";

const InviteMessageCard = ({ message, handleSelect }: { message: IInviteMessage, handleSelect: (message: IInviteMessage) => void }) => {
    return (
        <div key={message.from.userID} className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 h-16" onClick={() => handleSelect(message)}>
                <Avatar className="w-16 h-16">
                    <AvatarImage src={message.from.avatar} />
                    <AvatarFallback>{message.from.userName}</AvatarFallback>
                </Avatar>
                <div className=" flex flex-col items-start">
                    <div className="text-xl">
                        {message.from.userName}
                    </div>
                    <div className="w-72 text-slate-400 text-nowrap truncate">
                        {message.invaiteMessage}
                    </div>
                </div>
            </div>
            {
                message.isRead ? (
                    <span className="text-gray-500">Accepted</span>
                ) : (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Accept</Button>
                        </DialogTrigger>
                        <InviteMessageAccepting selectUserID={message.from.userID} />
                    </Dialog>
                )
            }
        </div>

    );
};

export default InviteMessageCard;