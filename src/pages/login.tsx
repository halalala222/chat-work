import Background from "@/components/backgroud";
import loginBackground from "@/assets/loginBackground.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoginStore, useUserStore } from "@/store/index";
import { useEffect } from "react";
import { getLoginCode, login as longApi, getUserProfile } from "@/api/chat";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cacheSet } from "@/lib/localstorage";
import { COMMON_CONFIG } from "@/config";

const loginPhonePattern = "^[1][3,4,5,6.7,8,9][0-9]{9}$"
const loginCodePattern = "^[0-9]{4}$"

const LoginPage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(-1);
    const { login, setLogin } = useLoginStore();
    const { setUser } = useUserStore();

    const handleInputPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({ ...login, phone: e.target.value });
    }

    const handleInputCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({ ...login, code: e.target.value });
    }

    const handleChangeCountdown = () => {
        if (countdown > 0) {
            setCountdown(countdown - 1);
        }
    }

    const initCountdown = async () => {
        if (!login.phone.match(loginPhonePattern)) {
            toast({
                title: "Invalid phone number",
                variant: "destructive",
                description: "Please enter a valid phone number",
            })
            return
        }
        try {
            await getLoginCode(login.phone);
        } catch (e) {
            console.log(e);
        }
        setCountdown(60);
    }

    const handleSign = async () => {
        if (!login.phone.match(loginPhonePattern) || !login.code.match(loginCodePattern)) {
            toast({
                title: "Invalid input",
                variant: "destructive",
                description: "Please enter a valid phone number and code",
            })
            return
        }
        try {
            const response = await longApi({
                phone: login.phone,
                code: login.code,
            });
            cacheSet(COMMON_CONFIG.TOKENCACHEKEY, response.token);
            cacheSet(COMMON_CONFIG.CURRENTUSERIDCACHEKEY, response.id);
            const userProfile = await getUserProfile(response.id);
            setUser(userProfile);
            cacheSet(COMMON_CONFIG.USERPROFILEKEY, userProfile);
            navigate('/');
        } catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                handleChangeCountdown();
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    return (
        <>
            <Background src={loginBackground} />
            <div className="fixed top-[25vh] left-[30vw]">
                <Card className="w-[300px] h-[400px]">
                    <CardHeader>
                        <CardTitle className="mb-[30px] text-l font-medium">Welcome!</CardTitle>
                        <CardTitle>Sign in to chat</CardTitle>
                        <CardDescription className="mt-[10px]">let chat !</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5 mb-[20px]">
                                    <Label htmlFor="phone">phone</Label>
                                    <Input id="name" placeholder="please input your phone number" onChange={handleInputPhone} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="code">code</Label>
                                    <div className="flex w-full max-w-sm items-center space-x-2">
                                        <Input id="framework" placeholder="pleas input code" onChange={handleInputCode} />
                                        {
                                            countdown > 0
                                                ?
                                                <Button variant="ghost" disabled >{countdown}s</Button>
                                                :
                                                <Button onClick={initCountdown} variant="ghost" type="button">Get code</Button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={handleSign}>Sign</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

export default LoginPage;