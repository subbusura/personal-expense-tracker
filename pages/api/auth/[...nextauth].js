import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import dbConnect from "./../../../utils/dbConnect";
import UserModel from "./../../../models/users";
import Bcrypt from "bcrypt";

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    secret: process.env.JWT_SECRET, // 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    // Set to true to use encryption. Defaults to false (signing only).
    encryption: true
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // async encode({ secret, token, maxAge }) {},
    // async decode({ secret, token, maxAge }) {},
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
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied

        try {
          await dbConnect();
          let user = await UserModel.findOne({
            auth_type: 1,
            email: credentials.username
          });

          if (!user) {
            return null;
          }

          const compare = await Bcrypt.compare(
            credentials.password,
            user.password
          );

          if (compare) {
            return {
              sub: user._id,
              user_id: user._id,
              name: user.name,
              email: user.email,
              image: user.image
            };
          } else {
            return null;
          }
        } catch (error) {
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
      return user;
    },
    async redirect(url, baseUrl) {
      return baseUrl;
    },
    async session(session, user) {
      // console.log("session", user);
      if (user?.user_id) {
        session.user_id = user.user_id;
      }
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user?.user_id) {
        token.user_id = user.user_id;
      }
      return token;
    }
  },
  events: {
    async signIn(message) {},
    async signOut(message) {},
    async createUser(message) {},
    async linkAccount(message) {},
    async session(message) {},
    async error(message) {}
  }
});
