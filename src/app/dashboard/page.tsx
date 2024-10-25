import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../../../lib/authOptions'

export default async function Dashboard() {

    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }
    return (
        <div>Dashboard
            <p>Bienvenue {session.user?.name || session.user?.email}</p>
        </div>

    )
}
