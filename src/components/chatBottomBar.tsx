import {
    FileImage,
    Mic,
    Paperclip,
    PlusCircle,
    SendHorizontal,
    ThumbsUp,
} from "lucide-react";

import React, { useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { IMessage, useUserStore } from "@/store";
import { Textarea } from "@/components/ui/textarea";
import { EmojiPicker } from "@/components/emojiPicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import UploadFile from "@/lib/uploadFile";
import { useToast } from "@/components/ui/use-toast";
interface ChatBottombarProps {
    sendMessage: (newMessage: IMessage) => void;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

const ChatBottombar = ({
    sendMessage,
}: ChatBottombarProps) => {
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { user } = useUserStore();
    const pictureInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const handleThumbsUp = () => {
        const newMessage: IMessage = {
            id: message.length + 1,
            userName: user.name,
            userID: user.id,
            avatar: user.avatar,
            message: "👍",
        };
        sendMessage(newMessage);
        setMessage("");
    };

    const handleSend = () => {
        if (message.trim()) {
            const newMessage: IMessage = {
                id: message.length + 1,
                userName: user.name,
                userID: user.id,
                avatar: user.avatar,
                message: message.trim(),
            };
            sendMessage(newMessage);
            setMessage("");

            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }

        if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault();
            setMessage((prev) => prev + "\n");
        }
    };

    const handleUploadPicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        try {
            const reuslt = await UploadFile({
                file: file,
                userID: user.id,
            });
            if (!reuslt) {
                toast({
                    title: "Upload failed",
                    variant: "destructive",
                    description: "Please try again",
                })
            } else {
                const newMessage: IMessage = {
                    id: message.length + 1,
                    userName: user.name,
                    userID: user.id,
                    avatar: user.avatar,
                    message: reuslt,
                };
                sendMessage(newMessage);
                toast({
                    title: "Upload success",
                    description: "Your file has been uploaded successfully",
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

    const getIconAcceptFileType = (index: number): string => {
        if (index === 0) return "image/gif,image/jpeg,image/jpg,image/png";
        return "*";
    }

    return (
        <div className="flex justify-between w-full items-center gap-2">
            <div className="flex">
                <Popover>
                    <PopoverTrigger asChild>
                        <div
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "icon" }),
                                "h-9 w-9",
                                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                            )}
                        >
                            <PlusCircle size={20} className="text-muted-foreground" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        side="top"
                        className="w-full p-2">
                        {
                            <div
                                className={cn(
                                    buttonVariants({ variant: "ghost", size: "icon" }),
                                    "h-9 w-9",
                                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                )}
                            >
                                <Mic size={20} className="text-muted-foreground" />
                            </div>
                        }
                    </PopoverContent>
                </Popover>
                {!message.trim() && (
                    <div className="flex">
                        {BottombarIcons.map((icon, index) => (
                            <div
                                key={index}
                                className={cn(
                                    buttonVariants({ variant: "ghost", size: "icon" }),
                                    "h-9 w-9",
                                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                )}
                            >
                                <input type="file" ref={index === 0 ? pictureInputRef : fileInputRef} className="hidden" onChange={handleUploadPicture} accept={getIconAcceptFileType(index)} multiple />
                                <icon.icon
                                    onClick={() => {
                                        if (index === 0) {
                                            if (!pictureInputRef.current) return;
                                            pictureInputRef.current.click()
                                        } else {
                                            if (!fileInputRef.current) return;
                                            fileInputRef.current.click()
                                        }
                                    }}
                                    size={20}
                                    className="text-muted-foreground"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence initial={false}>
                <motion.div
                    key="input"
                    className="w-full relative"
                    layout
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{
                        opacity: { duration: 0.05 },
                        layout: {
                            type: "spring",
                            bounce: 0.15,
                        },
                    }}
                >
                    <Textarea
                        autoComplete="off"
                        value={message}
                        ref={inputRef}
                        onKeyDown={handleKeyPress}
                        onChange={handleInputChange}
                        name="message"
                        className="w-full min-h-9 h-9 border rounded-full flex items-center resize-none overflow-hidden bg-background"
                    ></Textarea>
                    <div className="absolute right-2 bottom-0.5  ">
                        <EmojiPicker onChange={(value) => {
                            setMessage(message + value)
                            if (inputRef.current) {
                                inputRef.current.focus();
                            }
                        }} />
                    </div>
                </motion.div>

                {message.trim() ? (
                    <div
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "h-9 w-9",
                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
                        )}
                        onClick={handleSend}
                    >
                        <SendHorizontal size={20} className="text-muted-foreground" />
                    </div>
                ) : (
                    <div
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "h-9 w-9",
                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
                        )}
                        onClick={handleThumbsUp}
                    >
                        <ThumbsUp size={20} className="text-muted-foreground" />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}


export default ChatBottombar;