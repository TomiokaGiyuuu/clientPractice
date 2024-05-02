import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
    FormGroup, InputAdornment,
    InputLabel,
    OutlinedInput,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableHead,
    TableRow
} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {styled} from "@mui/material/styles";
import {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {router} from "next/client";
import InputMask from "react-input-mask";

const StyledTableCell = styled(TableCell)(({ theme: theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export default function CommercialOffer() {
    const {link} = router.query;
    const [formData, setFormData] = useState({
        key: '',
        password: '',
        supplierPhone: '',
        supplierLocation: '',
        requestItemId: '',
        ndspayer: true,
        notes: '',
        nameForm: '',
        unit: '',
        count: '',
        pricePerUnit: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const key64 = base64P12;
            const response = await axios.post(`http://localhost:8080/offers/${link}`, {
                signature: {
                    key: key64,
                    password: formData.password
                },
                offer: {
                    supplierPhone: formData.supplierPhone,
                    supplierLocation: formData.supplierLocation,
                    items: [
                        {
                            requestItemId: offerData.items[0].requestItemId,
                            ndspayer: true,
                            notes: formData.notes,
                            units: [
                                {
                                    name: formData.nameForm,
                                    unit: formData.unit,
                                    count: formData.count,
                                    pricePerUnit: formData.pricePerUnit
                                }
                            ]
                        }
                    ]
                }
            });
            if (response.status === 200){
                window.location.href = `http://localhost:8080/offers/${link}/view/pdf`;
                console.log(response);
            }
        } catch (error) {
            alert('Ошибка: ' + error.message);
            console.error(error);
            console.log(formData)
        }
    };

    const [offerData, setOfferData] = useState(null);

    useEffect(() => {
        const fetchOfferData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/offers/${link}`);
                setOfferData(response.data.body);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOfferData();
    }, [link]);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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

    return (
        <React.Fragment>

            <Grid container spacing={2} columns={16}>
                <Grid item xs={4}>
                    Дата начала выполнения работ/оказания услуг
                </Grid>
                    {offerData && (
                <Grid item xs={4}>
                    <TextField
                        InputProps={{
                        readOnly: true,
                    }} value={offerData.startDate} variant="outlined" />
                </Grid>
                        )}
                <Grid item xs={4}>
                    Наиминование юр.лица/физ.лица/ИП (поставщика)
                </Grid>
                <Grid item xs={4}>
                    <TextField   label="" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    Дата оканчания выполнения работ/оказания услуг
                </Grid>
                <Grid item xs={4}>
                    {offerData && (
                        <TextField InputProps={{
                            readOnly: true,
                        }}  value={offerData.endDate} variant="outlined" />
                    )}
                </Grid>
                <Grid item xs={4}>
                    Телефон поставщика
                </Grid>
                <Grid item xs={4}>
                    <InputMask mask="+7 999 9999999" value={formData.supplierPhone}
                               onChange={(event) =>
                                   setFormData({ ...formData, supplierPhone: event.target.value })
                               }
                    >{() => <TextField required/>}</InputMask>

                </Grid>
                <Grid item xs={4}>
                    БИН заказчика
                </Grid>
                <Grid item xs={4}>
                    {offerData && (
                        <TextField InputProps={{
                            readOnly: true,
                        }}  value={offerData.clientBiin} variant="outlined" />
                    )}
                </Grid>
                <Grid item xs={4}>
                    БИН/ИИН поставщика
                </Grid>
                <Grid item xs={4}>
                    <TextField  variant="outlined" />
                </Grid>

                <Grid item xs={4}>
                    Наиминование заказчика
                </Grid>
                <Grid item xs={4}>
                    {offerData && (
                        <TextField InputProps={{
                            readOnly: true,
                        }}  value={offerData.clientName} variant="outlined" />
                    )}
                </Grid>
                <Grid item xs={4}>
                    Адрес поставщика
                </Grid>
                <Grid item xs={4}>
                    <TextField value={formData.supplierLocation}
                               onChange={(event) =>
                                   setFormData({ ...formData, supplierLocation: event.target.value })
                               }  label="" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    Код КАТО
                </Grid>
                <Grid item xs={4}>
                    {offerData && (
                    <TextField InputProps={{
                        readOnly: true,
                    }} value={offerData.katos} variant="outlined" />
                        )}
                </Grid>

            </Grid>

            <FormGroup style={{marginBottom:"30px"}}>
                <FormControlLabel control={<Checkbox/>} label="Поставщик является плательщиком НДС" />
            </FormGroup>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Наименоваие</StyledTableCell>
                        <StyledTableCell align="center">Ед. измерения</StyledTableCell>
                        <StyledTableCell align="center">Кол-во, объем</StyledTableCell>
                        <StyledTableCell align="center">Цена за ед., тенге без НДС</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center"><TextField value={formData.nameForm}
                                                                 onChange={(event) =>
                                                                     setFormData({ ...formData, nameForm: event.target.value })
                                                                 }  variant="outlined"/></TableCell>
                            <TableCell align="center"><TextField value={formData.unit}
                                                                 onChange={(event) =>
                                                                     setFormData({ ...formData, unit: event.target.value })
                                                                 } variant="outlined"/></TableCell>
                            <TableCell align="center"><TextField value={formData.count}
                                                                 onChange={(event) =>
                                                                     setFormData({ ...formData, count: event.target.value })
                                                                 }  variant="outlined"/></TableCell>
                            <TableCell align="center"><TextField value={formData.pricePerUnit}
                                                                 onChange={(event) =>
                                                                     setFormData({ ...formData, pricePerUnit: event.target.value })
                                                                 } variant="outlined"/></TableCell>

                        </TableRow>

                </TableBody>
            </Table>
            Примечание
            <TextField value={formData.notes}
                       onChange={(event) =>
                           setFormData({ ...formData, notes: event.target.value })
                       }  fullWidth multiline/>
            <FormGroup>
                <FormControlLabel control={<Checkbox/>} label="Настоящим подтверждается право потенциального поставщика участвовать в государственных закупках в соответствии со ст. 6 Закона Республики Казахстан от 4 декабря 2015 года № 434-V ЗРК «О Государственных закупках», а также соответствие потенциального поставщика квалификационным требованиям, предъявляемым в соответствии со ст. 9 вышеуказанного Закона" />
            </FormGroup>
            <div style={{display:"flex", flexDirection:"column", marginTop:"30px"}}>
            <label style={{marginLeft:"10px"}} className="input-file">
                <input accept=".p12" onChange={handleFile}
                       type="file" />
                <span className="input-file-btn">Выберите файл</span>
                <span className="input-file-text">{fileName}</span>
            </label>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(event) =>
                        setFormData({ ...formData, password: event.target.value })
                    }
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
            <Button style={{marginTop:"50px"}} variant="contained" onClick={handleSubmit}>Отправить</Button>

        </React.Fragment>
    );
}
// "{"signature":{"key":"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","password":"Aa2002"},
// "offer":{"supplierPhone":"+7 777 7777777","supplierLocation":"new","items":[{"requestItemId":"5","ndspayer":true,"notes":"252","units":[{"name":"вап","unit":"услгу","count":"2","pricePerUnit":"6555"}]}]}}"