import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import {Autocomplete, TextField} from "@mui/material";
import AddPlace from "./AddPlace";
import FindOffer from "./FindOffer";
import axios from "axios";
import {router} from "next/client";
import { useHistory } from 'react-router-dom';


export default function CreateCommercialOffer({kato}){
    const [openDialog, setOpenDialog] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [notes, setNotes] = useState("");
    const [katos, setKatos] = useState("");
    const [code, setCode] = useState("");
    const [options, setOptions] = useState([]);

    const handleSearch = async (event, value) => {
        const response = await axios.get(`http://localhost:8080/kato/getByName?search="${value}"`);
        const data = response.data;
        setOptions(data);
    };

    const handleCodeSelect = (event, value) => {
        setKatos(value.code);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestData = {
            startDate,
            endDate,
            notes,
            katos: [katos],
            items: [{ code }],
        };

        try {
            const response = await axios.post('http://localhost:8080/requests', requestData);
            if (response.status === 200) {
                history.go(0);
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
        console.log(requestData);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }


    return(
        <div>
            <Button variant="contained" onClick={handleOpenDialog} style={{marginLeft:"70px", marginTop:"30px"}}>
                Новый запрос коммерческого предложения
            </Button>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth={"md"}>
                <DialogTitle>Запрос коммерческого предложения</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} style={{marginBottom:"20px"}}>
                        <Grid item xs>
                            Дата начала выполнения работ/оказания услуг
                        </Grid>
                        <Grid item xs>
                            <input style={{height:"50px", width:"200px", fontSize:"20px"}} type="date" value={startDate}
                                   onChange={(event) => setStartDate(event.target.value)}/>
                        </Grid>
                        <Grid item xs>
                            Дата окончания выполнения работ/оказания услуг
                        </Grid>
                        <Grid item xs>
                            <input style={{height:"50px", width:"200px", fontSize:"20px"}} type="date" value={endDate}
                                   onChange={(event) => setEndDate(event.target.value)}/>
                        </Grid>
                    </Grid>

                    <Autocomplete
                        style={{margin:"20px 0"}}
                        options={options}
                        getOptionLabel={(option) => option.nameRu}
                        renderInput={(params) => <TextField {...params} label="Добавить место выполнения работ/оказания услуг" />}
                        onChange={handleCodeSelect}
                        onInputChange={handleSearch}
                    />
                    <TextField label="Код КАТО" value={katos} onChange={(event) => setKatos(event.target.value)} />

                    <Grid container spacing={3} style={{margin:"2px 0"}}>
                        <Grid item xs>
                            Код работ/услуг
                        </Grid>
                        <Grid item xs>
                        </Grid>
                        <Grid item xs>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} >
                        <Grid item xs style={{margin:"0 10px"}}>
                            <TextField
                                value={code}
                                onChange={(event) => setCode(event.target.value)}
                            />
                        </Grid>

                    </Grid>
                    Дополнительные функциональные, технические, качественные и эксплуатационные характеристики работ/услуг
                    <TextField fullWidth  value={notes}
                               onChange={(event) => setNotes(event.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}  color="primary">
                        Сохранить
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}