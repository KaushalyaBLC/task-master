import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Configure NextAuth
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Attach access token and refresh token from Google account
      if (account) {
        token.accessToken = account.id_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }

      if (user) {
        token.userId = user.id; // Google user ID

        // Upsert the user into the Supabase DB
        const { error: upsertError } = await supabase
          .from("users")
          .upsert(
            {
              google_id: user.id,
              email: user.email,
              name: user.name,
              picture: user.image,
            },
            { onConflict: "google_id" } // assumes google_id is UNIQUE
          );

        if (upsertError) {
          console.error("Supabase upsert error:", upsertError.message);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.userId;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.expiresAt = token.expiresAt;

        // Fetch the user profile from Supabase
        const { data: userProfile, error } = await supabase
          .from("users")
          .select("*")
          .eq("google_id", token.userId)
          .single();

        if (!error && userProfile) {
          session.user.profile = userProfile;
        } else {
          console.error("Supabase user fetch error:", error?.message);
        }
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

// Export NextAuth handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
