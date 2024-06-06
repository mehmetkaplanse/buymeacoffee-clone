import mongoose from "mongoose";
import { ProfileInfoModel } from "@/app/models/Profile";
import { NextResponse } from "next/server";
import { DonationModel } from "@/app/models/Donation";

export async function POST(request: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const body = await request.json();
    const {  amount, name, message, crypto, username } = body;

    const profileInfoDoc = await ProfileInfoModel.findOne({ username });
    // if (!profileInfoDoc) {
    //   return NextResponse.json({ error: "Profile not found!" }, { status: 404 });
    // }
    
    const email = 'mehmetkaplanse@gmail.com';
    await DonationModel.create({amount, name, message, crypto, email});


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
