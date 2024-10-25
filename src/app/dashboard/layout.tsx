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
        <section>
            <div >

                {children}
            </div>
        </section>
    )
}