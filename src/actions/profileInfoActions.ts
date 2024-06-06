import { ProfileInfoModel } from "@/app/models/Profile";
import { authOptions } from "@/lib/authOptions";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export interface ProfileInfoModel {
    username: string
    displayName: string
    bio: string
}

export async function saveProfile(formData: ProfileInfoModel) {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("You need to be logged in!");

    const email = session.user?.email;
    const username = formData.username;
    const displayName = formData.displayName;
    const bio = formData.bio;

    const profileInfoDoc = await ProfileInfoModel.findOne({ email });

    if (profileInfoDoc) {
      profileInfoDoc.set({ username, displayName, bio });
      await profileInfoDoc.save();
    } else {
      await ProfileInfoModel.create({ username, displayName, bio, email });
    }

    return true; 
  } catch (error) {
    console.error(error);
    return false;
  }
}
