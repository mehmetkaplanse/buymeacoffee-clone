"use client";

import { Donation } from "@/app/models/Donation";

const RecentDonations = ({ recentDonation }: { recentDonation: Donation }) => {
  
    return (
    <div>
      <div className="py-2">
          <h3>
            <span className="font-semibold">{recentDonation.name}</span> {' '}
            <span className="text-gray-400">
              bought you {recentDonation.amount > 1 ? recentDonation.amount + ' coffee' : 'a coffee'}
            </span>
          </h3>
          <p className="bg-gray-100 p-2 rounded-md">{recentDonation.message}</p>
      </div>
    </div>
  );
};

export default RecentDonations;
