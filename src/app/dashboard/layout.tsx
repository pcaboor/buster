import { getServerSession } from "next-auth";
import SignOutButton from "../components/signOutButton";
import { authOptions } from "../../../lib/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {


    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }
    return (
        <section className="max-w-[1200px] mx-auto md:flex md:items-center md:gap-4 h-screen w-full mt-2 p-2">
            <div className="w-full h-full">
                <SignOutButton />
                {children}
            </div>
        </section>
    )
}