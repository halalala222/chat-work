import { IMessage } from "@/store";
import { FileQuestion, FileImage, FileText, FileVideo, ArrowDownToLine } from "lucide-react";
import { useEffect, useState } from "react";

const getFileName = (url: string) => {
    const arr = url.split("/");
    return arr[arr.length - 1];
};

const getFileType = (url: string) => {
    const arr = url.split(".");
    return arr[arr.length - 1];
};

const getFileIcon = (url: string) => {
    const type = getFileType(url);
    switch (type) {
        case "png":
        case "jpg":
        case "jpeg":
            return <FileImage width={40} height={40} />;
        case "txt":
        case "pdf":
        case "doc":
        case "docx":
        case "xls":
        case "xlsx":
        case "ppt":
        case "pptx":
        case "csv":
        case "json":
        case "xml":
        case "yaml":
        case "yml":
        case "md":
        case "log":
            return <FileText width={40} height={40} />;
        case "mp4":
            return <FileVideo width={40} height={40} />;
        default:
            return <FileQuestion width={40} height={40} />;
    }
}

const convertBytes = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}


const getFileSize = async (url: string): Promise<string | null> => {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
            const size = response.headers.get('Content-Length');
            if (size) {
                return convertBytes(parseInt(size));
            }
        } else {
            console.error('Error fetching file size:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching file size:', error);
        return null;
    }

    return null;
}

const FileMessageCard = ({ message, isOther }: { message: IMessage, isOther: boolean }) => {
    const [fileSize, setFileSize] = useState<string | null>(null);
    useEffect(() => {
        const fetchFileSize = async () => {
            const size = await getFileSize(message.messageContent);
            setFileSize(size);
        };

        fetchFileSize(); // 触发异步操作
    }, [message.messageContent]); // 依赖项，只在 message.message 变化时重新获取文件大小

    // 处理文件下载
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = message.messageContent;
        link.download = getFileName(message.messageContent); // 设置下载的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="flex items-center space-x-2 bg-accent p-3 rounded-md max-w-xs">
            {
                isOther && (
                    <div
                        className="rounded-lg flex items-center justify-center"
                    >
                        {getFileIcon(message.messageContent)}
                    </div>
                )
            }
            <div className="text-muted-foreground truncate flex flex-col">
                <span
                    className="truncate text-primary"
                >
                    {getFileName(message.messageContent)}
                </span>
                <div
                    className="flex justify-between items-center w-full mt-1"
                >
                    {
                        isOther ? (
                            <>
                                <span
                                    className="text-sm text-muted-foreground"
                                >
                                    {fileSize && ` (${fileSize})`}
                                </span>
                                <ArrowDownToLine
                                    size={16}
                                    onClick={handleDownload}
                                    className="hover:text-primary cursor-pointer"
                                />
                            </>
                        ) : (
                            <>
                                <ArrowDownToLine
                                    size={16}
                                    onClick={handleDownload}
                                    className="hover:text-primary cursor-pointer"
                                />
                                <span
                                    className="text-sm text-muted-foreground"
                                >
                                    {fileSize && ` (${fileSize})`}
                                </span>
                            </>
                        )
                    }
                </div>
            </div>
            {
                !isOther && (
                    <div
                        className="rounded-lg flex items-center justify-center"
                    >
                        {getFileIcon(message.messageContent)}
                    </div>
                )
            }
        </div>
    )
};

export default FileMessageCard;