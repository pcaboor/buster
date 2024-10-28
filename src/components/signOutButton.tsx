"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export default function SignOutButton() {

    const handleSignOut = () => {
        signOut({ callbackUrl: "/login" })
    }
    return (
        <div>
            <button onClick={handleSignOut}><LogOut /></button>
        </div>
    )
}