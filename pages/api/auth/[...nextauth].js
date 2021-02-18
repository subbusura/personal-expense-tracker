import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/account/profile" // If set, new users will be directed here on first sign in
  },
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      name: "GitHub",
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const user = {
          id: 1,
          name: "Subramani Krishnan",
          email: "subramani@gmail.com"
        };

        if (credentials.username == "subramani@gmail.com") {
          return user;
        } else {
          return null;
        }
      }
    })
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URI,
  callbacks: {
    async signIn(user, account, profile) {
      return true;
    },
    async redirect(url, baseUrl) {
      return baseUrl;
    },
    async session(session, user) {
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token;
    }
  },
  events: {
    async signIn(message) {
      console.log("SING IN", message);
    },
    async signOut(message) {
      console.log("SING OUT", message);
    },
    async createUser(message) {
      console.log("CREATE USER", message);
    },
    async linkAccount(message) {
      console.log("LINK ACCOUNT", message);
    },
    async session(message) {
      console.log("SESSION", message);
    },
    async error(message) {
      console.log("ERROR", message);
    }
  }
});
