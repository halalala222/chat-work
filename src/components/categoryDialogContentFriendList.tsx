import {
    useMemo,
    useState,
} from "react"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IFriend, useCategoryContentStore, IUserCategory } from "@/store"
import { ScrollArea } from '@/components/ui/scroll-area';

const userNameColumnKey = "userName"
const categoryNameColumnKey = "categoryName"

export type Payment = {
    userID: number;
    userName: string;
    categoryID: number;
    categoryName: string;
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "userName",
        header: "Username",
        cell: ({ row }) => (
            <div className="capitalize text-ellipsis w-[30px] text-nowrap">
                {
                    row.getValue(userNameColumnKey)
                }
            </div>
        ),
    },
    {
        accessorKey: "categoryName",
        header: "Category",
        cell: ({ row }) => (
            <div className="lowercase">
                {
                    row.getValue(categoryNameColumnKey)
                }
            </div>)
        ,
    },
]

const convertToPayment = (frindList: IFriend[] | undefined, category: IUserCategory | undefined): Payment[] => {
    if (!frindList || !category) {
        return [] as Payment[];
    }
    return frindList.map((friend) => ({
        userID: parseInt(friend.userID),
        userName: friend.userName,
        categoryID: parseInt(category.id),
        categoryName: category.categoryName,
    }));
}

export default function CategoryDialogContentFriendList() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const { categoryContentProps, setCategoryContentProps } = useCategoryContentStore();

    const tableData = useMemo(() => {
        return convertToPayment(categoryContentProps.currentCategory?.friendList, categoryContentProps.currentCategory?.category);
    }, [categoryContentProps.currentCategory?.friendList, categoryContentProps.currentCategory?.category]);

    const table = useReactTable({
        data: tableData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const getSelectedUserIDList = () => {
        return table.getSelectedRowModel().rows.map((row) => row.original.userID);
    }

    // change user list category to another category(in dropdown menu)
    const handleChangeUserListCategory = (categoryID: number) => {
        const selectedUserIDList = getSelectedUserIDList();
        if (selectedUserIDList.length === 0) {
            return;
        }

        const selectUserIDList = categoryContentProps.currentCategory?.friendList.filter((friend) =>
            selectedUserIDList.includes(parseInt(friend.userID))
        );
        const newCategoryFriendList = categoryContentProps.allCategoryFriendList.map((categoryFriendList) => {
            if (categoryFriendList.category.id === categoryID.toString()) {
                return {
                    category: categoryFriendList.category,
                    friendList: categoryFriendList.friendList.concat(
                        selectUserIDList as IFriend[]
                    ),
                };
            } else if (categoryFriendList.category.id === categoryContentProps.currentCategory?.category.id) {
                return {
                    category: categoryFriendList.category,
                    friendList: categoryFriendList.friendList.filter((friend) =>
                        !selectedUserIDList.includes(parseInt(friend.userID))
                    ),
                };
            }
            return categoryFriendList;
        });

        table.toggleAllPageRowsSelected(false);

        const newCurrentCategory = newCategoryFriendList.find((categoryFriendList) =>
            categoryFriendList.category.id === categoryContentProps.currentCategory?.category.id
        );

        if (!newCurrentCategory) {
            return;
        }

        setCategoryContentProps({
            ...categoryContentProps,
            allCategoryFriendList: newCategoryFriendList,
            currentCategory: newCurrentCategory,
        });
    }

    return (
        <div className="w-full p-2">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter User Name ..."
                    value={
                        (table.getColumn(userNameColumnKey)?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table.getColumn(userNameColumnKey)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm w-[350px]"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto w-[120px]">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <ScrollArea
                className="h-80 rounded-md border"
            >
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {
                            table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </ScrollArea>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-[180px]">
                                Change Category <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {
                                categoryContentProps.allCategoryFriendList.map((categoryFriendList) => (
                                    <DropdownMenuItem
                                        key={categoryFriendList.category.id}
                                    >
                                        {
                                            <div
                                                className="capitalize"
                                                onClick={
                                                    () => handleChangeUserListCategory(
                                                        parseInt(categoryFriendList.category.id)
                                                    )
                                                }
                                            >
                                                {
                                                    categoryFriendList.category.categoryName
                                                }
                                            </div>
                                        }
                                    </DropdownMenuItem>
                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}
