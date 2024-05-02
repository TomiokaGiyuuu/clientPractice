import React from 'react';
import dynamic from "next/dynamic";
const Lots = dynamic(()=>import("../components/Lots"), {ssr: false})

const Profile = () => {
    return (
        <div>
            <Lots/>
        </div>
    );
};

export default Profile;