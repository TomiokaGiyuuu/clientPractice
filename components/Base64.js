import { useState } from 'react';
import forge from 'node-forge';

export default function Base64() {
    const [base64P12, setBase64P12] = useState(null);

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        const password = 'AA1984';

        const reader = new FileReader();
        reader.onload = (event) => {
            const p12Data = event.target.result;
            const p12Base64 = btoa(p12Data);
            setBase64P12(p12Base64);
        };
        reader.readAsBinaryString(file);
        reader.onerror = () => console.error('Ошибка');
    };

    return (
        <div>
            <input type="file" accept=".p12" onChange={handleFileSelect} />
            {base64P12 && <div>{base64P12}</div>}
        </div>
    );
}