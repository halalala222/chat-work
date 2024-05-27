const MenuOption = (
    {
        text,
        icon,
    }:
        {
            text: string;
            icon: JSX.Element,
        }
) => {

    return (
        <div className="flex items-center gap-2 w-[200px]">
            <div className="text-slate-400 px-2">
                {icon}
            </div>
            <div className="font-semibold">
                {text}
            </div>
        </div>
    );
};

export default MenuOption;