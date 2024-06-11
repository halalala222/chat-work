import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { SearchIcon, UserRound, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { searchUser, getUserCategoryList, addFriend, createCategory } from "@/api/chat";
import { useSearchStore } from "@/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CommandList } from "cmdk";
import { ScrollArea } from "@/components/ui/scroll-area";

const SearchUserNotFoundCode = 10;

const FormSchema = z.object({
    helloWorld: z.string().min(1),
    receiverId: z.number().int().positive(),
    categoryId: z.number(),
})

const AddNewFriendDialogContent = () => {
    const { searchProps, setSearchProps } = useSearchStore();
    const formRef = useRef<HTMLFormElement>(null);
    const handleSearch = async () => {
        const result = await searchUser(searchProps.phone);
        if (result.code !== SearchUserNotFoundCode) {
            setSearchProps({
                ...searchProps,
                searchStatus: 1,
                searchResult: result.data,
            });
        } else {
            setSearchProps({
                ...searchProps,
                searchStatus: 2,
            });
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhone = e.target.value;
        setSearchProps({
            ...searchProps,
            phone: newPhone,
            searchStatus: 0,
            searchResult: null,

        });
    }

    const setIsAdd = async (isAdd: boolean) => {
        const res = await getUserCategoryList();
        setSearchProps({
            ...searchProps,
            isAdd: isAdd,
            userCategory: res,
        });
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            receiverId: searchProps.searchResult?.id,
            categoryId: -1,
            helloWorld: "I'm " + searchProps.searchResult?.username,
        },
    });

    useEffect(() => {
        form.reset({
            receiverId: searchProps.searchResult?.id,
            helloWorld: "I'm " + searchProps.searchResult?.username,
            categoryId: form.getValues("categoryId"),  // 保留用户可能已经选择的类别
        });
    }, [searchProps.searchResult, form]);

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        await addFriend({
            receiverId: data.receiverId,
            categoryId: data.categoryId,
            helloWorld: data.helloWorld,
        })

        setSearchProps({
            ...searchProps,
            searchResult: null,
            searchStatus: 0,
            isAdd: false,
            phone: "",
        });
    }

    const handleCreateCategory = async () => {
        const res = await createCategory({
            categoryName: searchProps.categorySearchQuery,
        });
        setSearchProps({
            ...searchProps,
            userCategory: [
                ...searchProps.userCategory,
                {
                    id: res.categoryId,
                    categoryName: searchProps.categorySearchQuery,
                }
            ],
        });
    }

    return (
        <DialogContent
            className="h-[400px] w-[500px] overflow-hidden"
        >
            <AnimatePresence>
                <motion.div
                    key={searchProps.isAdd ? "add" : "search"} // 保持 key 属性以处理动画
                    layout // 添加 layout 属性来处理布局变化
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                    }}
                    className="w-full"
                >
                    {
                        searchProps.isAdd ? (
                            <div className="space-y-3">
                                <DialogHeader>
                                    <DialogTitle>
                                        Send add friend hello world
                                    </DialogTitle>
                                </DialogHeader>
                                <Form {...form}  >
                                    <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)} ref={formRef}>
                                        <FormField
                                            control={form.control}
                                            name="helloWorld"
                                            render={({ field }) => (
                                                <FormItem
                                                    className="w-full space-y-3"
                                                >
                                                    <FormLabel
                                                        htmlFor="helloWorld"
                                                        className="text-sm text-slate-400"
                                                    >
                                                        Send add friend invitation
                                                    </FormLabel>
                                                    <Input
                                                        type="text"
                                                        id="helloWorld"
                                                        {...field}
                                                        className="w-[200px]"
                                                    />
                                                    <FormMessage {...field} />
                                                    <FormDescription>
                                                        This is the hello world message that will be the first message to your friend
                                                    </FormDescription>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="categoryId"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel
                                                        htmlFor="categoryId"
                                                        className="text-sm text-slate-400"
                                                    >
                                                        Select a category
                                                    </FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-[200px] justify-between",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {
                                                                        searchProps.userCategory.find((category) => category.id === field.value)?.categoryName ||
                                                                        "Select a category"
                                                                    }
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[200px] p-0">
                                                            <Command>
                                                                <CommandInput
                                                                    value={searchProps.categorySearchQuery}
                                                                    placeholder="Search language..."
                                                                    onValueChange={(value) => {
                                                                        setSearchProps({
                                                                            ...searchProps,
                                                                            categorySearchQuery: value,
                                                                        });
                                                                    }}
                                                                />
                                                                <CommandEmpty
                                                                    onClick={
                                                                        () => {
                                                                            handleCreateCategory();
                                                                        }
                                                                    }
                                                                    className="flex cursor-pointer items-center justify-center gap-1 p-2"
                                                                >
                                                                    <p>Create: </p>
                                                                    <p className='block max-w-48 truncate font-semibold text-primary'>
                                                                        {searchProps.categorySearchQuery}
                                                                    </p>
                                                                </CommandEmpty>
                                                                <ScrollArea>
                                                                    <div className="p-2 max-h-60">
                                                                        <CommandGroup>
                                                                            <CommandList>
                                                                                {
                                                                                    searchProps.userCategory.map((category) => (
                                                                                        <CommandItem
                                                                                            key={category.id}
                                                                                            onSelect={() => {
                                                                                                form.setValue("categoryId", category.id);
                                                                                            }}
                                                                                            value={category.categoryName}
                                                                                        >
                                                                                            <Check
                                                                                                className={cn(
                                                                                                    "mr-2 h-4 w-4",
                                                                                                    category.id === field.value
                                                                                                        ? "opacity-100"
                                                                                                        : "opacity-0"
                                                                                                )}
                                                                                            />
                                                                                            {category.categoryName}
                                                                                        </CommandItem>
                                                                                    ))
                                                                                }
                                                                            </CommandList>
                                                                        </CommandGroup>
                                                                    </div>
                                                                </ScrollArea>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormDescription>
                                                        Select a category to add this friend to
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </form>
                                </Form>
                                <div className="flex justify-end space-x-3 pt-4">
                                    <Button
                                        onClick={
                                            () => {
                                                setIsAdd(false);
                                            }
                                        }
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        onClick={() => formRef.current && formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                                    >
                                        Send
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <DialogHeader>
                                    <DialogTitle>
                                        Add Friend
                                    </DialogTitle>
                                    <DialogDescription>
                                        Search for a friend by phone number
                                    </DialogDescription>
                                </DialogHeader>
                                <Label
                                    className="[&:has(:focus-visible)]:ring-ring flex items-center px-2 [&:has(:focus-visible)]:ring-2 h-[40px] rounded-sm ring-1 ring-slate-300"
                                >
                                    <span className="sr-only">
                                        Search by phone
                                    </span>
                                    <UserRound />
                                    <input
                                        placeholder="input phone number"
                                        className="size-full ml-2 border-none bg-transparent focus:outline-none"
                                        onChange={
                                            handleInput
                                        }
                                    />
                                </Label>
                                {
                                    searchProps.phone && (
                                        <motion.div
                                            key="searchButton"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.5 }}
                                            className="w-full h-[60px] flex mt-[-10px] items-center justify-between hover:bg-slate-100 rounded-sm ring-1 ring-slate-300 pr-2" onClick={handleSearch}
                                        >
                                            <div className="flex items-center">
                                                <div className="w-[60px] h-[60px] flex justify-center items-center">
                                                    <SearchIcon
                                                        className="w-[40px] h-[40px]"
                                                    />
                                                </div>
                                                <div
                                                >
                                                    <span
                                                        className="text-lg font-semibold"
                                                    >Search: </span>
                                                    <span
                                                        className="text-slate-500 font-semibold"
                                                    >{searchProps.phone}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <ArrowRight />
                                            </div>
                                        </motion.div>
                                    )
                                }
                                {
                                    searchProps.searchStatus === 1 && (
                                        <motion.div
                                            key="searchResult"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.5 }}
                                            className="w-full h-[70px] flex items-center justify-between space-x-2"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <Avatar className="w-[70px] h-[70px]">
                                                    <AvatarImage src={searchProps.searchResult?.avatar} />
                                                    <AvatarFallback>{searchProps.searchResult?.username}</AvatarFallback>
                                                </Avatar>
                                                <div className="text-xl font-semibold">
                                                    {
                                                        searchProps.searchResult?.username
                                                    }
                                                </div>
                                            </div>
                                            <Button
                                                onClick={
                                                    () => {
                                                        setIsAdd(true);
                                                    }
                                                }
                                            >
                                                Add
                                            </Button>
                                        </motion.div>
                                    )
                                }
                                {
                                    searchProps.searchStatus === 2 && (
                                        <motion.div
                                            key="searchError"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="ml-2 text-red-500"
                                        >
                                            Phone not found, please try again
                                        </motion.div>
                                    )
                                }
                            </div>
                        )
                    }
                </motion.div>
            </AnimatePresence>
        </DialogContent >
    );
};

export default AddNewFriendDialogContent;