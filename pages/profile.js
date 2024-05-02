import React from 'react';
import dynamic from "next/dynamic";
const Dashboard = dynamic(()=>import("../components/Dashboard"), {ssr: false})

const Profile = () => {
    return (
        <div>
            <Dashboard/>
        </div>
    );
};

export default Profile;