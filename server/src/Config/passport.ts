import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../Model/UserModel";
import passport from "passport";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? "https://netflix-clone-server-six.vercel.app/api/v1/auth/google/callback"
          : "http://localhost:5500/api/v1/auth/google/callback",
    },
    async (_, __, profile, cb) => {
      const email = profile.emails ? profile.emails?.[0].value : "";
      const image = profile.photos ? profile.photos[0].value : "";
      try {
        let user = await UserModel.findOne({
          email,
        });
        if (!user) {
          user = await UserModel.create({
            name: profile.displayName,
            image: image,
            email: email,
            emailVerified: true,
          });
        }
        return cb(null, user as Express.User);
      } catch (error) {
        console.log(error);
        return cb(error, undefined);
      }
    },
  ),
);

export default passport;
