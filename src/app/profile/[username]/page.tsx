"use server";

import { getDonations } from "@/actions/donationActions";
import { ProfileInfoModel } from "@/app/models/Profile";
import DonationForm from "@/components/donation/DonationForm";
import RecentDonations from "@/components/donation/RecentDonations";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";

type Props = {
  params: {
    username: string;
  };
};
const SingleProfilePage = async ({ params }: Props) => {
  const username = params.username;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc = await ProfileInfoModel.findOne({ username });

  if (!profileInfoDoc) {
    return <div>404 - profile not found</div>;
  }

  let donationData: any[] = [];

  try {
    const result = await getDonations(profileInfoDoc.email);
    if (result) {
      const json = await result.json();
      if (json.success) {
        let results = [];
        results = json.data;
        if (results.length > 0) {
          donationData.push(results[results.length - 1]);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <div className="w-full h-64">
        <Image
          src={profileInfoDoc.coverUrl}
          alt="cover image"
          width={2048}
          height={2048}
          className="object-cover object-center h-64"
        />
      </div>
      <div className="max-w-2xl px-2 mx-auto relative -mt-16">
        <div className="flex gap-4 items-end">
          <div className="size-36 border-4 overflow-hidden border-white rounded-xl">
            <Image
              src={profileInfoDoc.avatarUrl}
              alt="avatar image"
              width={120}
              height={120}
              className="object-cover object-center size-36"
            />
          </div>
          <div className="mb-1">
            <h1 className="text-3xl font-bold">{profileInfoDoc.displayName}</h1>
            <h2 className="text-xs text-gray-500 flex items-center">
              <FontAwesomeIcon icon={faCoffee} />
              <span className="ms-1">/buymeacoffee.io/</span>
              <span>{profileInfoDoc.username}</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">About {profileInfoDoc.username},</h3>
            <p className="ms-2">{profileInfoDoc.bio}</p>
            <hr className="my-4" />
            <h3 className="font-semibold">Recent supporters:</h3>
            {donationData.length > 0 ? (
              <div className="ms-2">
                <ul>
                  {donationData.map((donation: any, index: number) => (
                    <li key={index} className="mb-2">
                      <RecentDonations recentDonation={donation} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No recent donations</p>
            )}
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <DonationForm email={profileInfoDoc.email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProfilePage;
