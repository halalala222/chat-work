import axios from "axios";
import { handleRequest } from "@/api/handleRequest";
import { handleResponseError } from "@/api/handleResponseError";
import { handleResponseSuccess } from "@/api/handleResponseSuccess";
import { COMMON_CONFIG } from "@/config";
import { IAddFriendRequest, IGetSTSTokenResponse, ICreatCategoryRequest, ILoginRequest, ILoginResponse, ISearchUserResponse, IUser, IUserCategory, ICreateCategoryResponse, IEditUserProfileRequest, IHandleInviteMessageRequest, IGetUserFriendInviteMessageResponse, IFriend, IChat, IGetNewChatMessageListRequest, IMessage, IUpdateCategoryRequest, IUpdateFriendCategoryRequest, ICreateGroupChatRequest } from "@/store";
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
    friendInviteMessageList: '/friend/invitationList',
    editUserProfile: '/user/update',
    getUserProfile: '/user',
    handleInvitedMessage: '/friend/handle',
    userFriendLsit: '/friend/list',
    getUserChatList: '/chat/list',
    getUserNewChatMessageList: '/chat/new',
    updateCategoryName: '/category/name',
    updateFriendCategory: '/category/friend',
    createGroupChat: '/user/groupChat/add',
}

export const login = async (data: ILoginRequest): Promise<ILoginResponse> => {
    const res = await chatAxios.post(apiRouters.login, data)
    return res.data.data;
}

export const getLoginCode = async (phone: string) => {
    const res = await chatAxios.post(apiRouters.getLoginCode, {}, {
        params: {
            phone: phone
        }
    })
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
    return res.data.data;
}

export const addFriend = async (req: IAddFriendRequest) => {
    const res = await chatAxios.post(apiRouters.addFriend, {
        receiverId: req.receiverId,
        categoryId: req.categoryId,
        helloWord: req.helloWorld
    });
    return res.data.data;
}

export const createCategory = async (categoryName: ICreatCategoryRequest): Promise<ICreateCategoryResponse> => {
    const res = await chatAxios.post(apiRouters.createCategory, {
        categoryName: categoryName.categoryName
    });
    return res.data.data;
}

export const editUserProfile = async (data: IEditUserProfileRequest) => {
    const res = await chatAxios.put(apiRouters.editUserProfile, data);
    return res.data.data;
}

export const handleInvitedMessage = async (data: IHandleInviteMessageRequest) => {
    await chatAxios.post(apiRouters.handleInvitedMessage,
        {
            senderId: data.SenderId,
            categoryId: data.CategoryId,
            status: data.Status,
        }
    );
}

export const getUserFriendInviteMessageList = async (): Promise<IGetUserFriendInviteMessageResponse[]> => {
    const res = await chatAxios.get(apiRouters.friendInviteMessageList);
    return res.data.data;
}

export const getUserFriendList = async (): Promise<IFriend[]> => {
    const res = await chatAxios.get(apiRouters.userFriendLsit);
    return res.data.data;
}

export const getUserCategoryFriendList = async (categoryId: number): Promise<IFriend[]> => {
    const res = await chatAxios.get(`${apiRouters.userFriendLsit}/${categoryId}`);
    return res.data.data;
}

export const getUserChatList = async (): Promise<IChat[]> => {
    const res = await chatAxios.get(apiRouters.getUserChatList);
    return res.data.data;
}

export const getNewChatMessageList = async (body: IGetNewChatMessageListRequest): Promise<IMessage[]> => {
    const res = await chatAxios.get(apiRouters.getUserNewChatMessageList, {
        params: {
            chatListId: body.chatListId,
            oldMessageId: body.oldMessageId,
        }
    });
    return res.data.data;
}

export const updateCategoryName = async (body: IUpdateCategoryRequest) => {
    await chatAxios.put(apiRouters.updateCategoryName, {
        categoryId: body.categoryId,
        categoryName: body.categoryName
    });
}

export const updateFriendCategory = async (body: IUpdateFriendCategoryRequest) => {
    await chatAxios.put(apiRouters.updateFriendCategory, {
        categoryId: body.categoryId,
        friendIdList: body.friendIdList
    });
}

export const creatGroupChat = async (body: ICreateGroupChatRequest): Promise<IChat> => {
    const res = await chatAxios.post(apiRouters.createGroupChat, {
        groupName: body.groupName,
        groupAvatar: body.groupAvatar,
        groupMemberIdList: body.groupMemberIdList
    });

    return res.data.data;
}