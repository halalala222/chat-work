import { useUserStore } from "@/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

import {
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog";
import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast";
import UploadFile from "@/lib/uploadFile";
import HovertAlert from "@/components/hoverAlert";
import { cacheSet } from "@/lib/localstorage";
import { COMMON_CONFIG } from "@/config";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { editUserProfile } from "@/api/chat";

const FormSchema = z.object({
    name: z.string().max(8, {
        message: "name must less than 8 characters.",
    }).min(1, {
        message: "name must more than 1 characters.",
    }),
    description: z.string().max(50, {
        message: "Signature must less than 50 characters.",
    }).min(1, {
        message: "Signature must more than 1 characters.",
    }),
})


const EditProfileDialogContent = () => {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const { user, setUser } = useUserStore();
    const [isEdited, setIsEdited] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getSexColor = () => {
        switch (user.gender) {
            case '0':
                return "bg-sky-500"
            case '1':
                return "bg-pink-500"
            default:
                return "bg-gray-500"
        }
    }

    const sexColor = getSexColor();

    const handleUploadPicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        try {
            const reuslt = await UploadFile({
                file: file,
                userID: user.id,
            })
            if (reuslt) {
                await editUserProfile({
                    avatar: reuslt,
                });
                setUser(
                    {
                        ...user,
                        avatar: reuslt,
                    }
                )
                toast({
                    title: "Upload success",
                    description: "Your avatar has been updated",
                })
            } else {
                toast({
                    title: "Upload failed",
                    variant: "destructive",
                    description: "Please try again",
                })
            }
        } catch (e) {
            toast({
                title: "Upload failed",
                variant: "destructive",
                description: "Please try again",
            })
        }
    }

    const handleEdit = () => {
        setIsEdited(true);
    }

    const handleChangeGender = async (gender: string) => {
        cacheSet(COMMON_CONFIG.USERPROFILEKEY, {
            ...user,
            gender: gender
        })
        await editUserProfile({
            gender: gender
        })
        setUser(
            {
                ...user,
                gender: gender,
            }
        )
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: user.username,
            description: user.description,
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        await editUserProfile({
            username: data.name,
            description: data.description,
        });
        cacheSet(COMMON_CONFIG.USERPROFILEKEY, {
            ...user,
            name: data.name,
            description: data.description,
        });

        setUser(
            {
                ...user,
                username: data.name,
                description: data.description,
            }
        )

        setIsEdited(false);
    }

    return (
        <DialogContent className="w-80 overflow-hidden">
            <div className="flex items-center flex-col space-y-2  h-[500px]">
                <div className="relative w-56 h-56">
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleUploadPicture} accept="image/gif,image/jpeg,image/jpg,image/png" multiple />
                    <Avatar className="w-full h-full">
                        <AvatarImage src={user.avatar} alt="@shadcn" />
                        <AvatarFallback>{user.username}</AvatarFallback>
                    </Avatar>
                    <div className="absolute rounded-full inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"
                        onClick={() => {
                            if (!fileInputRef.current) return;
                            fileInputRef.current.click()
                        }}
                    >
                        {/* Assuming there's an Icon component with a camera icon */}
                        <Camera name="camera" className="text-white text-3xl w-10 h-10" />
                    </div>
                </div>
                <AnimatePresence >
                    <motion.div
                        key={isEdited ? "editMode" : "viewMode"}
                        layout // 添加 layout 属性来处理布局变化
                        initial={{ opacity: 0, scale: 0.95 }} // 调整初始状态，加入缩放
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }} // 调整退出状态，加入缩放
                        transition={{
                            duration: 0.5,
                            ease: "easeInOut"
                        }}
                        className="w-full"
                    >
                        {
                            !isEdited ? (
                                <div className="self-start ml-0">
                                    <div className="flex items-center space-x-2">
                                        <div className="text-black text-2xl font-bold">
                                            {user.username}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger>
                                                <div className={"rounded-sm " + sexColor}>
                                                    <UserRound className="text-white" />
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex space-y-2 w-16 flex-col items-center">
                                                <div className="rounded-sm bg-sky-500 w-6" onClick={() => { handleChangeGender('0') }}>
                                                    <UserRound className="text-white" />
                                                </div>
                                                <div className="rounded-sm bg-pink-500 w-6" onClick={() => { handleChangeGender('1') }}>
                                                    <UserRound className="text-white" />
                                                </div>
                                                <div className="rounded-sm bg-gray-500 w-6" onClick={() => { handleChangeGender('-1') }}>
                                                    <UserRound className="text-white" />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="max-w-64 text-gray-500 text-base break-words">
                                        {
                                            user.description ? user.description : "No signature"
                                        }
                                    </div>
                                </div>
                            ) : (
                                <Form {...form}>
                                    <form className="w-full space-y-5" ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3 h-26">
                                                    <FormLabel className="flex items-center space-x-2">
                                                        <div className="font-semibold">
                                                            Name
                                                        </div>
                                                        <HovertAlert alertContent="Note : name should be less than 8 characters" />
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="h-10"
                                                            placeholder="Type your name here."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3 h-26">
                                                    <FormLabel className="flex items-center space-x-2">
                                                        <div className="font-semibold">
                                                            Signature
                                                        </div>
                                                        <HovertAlert alertContent="Note : signature should be less than 50 characters" />
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            className="h-28"
                                                            placeholder="Type your message here."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </form>
                                </Form>
                            )
                        }
                    </motion.div>
                </AnimatePresence>
            </div>
            <DialogFooter>
                {
                    !isEdited ? (
                        <Button onClick={handleEdit}>
                            Edit
                        </Button>
                    ) : (
                        <div className="flex space-x-2 justify-start">
                            <Button onClick={() => setIsEdited(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={() => formRef.current && formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                            >
                                Save
                            </Button>
                        </div>
                    )
                }
            </DialogFooter>
        </DialogContent >
    )
}

export default EditProfileDialogContent