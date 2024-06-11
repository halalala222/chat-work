import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

export const handleResponseError = (error: AxiosError<{ type: string, code: number }, any>) => {
    const { code: ClientErrorCode } = error
    const { toast } = useToast();

    switch (ClientErrorCode) {
        case 'ERR_NETWORK':
            alert('network error')
            break;
        case 'ECONNABORTED':
            toast({
                title: "request timeout",
                variant: "destructive",
                description: "please retry later",
            })
            break;
    }
    return Promise.reject(error.response?.data)
}