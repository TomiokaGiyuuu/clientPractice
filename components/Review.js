import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import file from "node-forge/lib/cipherModes";



export default function Review() {

    const [password, setPassword] = useState('');
    const [base64P12, setBase64P12] = useState(null);

    const handleFile = async (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (event) => {
            const p12Data = event.target.result;
            const p12Base64 = btoa(p12Data);
            setBase64P12(p12Base64);
        };
        reader.readAsBinaryString(file);
        reader.onerror = () => console.error('Ошибка');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom >
                <input type="file" accept=".p12" onChange={handleFile} />
                <div className={"password-container"}>
                    <label className="password-label">Пароль:</label>
                    <input className="password-input" type="password" value={password} onChange={handlePasswordChange} />
                </div>
            </Typography>
        </React.Fragment>
    );
}