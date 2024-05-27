import quesiton from "@/assets/question.svg";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlignJustify, UserRoundCog, UserRoundPlus, UsersRound, LogOut, Mail, BookUser } from 'lucide-react';
import { useUserStore, useInviteMessageStore } from '@/store'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import MenuOption from "@/components/menuOption";
import EditProfileDialogContent from "@/components/editProfileDialogContent";
import AddNewFriendDialogContent from "@/components/addNewFriendDialogContent";
import NewGroupDialogContent from "@/components/newGroupDialogContent";
import LogOutDialogContent from "@/components/logoutDialogContent";
import InviteMessageListDialogContent from "@/components/inviteMessageListDialogContent";
import { useEffect } from "react";
import CategoryDialogContent from "./categoryDialogContent";

const mockInviteMessageList = [
    {
        from: {
            userName: 'lioooo1',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
            userID: '1',
            sex: 0,
        },
        time: '16:11AM',
        invaiteType: 0,
        invaiteMessage: 'hi this is lioooo1,welcome to my chat room',
        isRead: false,
    },
    {
        from: {
            userName: 'lioooo2',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
            userID: '2',
            sex: 1,
            signature: 'hello world',
        },
        time: '16:12AM',
        invaiteType: 1,
        invaiteMessage: 'hi this is lioooo2,welcome to my chat room',
        isRead: true,
    },
    {
        from: {
            userName: 'lioooo3',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
            userID: '3',
            sex: 2,
        },
        isRead: false,
        time: '16:13AM',
        invaiteType: 0,
        invaiteMessage: 'hi this is lioooo3,welcome to my chat room',
    },
    {
        from: {
            userName: 'lioooo4',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
            userID: '4',
            sex: 0,
            signature: 'hello world',
        },
        time: '16:14AM',
        invaiteType: 1,
        invaiteMessage: 'hi this is lioooo4,welcome to my chat room',
        isRead: true,
    },
    {
        from: {
            userName: 'lioooo5',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
            userID: '5',
            sex: 1,
        },
        time: '16:15AM',
        invaiteType: 0,
        isRead: false,
        invaiteMessage: 'hi this is lioooo5,welcome to my chat room',
    },
    {
        from: {
            userName: 'lioooo6',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
            userID: '6',
            sex: 2,
            signature: 'hello world',
        },
        time: '16:16AM',
        invaiteType: 1,
        invaiteMessage: 'hi this is lioooo6,welcome to my chat room',
        isRead: true,
    },
    {
        from: {
            userName: 'lioooo7',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
            userID: '7',
            sex: 0,
        },
        time: '16:17AM',
        invaiteType: 0,
        invaiteMessage: 'hi this is lioooo7,welcome to my chat room',
        isRead: false,
    },
    {
        from: {
            userName: 'lioooo8',
            avatar: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
            userID: '8',
            sex: 1,
            signature: 'hello world',
        },
        time: '16:18AM',
        invaiteType: 1,
        invaiteMessage: 'hi this is lioooo8,welcome to my chat room',
        isRead: true,
    }
]

const SideBarTopBar = () => {
    const { user } = useUserStore();
    const { inviteMessageList, setInviteMessageList } = useInviteMessageStore();

    useEffect(() => {
        setInviteMessageList(mockInviteMessageList);
    }, [setInviteMessageList]);

    const unReadInviteMessageCount = inviteMessageList.filter((message) => !message.isRead).length;

    return (
        <div className='flex items-center w-100vw h-[50px] justify-start px-[10px]'>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <div className="pr-2">
                        <AlignJustify width="36px" height="36px" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <div className="flex items-center space-x-2">
                            <Avatar className="w-[40px] h-[40px]">
                                <AvatarImage src={user.avatar} alt="@shadcn" />
                                <AvatarFallback>{user.name}</AvatarFallback>
                            </Avatar>
                            <p className="text-lg">{user.name}</p>
                        </div>
                    </DropdownMenuLabel>
                    <div className="flex flex-col space-y">
                        <Dialog>
                            <DialogTrigger>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <MenuOption text="Profile" icon={<UserRoundCog />} />
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <EditProfileDialogContent />
                        </Dialog>
                        <Dialog>
                            <DialogTrigger>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <MenuOption text="Add user" icon={<UserRoundPlus />} />
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <AddNewFriendDialogContent />
                        </Dialog>
                        <Dialog>
                            <DialogTrigger>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <MenuOption text="New group" icon={<UsersRound />} />
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <NewGroupDialogContent />
                        </Dialog>
                        <Dialog>
                            <DialogTrigger>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <MenuOption text="Category" icon={<BookUser />} />
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <CategoryDialogContent />
                        </Dialog>
                        <Dialog>
                            <DialogTrigger>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <MenuOption text="Message" icon={<Mail />} />
                                    {
                                        unReadInviteMessageCount > 0 && (
                                            <div className="w-[20px] h-[20px] bg-red-500 rounded-full flex justify-center items-center">
                                                <p className="text-white text-xs">{unReadInviteMessageCount}</p>
                                            </div>
                                        )
                                    }
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <InviteMessageListDialogContent />
                        </Dialog>
                        <Dialog>
                            <DialogTrigger>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <MenuOption text="Logout" icon={<LogOut />} />
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <LogOutDialogContent />
                        </Dialog>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="w-full h-[35px] flex items-center space-x-1  rounded-full border-2 border-slate-200 p-[10px]">
                <img src={quesiton} alt="search" className="w-[20px] h-[20px]" />
                <p className="text-sm text-slate-400">Search</p>
            </div>
        </div >
    );
}

export default SideBarTopBar;