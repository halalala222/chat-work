import { COMMON_CONFIG } from "@/config"

const getKey = (key: string) => {
    return COMMON_CONFIG.PREFIX + "_" + key
}

export const cacheGet = (key: string) => {
    return JSON.parse(localStorage.getItem(getKey(key)) || "null")
}

export const cacheSet = (key: string, data: any) => {
    localStorage.setItem(getKey(key), JSON.stringify(data))
}

export const cacheRemove = (key: string) => {
    localStorage.removeItem(getKey(key))
}

export const cacheClear = () => {
    localStorage.clear()
}