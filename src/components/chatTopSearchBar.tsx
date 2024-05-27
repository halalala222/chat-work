import quesiton from "@/assets/question.svg";

const ChatTopSearchBar = () => {
    return (
        <div className="w-full h-[35px] flex items-center space-x-1  rounded-full border-2 border-slate-200 p-[10px]">
            <img src={quesiton} alt="search" className="w-[20px] h-[20px]" />
            <p className="text-sm text-slate-400">Search</p>
        </div>
    );
}

export default ChatTopSearchBar