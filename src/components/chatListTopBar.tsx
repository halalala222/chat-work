import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Info, Phone, Video } from 'lucide-react';
import { useChatStore } from '@/store';

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];


const ChatTopbar = () => {
    const { currentChat } = useChatStore();

    return (
        <div className="w-full h-14 flex py-2 px-4 justify-between items-center border-b">
            <div className="flex flex-col">
                <span className="text-lg">{currentChat?.userName}</span>
            </div>
        </div>
    )
}

export default ChatTopbar;
