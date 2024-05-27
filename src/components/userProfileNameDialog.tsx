import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from 'lucide-react';

const UserProfileNameDialog = () => {
    return (
        <Dialog>
            <DialogTrigger className="text-gray-500 hover:text-black text-sm">
                <Pencil className="w-4 h-4" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Name</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Edit your Name information
                </DialogDescription>
                <div className="flex items-center space-x-3">
                    <Label htmlFor="name" className="text-base">
                        Name :
                    </Label>
                    <Input
                        id="name"
                        className="w-10/12"
                    />
                </div>
                <DialogFooter>
                    <div className="flex justify-end gap-4 py-4">
                        <DialogClose>
                            <Button
                                variant="secondary"
                            >Cancel</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button>Save</Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UserProfileNameDialog;