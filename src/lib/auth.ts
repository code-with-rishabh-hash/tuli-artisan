// ═══════════════════════════════════════════════
// Tuli Artisan — Authentication Configuration
// NextAuth.js v5 (Auth.js) with Credentials + OAuth
// In demo mode (no DATABASE_URL), auth returns null session
// ═══════════════════════════════════════════════

import type { NextRequest } from "next/server";

const IS_DEMO = !process.env.DATABASE_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AuthResult = any;

async function initAuth() {
  const NextAuth = (await import("next-auth")).default;
  const { PrismaAdapter } = await import("@auth/prisma-adapter");
  const Credentials = (await import("next-auth/providers/credentials")).default;
  const Google = (await import("next-auth/providers/google")).default;
  const Facebook = (await import("next-auth/providers/facebook")).default;
  const bcrypt = (await import("bcryptjs")).default;
  const { prisma } = await import("./prisma");

  return NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: { signIn: "/login", error: "/login" },
    providers: [
      Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
      Facebook({ clientId: process.env.FACEBOOK_CLIENT_ID, clientSecret: process.env.FACEBOOK_CLIENT_SECRET }),
      Credentials({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) return null;
          const email = credentials.email as string;
          const password = credentials.password as string;
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user || !user.passwordHash) return null;
          const valid = await bcrypt.compare(password, user.passwordHash);
          if (!valid) return null;
          return { id: user.id, email: user.email, name: user.name, image: user.avatar };
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) token.id = user.id;
        return token;
      },
      async session({ session, token }) {
        if (session.user) session.user.id = token.id as string;
        return session;
      },
    },
  });
}

// Lazy-initialized auth instance (only created when actually needed in production)
let _authInstance: Awaited<ReturnType<typeof initAuth>> | null = null;

async function getAuthInstance() {
  if (!_authInstance) {
    _authInstance = await initAuth();
  }
  return _authInstance;
}

// Exported functions — in demo mode, return no-ops

export async function auth(): Promise<AuthResult> {
  if (IS_DEMO) return null;
  const instance = await getAuthInstance();
  return instance.auth();
}

export const handlers = {
  GET: async (req: NextRequest) => {
    if (IS_DEMO) {
      const { NextResponse } = await import("next/server");
      return NextResponse.json({ error: "Auth not configured in demo mode" }, { status: 503 });
    }
    const instance = await getAuthInstance();
    return instance.handlers.GET(req);
  },
  POST: async (req: NextRequest) => {
    if (IS_DEMO) {
      const { NextResponse } = await import("next/server");
      return NextResponse.json({ error: "Auth not configured in demo mode" }, { status: 503 });
    }
    const instance = await getAuthInstance();
    return instance.handlers.POST(req);
  },
};

export async function signIn(...args: unknown[]): Promise<AuthResult> {
  if (IS_DEMO) return null;
  const instance = await getAuthInstance();
  return (instance.signIn as (...a: unknown[]) => Promise<AuthResult>)(...args);
}

export async function signOut(...args: unknown[]): Promise<AuthResult> {
  if (IS_DEMO) return null;
  const instance = await getAuthInstance();
  return (instance.signOut as (...a: unknown[]) => Promise<AuthResult>)(...args);
}
