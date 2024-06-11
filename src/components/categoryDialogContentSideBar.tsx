import { useCategoryContentStore, ICategoryFriendList, IFriend, useUserCategoryStore } from '@/store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef } from 'react';
import { Plus, SquarePen } from 'lucide-react';
import { Input } from '@/components/ui/input'
import { createCategory, getUserCategoryFriendList, getUserCategoryList, updateCategoryName } from '@/api/chat';


const CategoryDialogContentSideBar = () => {
    const { categoryContentProps, setCategoryContentProps } = useCategoryContentStore();
    const { userCategory, setUserCategory } = useUserCategoryStore();
    const handleClickCategory = (categoryFriendList: ICategoryFriendList) => {
        setCategoryContentProps({ ...categoryContentProps, currentCategory: categoryFriendList });
    }

    const fetchAllCategoryFriendList = async () => {
        if (!userCategory) {
            return;
        }

        const categoryList = await getUserCategoryList();

        const allCategoryFriendList = categoryList.map(async (category) => {
            let friendList = await getUserCategoryFriendList(category.id);
            console.log(friendList);
            if (!friendList) {
                friendList = [];
            }
    
            return {
                category: {
                    id: category.id,
                    categoryName: category.categoryName,
                    isEditing: false
                },
                friendList: friendList,
            }
        });

        const result = await Promise.all(allCategoryFriendList);
        console.log(result);
        setUserCategory(categoryList);
        setCategoryContentProps({
            ...categoryContentProps,
            allCategoryFriendList: result,
        });
    }

    useEffect(() => {
        fetchAllCategoryFriendList();
    }, []);

    const endOfListRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleAddCategoryClick = () => {
        const newCategory = {
            category: {
                id: new Date().getTime(),
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

    const handleNewCategoryNameBlur = async () => {
        const newLastCategory = categoryContentProps.allCategoryFriendList[categoryContentProps.allCategoryFriendList.length - 1];
        newLastCategory.category.categoryName = categoryContentProps.newCategoryName;
        const categoryId = await createCategory({ categoryName: categoryContentProps.newCategoryName });
        newLastCategory.category.id = categoryId.categoryId;
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

    const handleEditCategoryNameBlur = async (category: ICategoryFriendList) => {
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
        await updateCategoryName({
            categoryId: category.category.id,
            categoryName: category.category.categoryName
        });
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
                className='w-96 flex flex-col space-y-2'
            >
                {
                    categoryContentProps.allCategoryFriendList.map((categoryFriendList, index) => {
                        if (index === categoryContentProps.allCategoryFriendList.length - 1 && categoryContentProps.isAddingNewCategory) {
                            return (
                                <div
                                    key="add-category"
                                    className='w-60 space-x-1 flex items-center cursor-pointer hover:bg-slate-100 p-2 rounded-md'
                                >
                                    <Input
                                        className='h-7'
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
                                    className='w-60 space-x-1 flex items-center cursor-pointer hover:bg-slate-100 p-2 rounded-md'
                                >
                                    <Input
                                        className='h-7'
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
                                className={'w-60 space-x-3 flex items-center cursor-pointer hover:bg-slate-100 p-2 rounded-md' + (categoryFriendList.category.id === categoryContentProps.currentCategory?.category.id ? " bg-gray-200" : "")}
                            >
                                <div
                                    className='w-48 text-ellipsis text-nowrap'
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
                    className='w-60 space-x-1 flex items-center cursor-pointer hover:bg-slate-100 p-2 rounded-md'
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