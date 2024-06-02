import { parseShareContent } from "@/lib/parsers";
import { IShareContent } from "@/store";
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react";

const VideoMessageCard = ({ message }: { message: string }) => {
    const [shareContent, setShareContent] = useState<IShareContent | null>(null);

    // 分享橘子海 (Orange Ocean)的单曲《Sona》: http://163cn.tv/rFJw82a (来自@网易云音乐)
    const getWangyiyunUrl = (message: string) => {
        const matched = message.match(/http.*?163cn\.tv\/\w+/);
        return matched ? matched[0] : '';
    }

    useEffect(() => {
        const fetchShareContent = async () => {
            // judge if the message is a link
            if (!message.startsWith('http')) {
                if (message.includes('163cn.tv')) {
                    message = getWangyiyunUrl(message);
                } else {
                    return;
                }
            }
            setShareContent({
                title: '',
                img: '',
                link: ''
            });
            const shareContent = await parseShareContent(
                message
            )
            if (shareContent?.img.startsWith('//')) {
                shareContent.img = 'http:' + shareContent.img;
            }
            if (shareContent?.img.includes('@')) {
                shareContent.img = shareContent.img.split('@')[0];
            }
            setShareContent(shareContent);
        };
        fetchShareContent();
    }, [message]);


    return (
        <div>
            {
                shareContent ? (
                    <a href={shareContent.link} target="_blank" rel="noreferrer"
                    >
                        <div className="text-muted-foreground flex items-center gap-2 bg-accent p-3 rounded-md max-w-xs text-wrap">
                            {
                                shareContent.img ? (
                                    <img
                                        src={shareContent.img}
                                        referrerPolicy="no-referrer"
                                        className="rounded-lg h-16 w-16"
                                    />
                                ) : (
                                    <Skeleton className="h-16 w-16 rounded-lg bg-slate-400" />
                                )
                            }
                            {
                                shareContent.img ? (
                                    <span className="text-primary self-start line-clamp-3">
                                        {shareContent.title}
                                    </span>
                                ) : (
                                    <div className="flex flex-col gap-1 self-start">
                                        <Skeleton className="w-56 h-4 bg-slate-400 " />
                                        <Skeleton className="w-48 h-4 bg-slate-400 " />
                                    </div>
                                )
                            }
                        </div>
                    </a>
                ) : (
                    <div className="max-w-xs text-wrap">
                        <span className="bg-accent p-3 rounded-md line-clamp-none break-words">
                            {message}
                        </span>
                    </div>
                )
            }
        </div>
    )
}

export default VideoMessageCard;