import { AxiosResponse } from "axios"

export const handleResponseSuccess = async (res: AxiosResponse) => {
    let errMsg = ''
    const code = res?.data?.code
    const httpStatus = res?.status
    if (httpStatus !== 200) {
        errMsg = '网络错误'
        alert(errMsg)
        return Promise.reject(res)
    }

    switch (code) {
        case 0:
            errMsg = '未知错误'
            break;
        case 2:
            errMsg = '同步失败'
            break;
    }
    if (errMsg !== '') {
        alert(errMsg)
        return Promise.reject(res)
    }


    return Promise.resolve(res)
}