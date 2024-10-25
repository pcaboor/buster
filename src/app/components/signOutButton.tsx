"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export default function SignOutButton() {

    const handleSignOut = () => {
        signOut({ callbackUrl: "/login" })
    }

    return (
        <div className="flex items-center justify-end mb-2 mt-2 lg:mt-0 p-3">
            <button onClick={handleSignOut}><LogOut /></button>
        </div>
    )
}