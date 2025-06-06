// @ts-nocheck
import React, { useContext } from "react";
import { Button } from "../button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { LogOut, User, Settings } from "lucide-react";
import SIgnInDialog from "./SIgnInDialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header() {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = React.useState(false);
  const router = useRouter();
  
  const handleLogin = () => {
    setOpenDialog(true);
  };
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      router.push("/");
    }
    setUserDetails(null);
  };

  return (
    <div className="flex backdrop-blur-sm fixed top-0 w-full items-center border-b justify-between px-4 py-3 z-50 shadow-md">
      <Link href="/" className="flex items-center gap-2">
            <h1 className="text-xl cursor-pointer font-bold text-gray-900 dark:text-white">
        React.flow
      </h1>
      </Link>

      
      <div className="flex items-center gap-4">
        {!userDetails ? (
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleLogin}
              variant="secondary"
              className="text-gray-900 dark:text-white bg-red-500 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Login
            </Button>
          </div>
        ) : (
          <DropdownMenu >
            <DropdownMenuTrigger className="relative z-20 cursor-pointer" asChild>
              <Button
                variant="ghost"
                className="relative z-20 h-8 w-8 rounded-full p-0"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={userDetails.picture || "/default-avatar.png"}
                    alt={userDetails.name || "User Avatar"}
                  />
                  <AvatarFallback className="text-xs">
                    {userDetails.name
                      ? userDetails.name[0].toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <SIgnInDialog
        openDialog={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </div>
  );
}

export default Header;