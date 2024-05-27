import axios from "axios";
import { handleRequest } from "@/api/handleRequest";
import { handleResponseError } from "@/api/handleResponseError";
import { handleResponseSuccess } from "@/api/handleResponseSuccess";
import { COMMON_CONFIG } from "@/config";
import { IAddFriendRequest, IGetSTSTokenResponse, ICreatCategoryRequest, ILoginRequest, ILoginResponse, ISearchUserResponse, IUser, IUserCategory, ICreateCategoryResponse, IEditUserProfileRequest } from "@/store";
axios.defaults.headers.post["Content-Type"] = "application/json";

const chatAxios = axios.create({
    baseURL: COMMON_CONFIG.DEV ? COMMON_CONFIG.DEVURL : COMMON_CONFIG.PROURL,
    timeout: 6000,
})

chatAxios.interceptors.request.use(handleRequest, (error) => Promise.reject(error))
chatAxios.interceptors.response.use(handleResponseSuccess, handleResponseError)

const apiRouters = {
    login: '/user/login',
    getLoginCode: '/user/code',
    sts: '/sts',
    searchUser: '/user/search',
    category: '/category/list',
    createCategory: '/category/add',
    addFriend: '/friend/add',
    editUserProfile: '/user/update',
    getUserProfile: '/user',
}

export const login = async (data: ILoginRequest): Promise<ILoginResponse> => {
    const res = await chatAxios.post(apiRouters.login, data)
    return res.data.data;
}

export const getLoginCode = async (phone: string) => {
    const res = await chatAxios.post(apiRouters.getLoginCode, { params: { phone } })
    return res.data
}

export const getSTSToken = async (): Promise<IGetSTSTokenResponse> => {
    const res = await chatAxios.get(apiRouters.sts);
    return res.data.data;
}

export const getUserProfile = async (userId: string): Promise<IUser> => {
    const res = await chatAxios.get(`${apiRouters.getUserProfile}/${userId}`);
    return res.data.data;
}

export const searchUser = async (phone: string): Promise<ISearchUserResponse> => {
    const res = await chatAxios.get(apiRouters.searchUser + `?phone=${phone}`);
    return res.data;
}

export const getUserCategoryList = async (): Promise<IUserCategory[]> => {
    const res = await chatAxios.get(apiRouters.category);
    return res.data.data.categoryList;
}

export const addFriend = async (req: IAddFriendRequest) => {
    const res = await chatAxios.post(apiRouters.addFriend, { params: { req } });
    return res.data.data;
}

export const createCategory = async (categoryName: ICreatCategoryRequest): Promise<ICreateCategoryResponse> => {
    const res = await chatAxios.post(apiRouters.createCategory, { params: { categoryName } });
    return res.data.data;
}

export const editUserProfile = async (data: IEditUserProfileRequest) => {
    const res = await chatAxios.put(apiRouters.editUserProfile, { params: { data } });
    return res.data.data;
}