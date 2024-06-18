import { ProfileInfo } from "@/app/models/Profile";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface UserCardProps {
  userInfo: ProfileInfo;
}

const UserCard: React.FC<UserCardProps> = ({ userInfo }) => {
  return (
    <Link
      href={`profile/${userInfo?.username}`}
      className="border border-gray-400 p-2 rounded-lg shadow-md cursor-pointer"
    >
      <div className="w-24 h-24 rounded-full border border-black bg-red-400 flex items-center justify-center m-auto">
        <Image
          src={userInfo?.avatarUrl}
          alt="userInfo"
          width={96}
          height={96}
          className="object-cover rounded-full"
        />
      </div>
      <div className="text-lg">{userInfo?.displayName}</div>
      <div className="text-xs text-gray-700 italic">@{userInfo?.username}</div>
    </Link>
  );
};

export default UserCard;
