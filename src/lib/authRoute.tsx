import { useNavigate, Navigate } from "react-router-dom";
import { COMMON_CONFIG } from "@/config";
import { cacheGet } from "@/lib/localstorage";
import { FC } from "react";
import { useToast } from "@/components/ui/use-toast";

interface IProps {
    children: any
}

const getIsLogin = () => {
    const navigate = useNavigate();
    try {
        const cacheToken = cacheGet(COMMON_CONFIG.TOKENCACHEKEY)
        return cacheToken ? true : false
    } catch (e: any) {
        console.log(e)
        navigate("/login")
    }
}

const AuthRoute: FC<IProps> = ({ children }) => {
    const { toast } = useToast();
    const isLogin = getIsLogin();

    if (!isLogin) {
        toast({
            title: "Please log in first",
            variant: "destructive",
            description: "You need to log in to access this page",
        })
    }
    return isLogin ? <>{children}</> : <Navigate to="/login" replace />

}

export default AuthRoute