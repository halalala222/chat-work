import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogClose } from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { useForm } from "react-hook-form"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFriendListStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import FrindCard from "@/components/friendCard";
import { X, Search } from "lucide-react";
import { getUserFriendList } from "@/api/chat";

const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})

function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
}

const NewGroupDialogContent = () => {
    const { friendList, setFriendList } = useFriendListStore();
    const [search, setSearch] = useState<string>("");
    const [displayedFriends, setDisplayedFriends] = useState(friendList);
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            items: [],
        }
    })

    const watchedItems = form.watch("items");

    const getSelectedFriendList = (selectedIds: string[]) => {
        if (!selectedIds) return [];
        if (!friendList) return [];
        return friendList.filter(friend => selectedIds.includes(friend.friendId));
    };

    const handleRemoveItem = (userID: string) => {
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="items"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-xl">Make groups with friends</FormLabel>
                                    <FormDescription>
                                        Select the friend you want to make a group with.
                                    </FormDescription>
                                </div>
                                <div className="flex items-center space-x-3 pb-3">
                                    <Label className="text-md">
                                        Name :
                                    </Label>
                                    <Input
                                        id="groupName"
                                        className="w-10/12"
                                    />
                                </div>
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
                                                <FormField
                                                    key={friend.friendId}
                                                    control={form.control}
                                                    name="items"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={friend.friendId}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
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
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
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
                                <FormMessage />
                            </FormItem>
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