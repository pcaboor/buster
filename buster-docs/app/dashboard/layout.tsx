import { getServerSession } from "next-auth";
import SignOutButton from "../../components/signOutButton";
import { authOptions } from "../../lib/authOptions";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/db";
import { getUser } from "../../lib/actionsUsers";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {


    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }
    const user = await getUser();

    if (!user) {
        return <div>Please sign in</div>;
    }

    return (
        <section>
            <div >

                {children}
            </div>
        </section>
    )
}