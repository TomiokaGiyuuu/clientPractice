import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import {useState} from "react";
import FormControl from "@mui/material/FormControl";
import {InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import InputMask from 'react-input-mask';
import {router} from "next/client";

const theme = createTheme();

export default function SignInSide() {
    const [base64P12, setBase64P12] = useState(null);
    const [password, setPassword] = useState('');
    const [fileName, setFileName] = useState("");
    const [user, setUser] = useState({
        nameRu: '',
        nameKz: '',
        email: '',
        customerLegalAddress: '',
        phone: '',
        cellphone: '',
    });

    const handleFileSelect = async (event) => {
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
            const key = base64P12
            const response = await axios.post('http://localhost:8080/registration', {
                signature:{
                    key,
                    password
                },
                user});
            if (response.status === 200) {
                await router.push('/');
                console.log(response);
            }
        } catch (error) {
            alert('Ошибка: ' + error.message);
            console.error(error);
        }
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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
                <Grid  item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box style={{marginTop:"25px"}}
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography style={{marginBottom:"40px"}} component="h1" variant="h5">
                            Регистрация по ЭЦП
                        </Typography>
                        <Box component="form" noValidate  sx={{ mt: 1 }}>
                            <Grid container spacing={2} columns={16} style={{}}>
                                <div>
                                    <label className="input-file">
                                        <input accept=".p12" onChange={handleFileSelect}
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
                                <Grid item xs={8}>
                                    Наиминование на русском языке
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField id="outlined-basic"  required variant="outlined" size="small" value={user.nameRu}
                                               onChange={(event) =>
                                                   setUser({ ...user, nameRu: event.target.value })
                                               }/>
                                </Grid>
                                <Grid item xs={8}>
                                    Наиминование на государственном языке
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField id="outlined-basic" required variant="outlined" size="small" value={user.nameKz} onChange={(event) =>
                                        setUser({ ...user, nameKz: event.target.value })
                                    }/>
                                </Grid>
                                <Grid item xs={8}>
                                    Юридический адрес
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField id="outlined-basic"  required variant="outlined" size="small" value={user.customerLegalAddress}
                                               onChange={(event) =>
                                                   setUser({ ...user, customerLegalAddress: event.target.value })
                                               }/>
                                </Grid>
                                <Grid item xs={8}>
                                    Телефон
                                </Grid>
                                <Grid item xs={8}>
                                    <InputMask mask="+7 (999) 9999999" value={user.phone}
                                               onChange={(event) => setUser({ ...user, phone: event.target.value })}
                                    >{() => <TextField required size="small"/>}</InputMask>
                                </Grid>
                                <Grid item xs={8}>
                                    Сотовый телефон
                                </Grid>
                                <Grid item xs={8}>
                                    <InputMask mask="+7 999 9999999" value={user.cellphone}
                                               onChange={(event) => setUser({ ...user, cellphone: event.target.value })}
                                    >{() => <TextField required size="small"/>}</InputMask>
                                </Grid>
                                <Grid item xs={8}>
                                    Эл. почта
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField id="outlined-basic"  variant="outlined"   required size="small" value={user.email}
                                               onChange={(event) => setUser({ ...user, email: event.target.value })}/>
                                </Grid>
                            </Grid>

                            <Button
                                onClick={handleSubmit}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Регистрация
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        {"Уже есть аккаунт?"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}