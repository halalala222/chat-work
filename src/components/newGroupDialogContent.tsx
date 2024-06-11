import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogClose, DialogHeader, DialogDescription } from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { useForm } from "react-hook-form"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useChatStore, useFriendListStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import FrindCard from "@/components/friendCard";
import { X, Search } from "lucide-react";
import { creatGroupChat, getUserFriendList } from "@/api/chat";

const FormSchema = z.object({
    items: z.array(z.number()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    groupName: z.string().min(1, { message: "Group name is required." }),
})


const NewGroupDialogContent = () => {
    const { friendList, setFriendList } = useFriendListStore();
    const { chatList, setChatList } = useChatStore();
    const [search, setSearch] = useState<string>("");
    const [displayedFriends, setDisplayedFriends] = useState(friendList);
    const formRef = useRef<HTMLFormElement>(null);
    const groupDefaultAvatarURL = "http://chat-ncu.oss-cn-nanjing.aliyuncs.com/2-1718116514021.jpeg";

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            items: [],
            groupName: "",
        }
    })
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const newGroupChat = await creatGroupChat({
            groupName: data.groupName,
            groupAvatar: groupDefaultAvatarURL,
            groupMemberIdList: data.items,
        });

        const newChatList = [{
            chat: {
                chatListId: newGroupChat.chatListId,
                chatName: newGroupChat.chatName,
                chatAvatar: newGroupChat.chatAvatar,
                lastMessageType: 0,
                lastMessageContent: "",
                readStatus: 0,
                lastSendTime: newGroupChat.lastSendTime,
                hasNewMessage: false,
            },
            messageList: [],
        }, ...chatList];

        setChatList(newChatList);
    }


    const watchedItems = form.watch("items");

    const getSelectedFriendList = (selectedIds: number[]) => {
        if (!selectedIds) return [];
        if (!friendList) return [];
        return friendList.filter(friend => selectedIds.includes(friend.friendId));
    };

    const handleRemoveItem = (userID: number) => {
        form.setValue("items", form.getValues("items").filter((value) => value !== userID));
    }

    const fetchFriendList = async () => {
        let res = await getUserFriendList();
        if (!res) {
            res = [];
        }
        setFriendList(res);
        setDisplayedFriends(res);
    }

    useEffect(() => {
        fetchFriendList();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        if (!searchValue) {
            setDisplayedFriends(friendList);
        } else {
            const pattern = new RegExp(searchValue, "i");
            const filteredList = friendList.filter(friend => pattern.test(friend.friendName));
            setDisplayedFriends(filteredList);
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                Make groups with friends
            </DialogHeader>
            <DialogDescription>
                Select the friend you want to make a group with.
            </DialogDescription>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="groupName"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-3">
                                <FormLabel className="text-md">
                                    Name :
                                </FormLabel>
                                <Input
                                    id="groupName"
                                    className="w-10/12"
                                    placeholder="Group name"
                                    {...field}
                                />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="items"
                        render={({ field }) => (
                            <div className="flex h-96">
                                <div className="flex flex-col space-y-2 w-48">
                                    <Label
                                        className="[&:has(:focus-visible)]:ring-ring flex items-center px-2 [&:has(:focus-visible)]:ring-2 h-10 rounded-sm ring-1 ring-slate-300"
                                    >
                                        <span className="sr-only">Search by phone</span>

                                        <Search />
                                        <input
                                            value={search}
                                            placeholder="input phone number"
                                            className="size-full ml-2 border-none bg-transparent focus:outline-none"
                                            onChange={handleSearch}
                                        />
                                    </Label>
                                    <ScrollArea className="h-96 w-48">
                                        {displayedFriends.map((friend) => (
                                            <div className="w-full flex items-center space-x-2  hover:bg-gray-100 rounded-md p-2">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(friend.friendId)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, friend.friendId])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== friend.friendId
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    <FrindCard friend={friend} />
                                                </FormLabel>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                </div>
                                <div className="flex flex-col mt-0 px-2">
                                    <div className="text-lg h-10">
                                        selected friends count : {getSelectedFriendList(watchedItems).length}
                                    </div>
                                    <ScrollArea className="mt-2 h-80">
                                        {
                                            getSelectedFriendList(watchedItems).map(friend => {
                                                return (
                                                    <div
                                                        key={friend.friendId}
                                                        className="flex items-center py-2 justify-between">
                                                        <FrindCard key={friend.friendId} friend={friend} />
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="w-8 h-8 mr-2"
                                                            onClick={() => handleRemoveItem(friend.friendId)}
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </ScrollArea>
                                </div>
                            </div>
                        )}
                    />
                    <div className="flex justify-end gap-4 py-4">
                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                onClick={() => formRef.current && formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                                type="submit">Create</Button>
                        </DialogClose>

                    </div>
                </form>
            </Form>
        </DialogContent>
    )
}

export default NewGroupDialogContent;