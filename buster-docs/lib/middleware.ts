// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from './db'

export async function middleware(request: NextRequest) {
    // Récupérer le token de session depuis le cookie `next-auth.session-token`
    const sessionToken = request.cookies.get('next-auth.session-token')?.value

    // Si aucun token de session, rediriger vers la page de login
    if (!sessionToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Chercher la session dans la base de données en utilisant Prisma
    const session = await prisma.session.findUnique({
        where: { sessionToken },
        select: { expires: true },
    })

    // Si la session n'existe pas ou est expirée, rediriger vers la page de login
    if (!session || session.expires < new Date()) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // La session est valide, autoriser l'accès
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard', '/account', '/profile'], // Chemins protégés
}
