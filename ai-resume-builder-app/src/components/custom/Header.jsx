import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const homeUrl = isSignedIn ? "/dashboard" : "/";

  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <Link to={homeUrl}>
        <img src="./public/logo.svg" alt="logo" />
      </Link>
      {isSignedIn ? (
        <div className="flex items-center gap-2">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button variant="outline"> Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
