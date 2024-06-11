import { DialogContent, DialogHeader, DialogClose } from "@/components/ui/dialog";
import { useInviteMessageStore, useUserCategoryStore } from "@/store";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { getUserCategoryList, handleInvitedMessage } from "@/api/chat";

const FormSchema = z.object({
    categoryID: z.string(),
})

const InviteMessageAccepting = ({ selectUserID }: { selectUserID: string }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const { inviteMessageList, setInviteMessageList, setSelectedMessage } = useInviteMessageStore();
    const { userCategory, setUserCategory } = useUserCategoryStore();
    const fetchCategoryList = async () => {
        const categoryList = await getUserCategoryList();
        setUserCategory(categoryList);
    };


    useEffect(() => {
        if (!userCategory || userCategory.length === 0) {
            fetchCategoryList()
        }
    }, [userCategory])

    const formRef = useRef<HTMLFormElement>(null);
    function onSubmit(data: z.infer<typeof FormSchema>) {
        const newInviteMessageList = inviteMessageList.map((inviteMessage) => {
            if (inviteMessage.from.userID === selectUserID) {
                return {
                    ...inviteMessage,
                    isAccepted: true,
                }
            }
            return inviteMessage;
        })

        setSelectedMessage(null);
        setInviteMessageList(newInviteMessageList);

        handleInvitedMessage({
            SenderId: parseInt(selectUserID),
            CategoryId: parseInt(data.categoryID),
            Status: 1,
        });
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Accept Invite Message
                </DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="categoryID"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-56">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Category List</SelectLabel>
                                            {
                                                userCategory.map((category) => {
                                                    return (
                                                        <SelectItem key={category.id} value={category.id.toString()}>
                                                            {category.categoryName}
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Please select the category you want to add to
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <div
                className="flex justify-end gap-4 py-4"
            >
                <DialogClose asChild>
                    <Button
                        onClick={() => formRef.current && formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                    >
                        Accept
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
            </div>
        </DialogContent>
    )
}


export default InviteMessageAccepting;