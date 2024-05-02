import React from 'react';
import dynamic from "next/dynamic";
const SignUpSide = dynamic(()=>import("../components/SignUpSide"), {ssr: false})
const Reg = () => {
    return (
        <div>
            <SignUpSide/>
        </div>
    );
};

export default Reg;