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
import CategoryDialogContent from "./categoryDialogContent";

const SideBarTopBar = () => {
    const { user } = useUserStore();
    const { inviteMessageList } = useInviteMessageStore();

    const unReadInviteMessageCount = inviteMessageList.filter((message) => !message.isAccepted).length;

    return (
        <div className='flex items-center w-100vw h-12 justify-start px-2'>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <div className="pr-2">
                        <AlignJustify className="w-10 h-10" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <div className="flex items-center space-x-2">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={user.avatar} alt="@shadcn" />
                                <AvatarFallback>{user.username}</AvatarFallback>
                            </Avatar>
                            <p className="text-lg">{user.username}</p>
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
            <div className="w-full h-9 flex items-center space-x-1  rounded-full border-2 border-slate-200 p-2">
                <img src={quesiton} alt="search" className="w-5 h-5" />
                <p className="text-sm text-slate-400">Search</p>
            </div>
        </div >
    );
}

export default SideBarTopBar;