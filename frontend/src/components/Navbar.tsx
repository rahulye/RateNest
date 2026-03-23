/** @format */

import { PlusIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import ThemeSelector from "./ThemeSelector";
import { SignInButton, SignUpButton, useAuth } from "@clerk/react";

const Navbar = () => {
	const { isSignedIn } = useAuth();
	return (
		<div className="navbar bg-base-100 shadow-md">
			<div className="flex justify-between w-full max-w-5xl mx-auto items-center">
				<div>
					<Link to="/" className="gap-2 flex items-center">
						<ShoppingBagIcon className="size-5 text-primary" />
						<span className="uppercase font-bold text-lg tracking-wider font-mono">
							Ratenest
						</span>
					</Link>
				</div>
				<div className="flex justify-between gap-3">
					<ThemeSelector />
					{isSignedIn ? (
						<>
							<Link to={"/create"} className="btn btn-primary btn-sm gap-1">
								<PlusIcon className="size-5" />
								<span className="hidden sm:inline">New product</span>
							</Link>
							<Link to={"/profile"} className="btn btn-ghost btn-sm gap-1">
								<UserIcon className="size-5" />
								<span className="hidden sm:inline">Profile</span>
							</Link>
						</>
					) : (
						<>
							<SignInButton mode="modal">
								<button className="btn btn-ghost btn-sm">Sign In</button>
							</SignInButton>
							<SignUpButton mode="modal">
								<button className="btn btn-primary btn-sm">Get Started</button>
							</SignUpButton>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
