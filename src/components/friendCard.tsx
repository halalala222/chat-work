import { IFriend } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FrindCard = ({ friend }: { friend: IFriend }) => {
    return (
        <div
            key={friend.userID}
            className="flex items-center space-x-2">
            <Avatar className="w-[40px] h-[40px]">
                <AvatarImage src={friend.avatar} alt={friend.userName} />
                <AvatarFallback>{friend.userName}</AvatarFallback>
            </Avatar>
            <div>
                {friend.userName}
            </div>
        </div>
    )
}

export default FrindCard;