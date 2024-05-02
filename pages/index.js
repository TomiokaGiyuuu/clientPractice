import React from 'react';
import Base64 from "../components/Base64";
import dynamic from "next/dynamic";
const SignInSide = dynamic(()=>import("../components/SignInSide"), {ssr: false})

const Index = () => {
    return (
        <div>
            <SignInSide/>
        </div>
    );
};

export default Index;