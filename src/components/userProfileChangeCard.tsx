type IUserProfileChangeCardProps = {
    title: string;
    profileValue: string;
    dialog: JSX.Element;
}

const UserProfileChangeCard = ({ title, profileValue, dialog }: IUserProfileChangeCardProps) => {
    return (
        <div className="flex flex-col space-y-2">
            <div className="text-sm text-black text-xl font-bold">
                {title}
            </div>
            <div className="flex items-center space-x-2">
                <div className="text-base text-gray-500">
                    {profileValue}
                </div>
                {dialog}
            </div>
        </div>
    )
}

export default UserProfileChangeCard;