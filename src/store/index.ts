import { COMMON_CONFIG } from '@/config';
import { cacheGet } from '@/lib/localstorage';
import { create } from 'zustand'

export interface ILogin {
    phone: string;
    code: string;
}

interface ILoginStore {
    login: ILogin,
    setLogin: (login: ILogin) => void;
}

export const useLoginStore = create<ILoginStore>((set) => ({
    login: {
        phone: '',
        code: '',
    },
    setLogin: (login) => set({ login })
}))

export interface IChat {
    userID: string;
    userName: string;
    latestMessage: string;
    latestMessageTime: string;
    avatar: string;
}

interface IChatList {
    chatList: IChat[];
    setChatList: (chatList: IChat[]) => void;
    currentChat: IChat | null;
    setCurrentChat: (chat: IChat | null) => void;
}

export const useChatStore = create<IChatList>((set) => ({
    chatList: [],
    setChatList: (chatList) => set({ chatList }),
    currentChat: null,
    setCurrentChat: (chat) => set({ currentChat: chat }),
}))

export interface IUser {
    id: number;
    phone: string;
    name: string;
    avatar: string;
    description?: string;
    gender: string;
    age?: string;
}

interface IUserStore {
    user: IUser;
    setUser: (user: IUser) => void;
}

const getUserProfile = (): IUser => {
    const userProfile = cacheGet(COMMON_CONFIG.USERPROFILEKEY) as IUser;
    if (userProfile) {
        return userProfile;
    }
    return {
        id: 0,
        phone: '',
        name: '',
        avatar: '',
        description: '',
        gender: '2',
    }
}

export const useUserStore = create<IUserStore>((set) => ({
    user: getUserProfile(),
    setUser: (user) => set({ user })
}))

export interface IFriend {
    userID: string;
    userName: string;
    avatar: string;
}

interface IFriendList {
    friendList: IFriend[];
    setFriendList: (friendList: IFriend[]) => void;
}

export const useFriendListStore = create<IFriendList>((set) => ({
    friendList: [],
    setFriendList: (friendList) => set({ friendList }),
}))

export interface IInviteMessage {
    from: {
        userID: string;
        userName: string;
        avatar: string;
        sex: number;
        signature?: string;
        age?: number;
    }
    time: string;
    invaiteType: number;
    invaiteMessage: string;
    isRead: boolean;
}

interface IInviteMessageList {
    inviteMessageList: IInviteMessage[];
    setInviteMessageList: (inviteMessageList: IInviteMessage[]) => void;
}

export const useInviteMessageStore = create<IInviteMessageList>((set) => ({
    inviteMessageList: [],
    setInviteMessageList: (inviteMessageList) => set({ inviteMessageList }),
}))

export interface ILoginRequest {
    phone: string;
    code: string;
}

export interface ILoginResponse {
    token: string;
    id: string;
    name: string;
}

export interface IGetSTSTokenResponse {
    accessKeyId: string;
    accessKeySecret: string;
    securityToken: string;
    expiration: string;
}

export interface ISearchUser {
    id: number;
    name: string;
    avatar: string;
}

export interface ISearchUserResponse {
    code: number;
    data: ISearchUser;
}

export interface IUserCategory {
    id: string;
    categoryName: string;
}

export interface IGetUserCategoryListResponse {
    categoryList: IUserCategory[];
}

export interface ISearchProps {
    phone: string;
    searchStatus: number;
    searchResult: ISearchUser | null;
    isAdd: boolean;
    userCategory: IUserCategory[];
    categorySearchQuery: string;
}

interface ISearch {
    searchProps: ISearchProps;
    setSearchProps: (search: ISearchProps) => void;
}

export const useSearchStore = create<ISearch>((set) => ({
    searchProps: {
        phone: '',
        searchStatus: 0,
        searchResult: null,
        isAdd: false,
        userCategory: [],
        categorySearchQuery: '',
    },
    setSearchProps: (search) => set({ searchProps: search })
}))

export interface IAddFriendRequest {
    receiverId: number;
    categoryId: number;
    helloWorld: string;
}

export interface ICreatCategoryRequest {
    categoryName: string;
}

export interface ICreateCategoryResponse {
    categoryId: number;
}

export interface IEditUserProfileRequest {
    username?: string;
    avatar?: string;
    description?: string;
    gender?: string;
}

export interface IEditCategory {
    id: string;
    categoryName: string;
    isEditing: boolean;
}

export interface ICategoryFriendList {
    category: IEditCategory;
    friendList: IFriend[];
}

export interface ICategoryContentProps {
    allCategoryFriendList: ICategoryFriendList[]
    currentCategory: ICategoryFriendList | null;
    isAddingNewCategory: boolean;
    newCategoryName: string;
}

interface ICategoryContent {
    categoryContentProps: ICategoryContentProps;
    setCategoryContentProps: (categoryContent: ICategoryContentProps) => void;
}

export const useCategoryContentStore = create<ICategoryContent>((set) => ({
    categoryContentProps: {
        allCategoryFriendList: [],
        currentCategory: null,
        isAddingNewCategory: false,
        newCategoryName: '',
    },
    setCategoryContentProps: (categoryContent) => set({ categoryContentProps: categoryContent })
}))

export interface IMessage {
    id: number;
    avatar: string;
    name: string;
    message: string;
}
