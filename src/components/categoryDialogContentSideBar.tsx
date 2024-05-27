import { useCategoryContentStore, ICategoryFriendList, IFriend } from '@/store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef } from 'react';
import { Plus, SquarePen } from 'lucide-react';
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid';

const mockAllCategoryDialogContenSiderBar = (): ICategoryFriendList[] => {
    return [
        {
            category: {
                id: "1",
                categoryName: "undefine category 1",
                isEditing: false,
            },
            friendList: [
                {
                    userID: "1",
                    userName: "userOne",
                    avatar: "aaa",
                },
                {
                    userID: "2",
                    userName: "userTwo",
                    avatar: "bbb",
                },
                {
                    userID: "3",
                    userName: "userThree",
                    avatar: "ccc",
                },
                {
                    userID: "4",
                    userName: "userFour",
                    avatar: "ddd",
                }
            ]
        },
        {
            category: {
                id: "2",
                categoryName: "undefine category 2",
                isEditing: false,
            },
            friendList: [
                {
                    userID: "5",
                    userName: "userFive",
                    avatar: "eee",
                },
                {
                    userID: "6",
                    userName: "userSix",
                    avatar: "fff",
                },
                {
                    userID: "7",
                    userName: "userSeven",
                    avatar: "ggg",
                },
                {
                    userID: "8",
                    userName: "userEight",
                    avatar: "hhh",
                }
            ]
        },
        {
            category: {
                id: "3",
                categoryName: "undefine category 3",
                isEditing: false,
            },
            friendList: [
                {
                    userID: "9",
                    userName: "userNine",
                    avatar: "iii",
                },
                {
                    userID: "10",
                    userName: "userTen",
                    avatar: "jjj",
                },
                {
                    userID: "11",
                    userName: "userEleven",
                    avatar: "kk",
                },
            ]
        },
        {
            category: {
                id: "4",
                categoryName: "undefine category 4",
                isEditing: false,
            },
            friendList: [
                {
                    userID: "12",
                    userName: "userTwelve",
                    avatar: "lll",
                },
                {
                    userID: "13",
                    userName: "userThirteen",
                    avatar: "mmm",
                },
                {
                    userID: "14",
                    userName: "userFourteen",
                    avatar: "nnn",
                },
                {
                    userID: "15",
                    userName: "userFifteen",
                    avatar: "ooo",
                }
            ]
        },
        {
            category: {
                id: "5",
                categoryName: "undefine category 5",
                isEditing: false,
            },
            friendList: [
                {
                    userID: "16",
                    userName: "userSixteen",
                    avatar: "ppp",
                },
                {
                    userID: "17",
                    userName: "userSeventeen",
                    avatar: "qqq",
                },
                {
                    userID: "18",
                    userName: "userEighteen",
                    avatar: "rrr",
                },
                {
                    userID: "19",
                    userName: "userNineteen",
                    avatar: "sss",
                }
            ]
        },
        {
            category: {
                id: "6",
                categoryName: "undefine category 6",
                isEditing: false,
            },
            friendList: [
                {
                    userID: "20",
                    userName: "userTwenty",
                    avatar: "ttt",
                },
                {
                    userID: "21",
                    userName: "userTwentyOne",
                    avatar: "uuu",
                },
                {
                    userID: "22",
                    userName: "userTwentyTwo",
                    avatar: "vvv",
                },
                {
                    userID: "23",
                    userName: "userTwentyThree",
                    avatar: "www",
                }
            ]
        },
        {
            category: {
                id: "7",
                categoryName: "undefine category 7",
                isEditing: false,
            },
            friendList: [
                {
                    userID: "24",
                    userName: "userTwentyFour",
                    avatar: "xxx",
                },
                {
                    userID: "25",
                    userName: "userTwentyFive",
                    avatar: "yyy",
                },
                {
                    userID: "26",
                    userName: "userTwentySix",
                    avatar: "zzz",
                },
                {
                    userID: "27",
                    userName: "userTwentySeven",
                    avatar: "aaa",
                }
            ]
        },
        {
            category: {
                id: "8",
                categoryName: "undefine category 8",
                isEditing: false,
            },
            friendList: [
                {
                    userID: "28",
                    userName: "userTwentyEight",
                    avatar: "bbb",
                },
                {
                    userID: "29",
                    userName: "userTwentyNine",
                    avatar: "ccc",
                },
                {
                    userID: "30",
                    userName: "userThirty",
                    avatar: "ddd",
                },
                {
                    userID: "31",
                    userName: "userThirtyOne",
                    avatar: "eee",
                }
            ]
        },
        {
            category: {
                id: "9",
                categoryName: "undefine category 9",
                isEditing: false,
            },
            friendList: [
                {
                    userID: "32",
                    userName: "userThirtyTwo",
                    avatar: "fff",
                },
                {
                    userID: "33",
                    userName: "userThirtyThree",
                    avatar: "ggg",
                },
                {
                    userID: "34",
                    userName: "userThirtyFour",
                    avatar: "hhh",
                },
                {
                    userID: "35",
                    userName: "userThirtyFive",
                    avatar: "iii",
                }
            ]
        },
        {
            category: {
                id: "10",
                categoryName: "undefine category 10",
                isEditing: false,
            },
            friendList: [
                {
                    userID: "36",
                    userName: "userThirtySix",
                    avatar: "jjj",
                },
                {
                    userID: "37",
                    userName: "userThirtySeven",
                    avatar: "kkk",
                },
                {
                    userID: "38",
                    userName: "userThirtyEight",
                    avatar: "kkk",
                },
                {
                    userID: "39",
                    userName: "userThirtyNine",
                    avatar: "kkk",
                },
                {
                    userID: "40",
                    userName: "userForty",
                    avatar: "kkk",
                },
            ]
        }
    ]
}

const CategoryDialogContentSideBar = () => {
    const { categoryContentProps, setCategoryContentProps } = useCategoryContentStore();
    const handleClickCategory = (categoryFriendList: ICategoryFriendList) => {
        setCategoryContentProps({ ...categoryContentProps, currentCategory: categoryFriendList });
    }

    useEffect(() => {
        setCategoryContentProps({ ...categoryContentProps, allCategoryFriendList: mockAllCategoryDialogContenSiderBar() });
    }, []);

    const endOfListRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    const handleAddCategoryClick = () => {
        const newCategory = {
            category: {
                id: uuidv4(),
                categoryName: '',
                isEditing: false,
            },
            friendList: [] as IFriend[]
        };

        setCategoryContentProps({
            ...categoryContentProps,
            allCategoryFriendList: [...categoryContentProps.allCategoryFriendList, newCategory],
            isAddingNewCategory: true
        })

        setTimeout(() => {
            scrollToBottom();
        }, 100);
    }

    const handleNewCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryContentProps({ ...categoryContentProps, newCategoryName: e.target.value });
    }

    const handleNewCategoryNameBlur = () => {
        // TODO add new category, but api not ready
        const newLastCategory = categoryContentProps.allCategoryFriendList[categoryContentProps.allCategoryFriendList.length - 1];
        newLastCategory.category.categoryName = categoryContentProps.newCategoryName;
        const newCategoryList = [...categoryContentProps.allCategoryFriendList];
        newCategoryList[newCategoryList.length - 1] = newLastCategory;
        setCategoryContentProps({
            ...categoryContentProps,
            allCategoryFriendList: newCategoryList,
            isAddingNewCategory: false,

        })
    }

    const handleEditCategoryName = (category: ICategoryFriendList) => {
        const newCategoryList = categoryContentProps.allCategoryFriendList.map((categoryFriendList) => {
            if (categoryFriendList.category.id === category.category.id) {
                return {
                    ...categoryFriendList,
                    category: {
                        ...categoryFriendList.category,
                        isEditing: true
                    }
                }
            }
            return categoryFriendList;
        })
        setCategoryContentProps({
            ...categoryContentProps,
            allCategoryFriendList: newCategoryList
        })
    }

    const handleEditCategoryNameBlur = (category: ICategoryFriendList) => {
        const newCategoryList = categoryContentProps.allCategoryFriendList.map((categoryFriendList) => {
            if (categoryFriendList.category.id === category.category.id) {
                return {
                    ...categoryFriendList,
                    category: {
                        ...categoryFriendList.category,
                        isEditing: false
                    }
                }
            }
            return categoryFriendList;
        })
        // TODO update category name,but api not ready
        setCategoryContentProps({
            ...categoryContentProps,
            allCategoryFriendList: newCategoryList
        })
    }

    const handleEditCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>, category: ICategoryFriendList) => {
        const newCategoryList = categoryContentProps.allCategoryFriendList.map((categoryFriendList) => {
            if (categoryFriendList.category.id === category.category.id) {
                return {
                    ...categoryFriendList,
                    category: {
                        ...categoryFriendList.category,
                        categoryName: e.target.value
                    }
                }
            }
            return categoryFriendList;
        })
        setCategoryContentProps({
            ...categoryContentProps,
            allCategoryFriendList: newCategoryList
        })
    }

    return (
        <div
            className='w-full h-full flex flex-col space-y-4'
        >
            <span
                className='text-lg text-slate-400 px-2'
            >
                Manage Categories
            </span>
            <ScrollArea
                className='w-[250px] flex flex-col space-y-2'
            >
                {
                    categoryContentProps.allCategoryFriendList.map((categoryFriendList, index) => {
                        if (index === categoryContentProps.allCategoryFriendList.length - 1 && categoryContentProps.isAddingNewCategory) {
                            return (
                                <div
                                    key="add-category"
                                    className='w-[240px] space-x-1 flex items-center cursor-pointer hover:bg-slate-100 p-2 rounded-md'
                                >
                                    <Input
                                        className='h-[35px]'
                                        onBlur={
                                            () => {
                                                handleNewCategoryNameBlur();
                                            }
                                        }
                                        onChange={handleNewCategoryNameChange}
                                    />
                                </div>
                            )
                        }

                        if (categoryFriendList.category.isEditing) {
                            return (
                                <div
                                    key={categoryFriendList.category.id}
                                    className='w-[240px] space-x-1 flex items-center cursor-pointer hover:bg-slate-100 p-2 rounded-md'
                                >
                                    <Input
                                        className='h-[35px]'
                                        onBlur={
                                            () => {
                                                handleEditCategoryNameBlur(categoryFriendList);
                                            }
                                        }
                                        onChange={(e) => handleEditCategoryNameChange(e, categoryFriendList)}
                                    />
                                </div>
                            )
                        }
                        return (
                            <div key={categoryFriendList.category.id}
                                className={'w-[240px] space-x-5 flex items-center cursor-pointer hover:bg-slate-100 p-2 rounded-md' + (categoryFriendList.category.id === categoryContentProps.currentCategory?.category.id ? " bg-gray-200" : "")}
                            >
                                <div
                                    className='w-[180px] text-ellipsis text-nowrap'
                                    onClick={() => handleClickCategory(categoryFriendList)}
                                >
                                    <span>
                                        {categoryFriendList.category.categoryName}
                                    </span>
                                    <span
                                        className='text-slate-400'
                                    >
                                        {
                                            ' (' + categoryFriendList.friendList.length + ')'
                                        }
                                    </span>
                                </div>
                                <div>
                                    <SquarePen
                                        className='w-4 h-4'
                                        onClick={() => handleEditCategoryName(categoryFriendList)}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
                <div
                    className='w-[240px] space-x-1 flex items-center cursor-pointer hover:bg-slate-100 p-2 rounded-md'
                    onClick={handleAddCategoryClick}
                >
                    <div
                        className='w-6 h-6 flex items-center justify-center rounded-full bg-slate-400'
                    >
                        <Plus
                            size={24}
                            color='#fff'
                        />
                    </div>
                    <span
                        className=''
                    >
                        Add Category
                    </span>
                </div>
                <div ref={endOfListRef} />
            </ScrollArea>
        </div>
    )
}

export default CategoryDialogContentSideBar;