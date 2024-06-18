import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ProfileInfoModel } from "@/app/models/Profile";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const body = await request.json();
    const { username, displayName, bio, avatarUrl, coverUrl } = body;

    const session = await getServerSession(authOptions);
    if (!session) throw new Error("You need to be logged in!");

    const email = session.user?.email;
    const profileInfoDoc = await ProfileInfoModel.findOne({ email });
    if (profileInfoDoc) {
      profileInfoDoc.set({ username, displayName, bio, coverUrl, avatarUrl });
      await profileInfoDoc.save();
    } else {
      await ProfileInfoModel.create({ username, displayName, bio, email, coverUrl, avatarUrl });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const users = await ProfileInfoModel.find();
    if (users) {
      return NextResponse.json(users);  
    } else {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
