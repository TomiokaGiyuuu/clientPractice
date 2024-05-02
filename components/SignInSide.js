import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import FormControl from "@mui/material/FormControl";
import {InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const theme = createTheme();

export default function SignInSide() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [base64P12, setBase64P12] = useState(null);
    const [fileName, setFileName] = useState("");

    const handleFile = async (event) => {
        const file = event.target.files[0];
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (event) => {
            const p12Data = event.target.result;
            const p12Base64 = btoa(p12Data);
            setBase64P12(p12Base64);
        };
        reader.readAsBinaryString(file);
        reader.onerror = () => console.error('Ошибка');

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const key = base64P12;
            const response = await axios.post('http://localhost:8080/login',{key, password});
            if (response.status === 200) {
                await router.push('/profile');
                console.log(response);
            }
        } catch (error) {
            alert('Ошибка: ' + error.message);
            console.error(error);
        }
    };
    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/logout');
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/08/08/06/46/e-commerce-5472254_1280.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h1 style={{marginBottom:"50px"}}>База коммерческих предложений</h1>

                        <Typography component="h1" variant="h5">
                            Войти по ЭЦП
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <div>
                                <label className="input-file">
                                    <input accept=".p12" onChange={handleFile}
                                           type="file"/>
                                        <span className="input-file-btn">Выберите файл</span>
                                        <span className="input-file-text">{fileName}</span>
                                </label>

                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={handlePasswordChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Пароль"
                                            />
                                        </FormControl>
                            </div>
                            <Button
                                onClick={handleSubmit}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Войти
                            </Button>

                            <Grid container>
                                <Grid item>
                                    <Link href="/reg" variant="body2">
                                        {"Регистрация по ЭЦП"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Button onClick={handleLogout}>Test</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
