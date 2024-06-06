"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { uploadImageToFirebase } from "@/actions/uploadImageActions";
import UploadButton from "./UploadButton";
import Image from "next/image";
import { ProfileInfo } from "@/app/models/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { useRouter } from "next/navigation";

interface ProfileInfoFormProps {
  profileInfo: ProfileInfo;
  avatarUrl: any;
}

const ProfileInfoForm: React.FC<ProfileInfoFormProps> = ({
  profileInfo,
  avatarUrl,
}) => {
  const router = useRouter();
  const [coverUrl, setCoverUrl] = useState<string | null>(
    profileInfo?.coverUrl
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: profileInfo?.username || "",
      displayName: profileInfo?.displayName || "",
      bio: profileInfo?.bio || "",
      avatarUrl: profileInfo?.avatarUrl || "",
      coverUrl: profileInfo?.coverUrl || "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      let newData = { ...data, coverUrl: coverUrl, avatarUrl: avatarUrl };
      await axios.post("/api/profile", newData);
      toast.success("Profile saved.");
    } catch (error: any) {
      toast.error(error);
      console.error("Error:", error);
    }
  };

  const logout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      <div className="relative border bg-gray-100 rounded-lg h-48 mb-10 shadow-xl">
        <Image
          src={coverUrl || ""}
          alt="cover"
          width={1024}
          height={1024}
          className="w-full h-48 object-cover object-center rounded-lg"
        />
        <div className="absolute bottom-3 right-2">
          <UploadButton setCoverUrl={setCoverUrl} />
        </div>
        <div className="absolute left-4 -bottom-4 size-24 ">
          <div className="size-24 border rounded-lg">
            <Image
              src={avatarUrl || ""}
              alt="avatar"
              width={120}
              height={120}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="input-label" htmlFor="usernameIn">
            Username
          </label>
          <input
            {...register("username")}
            name="username"
            id="usernameIn"
            type="text"
            placeholder="username"
          />
        </div>
        <div>
          <label className="input-label" htmlFor="displayNameIn">
            Display Name
          </label>
          <input
            {...register("displayName")}
            name="displayName"
            id="displayNameIn"
            type="text"
            placeholder="display name"
          />
        </div>
      </div>

      <div>
        <label className="input-label" htmlFor="bioIn">
          Bio
        </label>
        <textarea
          {...register("bio")}
          name="bio"
          id="bioIn"
          placeholder="bio"
        ></textarea>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleSubmit(onSubmit)}
          className="mt-4 bg-yellow-300 px-4 py-2 rounded-lg flex items-center gap-2"
          type="submit"
        >
          <FontAwesomeIcon icon={faSave} />
          Save profile
        </button>
        <button
          className="mt-4 bg-gray-300 border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2"
          type="button"
          onClick={logout}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfileInfoForm;
