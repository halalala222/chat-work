import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cacheRemove } from "@/lib/localstorage";
import { COMMON_CONFIG } from "@/config";

const LogOutDialogContent = () => {
    const handleLogOut = () => {
        cacheRemove(COMMON_CONFIG.TOKENCACHEKEY)
        window.location.reload()
    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Log out</DialogTitle>
                <DialogDescription>
                    Are you sure you want to log out?
                </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-4 py-4">
                <DialogClose asChild>
                    <Button
                        variant="secondary"
                    >Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button onClick={handleLogOut}>Log out</Button>
                </DialogClose>
            </div>
        </DialogContent>
    );
};

export default LogOutDialogContent;