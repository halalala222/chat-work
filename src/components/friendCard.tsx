import { IFriend } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FrindCard = ({ friend }: { friend: IFriend }) => {
    return (
        <div
            key={friend.friendId}
            className="flex items-center space-x-2">
            <Avatar className="w-[40px] h-[40px]">
                <AvatarImage src={friend.friendAvatar} alt={friend.friendName} />
                <AvatarFallback>{friend.friendName}</AvatarFallback>
            </Avatar>
            <div>
                {friend.friendName}
            </div>
        </div>
    )
}

export default FrindCard;