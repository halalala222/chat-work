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

export interface IMessage {
    id: number;
    chatListId: number;
    userId: number;
    messageContent: string;
    messageType: number;
    readStatus: number;
    sendTime: string;
    userAvatar: string;
    userName: string;
}

export interface IChat {
    chatListId: number;
    chatName: string;
    chatAvatar: string;
    lastMessageType: number;
    lastMessageContent: string;
    readStatus: number;
    lastSendTime: string;
    hasNewMessage: boolean;
}

export interface IChatListMessageList {
    chat: IChat;
    messageList: IMessage[];
}

interface IChatList {
    chatList: IChatListMessageList[]
    setChatList: (chatList: IChatListMessageList[]) => void;
    currentChat: IChat | null;
    setCurrentChat: (chat: IChat | null) => void;
    currentMessageList: IMessage[],
    setCurrentMessageList: (messageList: IMessage[]) => void;
}

export const useChatStore = create<IChatList>((set) => ({
    chatList: [],
    setChatList: (chatList) => set({ chatList }),
    currentChat: null,
    setCurrentChat: (chat) => set({ currentChat: chat }),
    currentMessageList: [],
    setCurrentMessageList: (messageList) => set({ currentMessageList: messageList }),
}))

export interface IUser {
    id: number;
    phone: string;
    username: string;
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
        username: '',
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
    friendId: number;
    friendName: string;
    friendAvatar: string;
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
    invaiteMessage: string;
    isAccepted: boolean;
}

export interface IGetUserFriendInviteMessageResponse {
    id: number,
    status: number,
    senderId: number,
    senderName: string,
    senderAvatar: string,
    senderSex: number,
    helloWord: string,
    createTime: string,
}



interface IInviteMessageList {
    inviteMessageList: IInviteMessage[];
    selectedMessage: IInviteMessage | null;
    setInviteMessageList: (inviteMessageList: IInviteMessage[]) => void;
    setSelectedMessage: (message: IInviteMessage | null) => void;
}

export const useInviteMessageStore = create<IInviteMessageList>((set) => ({
    inviteMessageList: [],
    selectedMessage: null,
    setInviteMessageList: (inviteMessageList) => set({ inviteMessageList }),
    setSelectedMessage: (message) => set({ selectedMessage: message }),
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
    username: string;
    avatar: string;
}

export interface ISearchUserResponse {
    code: number;
    data: ISearchUser;
}

export interface IUserCategory {
    id: number;
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
    id: number;
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

export interface IShareContent {
    title: string;
    img: string;
    link: string;
}

export interface IHandleInviteMessageRequest {
    SenderId: number;
    CategoryId: number;
    Status: 1 | 2;
}

interface IUserCategoryStore {
    userCategory: IUserCategory[];
    setUserCategory: (userCategory: IUserCategory[]) => void;
}

export const useUserCategoryStore = create<IUserCategoryStore>((set) => ({
    userCategory: [],
    setUserCategory: (userCategory) => set({ userCategory })
}))

export interface IGetNewChatMessageListRequest {
    chatListId: number;
    oldMessageId: number;
}

export interface IUpdateCategoryRequest {
    categoryId: number;
    categoryName: string;
}

export interface IUpdateFriendCategoryRequest {
    categoryId: number;
    friendIdList: number[];
}

export interface ICreateGroupChatRequest {
    groupName: string;
    groupAvatar: string;
    groupMemberIdList: number[];
}