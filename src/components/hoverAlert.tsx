import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { CircleAlert } from "lucide-react";

const HovertAlert = ({ alertContent }: { alertContent: string }) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <CircleAlert className="w-3 h-3 text-red-500" />
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="p-2 text-sm rounded-md">
                    {alertContent}
                </div>
            </HoverCardContent>
        </HoverCard>
    )
};

export default HovertAlert;