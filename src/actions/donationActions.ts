import { Donation, DonationModel } from "./../app/models/Donation";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function getDonations(email: string) {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const donationInfoDoc = await DonationModel.find({ email });
    if (!donationInfoDoc) {
      return false;
    }

    return NextResponse.json({ success: true, data: donationInfoDoc });
  } catch (error) {
    console.log(error);
  }
}
