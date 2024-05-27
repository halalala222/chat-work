import { AxiosError } from "axios";

export const handleResponseError = (error: AxiosError<{ type: string, code: number }, any>) => {
    const { code: ClientErrorCode } = error
    switch (ClientErrorCode) {
        case 'ERR_NETWORK':
            alert('网络异常')
            break;
        case 'ECONNABORTED':
            alert('请求超时')
            break;
    }
    return Promise.reject(error.response?.data)
}