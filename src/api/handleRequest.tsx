import { InternalAxiosRequestConfig } from 'axios'
import { COMMON_CONFIG } from '@/config'
import { cacheGet } from '@/lib/localstorage'


export const handleRequest = async (config: InternalAxiosRequestConfig<any>) => {
    const token = cacheGet(COMMON_CONFIG.TOKENCACHEKEY)
    if (token && config.url !== '/user/login' && config.url !== '/user/code') {
        config.headers.Authorization = `${token}`
    }

    return config
}