'use client'
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { ProfileInfoModel } from "@/actions/profileInfoActions";
import axios from "axios";
import { ProfileInfo } from "@/app/models/Profile";


const Users = () => {
  const [users, setUsers] = useState<ProfileInfo[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/profile');
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  useEffect(() => {
    fetchUsers()
  },[])
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">Last Users</h2>
      <p className="italic text-md text-gray-600">
        Here are the latest users...
      </p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {
          users.map((user) => (
            <UserCard userInfo={user} key={user.username}/>
          ))
        }
      </div>
    </div>
  );
};

export default Users;
