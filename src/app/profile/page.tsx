"use server";
import ProfileInfoForm from "@/components/profile/ProfileInfoForm";
import { authOptions } from "@/lib/authOptions";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { ProfileInfoModel } from "../models/Profile";
import { Donation, DonationModel } from "../models/Donation";
import TotalMoney from "@/components/profile/TotalMoney";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div className="h-screen w-full flex justify-center items-center font-semibold">Not logged in!</div>;
  }
  const email = session.user?.email;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc = JSON.parse(
    JSON.stringify(await ProfileInfoModel.findOne({ email }))
  );

  const donations: Donation[] = await DonationModel.find({ email });
  const totalMoney = donations.reduce(
    (current, d) => current + d.amount * 5,
    0
  );

  return (
    <div className="max-w-2xl mx-auto px-4">
      <ProfileInfoForm
        profileInfo={profileInfoDoc}
        avatarUrl={session.user?.image}
      />
      <TotalMoney totalMoney={totalMoney} />
    </div>
  );
};

export default ProfilePage;
