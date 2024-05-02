import dynamic from "next/dynamic";
const Checkout = dynamic(()=>import("../../components/Checkout"), {ssr: false})
export default function Offer() {
    return (
        <Checkout/>
    );
}