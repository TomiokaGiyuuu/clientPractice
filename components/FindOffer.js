import Button from "@mui/material/Button";
import React, {useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";

export default function (){
    const [disableFirstRadio, setDisableFirstRadio] = useState(false);
    const [disableSecondTextField, setDisableSecondTextField] = useState(false);

    const [showTable, setShowTable] = useState(false);

    const handleShowTableButtonClick = () => {
        setShowTable(true);
    };

    const handleHideTableButtonClick = () => {
        setShowTable(false);
    };

    const handleRadioChange = (event) => {
        const value = event.target.value === 'nameoffer';
        setDisableSecondTextField(value);
        setDisableFirstRadio(!value);
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return(
        <div>
            <Button onClick={handleOpenDialog} >Добавить работы/услуги</Button>
            <Dialog open={openDialog} maxWidth={"sm"} onClose={handleCloseDialog}>
                <DialogTitle>Поиск работ/услуг</DialogTitle>
                <DialogContent className="dialog">
                        <FormControl >
                            <RadioGroup onChange={handleRadioChange}>
                                <Grid style={{margin:"5px 0"}} container spacing={2}>
                                    <Grid item xs={6}>
                                        <FormControlLabel value="nameoffer" control={<Radio />} label="Наименование работ/услуг" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="outlined-basic" disabled={disableFirstRadio} label="" variant="outlined" />
                                    </Grid>
                                </Grid>
                                <Grid style={{margin:"5px 0"}}  container spacing={2}>
                                    <Grid item xs={6}>
                                        <FormControlLabel value="codeoffer" control={<Radio />} label="Код работ/услуг" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="outlined-basic" label=""
                                                   disabled={disableSecondTextField} variant="outlined" />
                                    </Grid>
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    <Grid style={{margin:"0px"}} container spacing={2}>
                        <Grid item xs={6}>
                            Вид работ и услуг
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={typesofoffer}
                                sx={{ width: 210 }}
                                renderInput={(params) => <TextField {...params} label="" />}
                            />
                        </Grid>
                    </Grid>
                    {showTable && (
                        <Table size="small" style={{marginTop:"20px"}}>
                        <TableHead>
                            <TableRow >
                                <TableCell align="center" style={{fontSize:"12px"}}>Код работ/услуг</TableCell>
                                <TableCell align="center" style={{fontSize:"12px"}}>Наиминование работ/услуг</TableCell>
                                <TableCell align="center" style={{fontSize:"12px"}}>Характеристика работ/услуг</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" style={{fontSize:"12px"}}>016110.510.000001</TableCell>
                                <TableCell align="center" style={{fontSize:"12px"}}>Услуги по обработке территорий, зданий, сооружений аналогичных объектов ядохимикатами</TableCell>
                                <TableCell align="center" style={{fontSize:"12px"}}>Услуги по обработке территорий, зданий, сооружений аналогичных объектов ядохимикатами</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                        )}
                </DialogContent>
                <DialogActions>
                    {showTable ? (
                        <div>
                        <Button color="primary" onClick={handleHideTableButtonClick}>
                            Отмена
                        </Button>
                        <Button onClick={() => {
                            handleHideTableButtonClick();
                            handleCloseDialog();
                        }} color="primary">
                            Сохранить
                        </Button>
                        </div>
                    ) : (
                        <div>
                            <Button color="primary" onClick={handleShowTableButtonClick}>
                                Поиск
                            </Button>
                            <Button onClick={handleCloseDialog} color="primary">
                                Отмена
                            </Button>
                        </div>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    )
}

const cities = [
    { label: 'Район Алматы'},
    { label: 'Район Есиль'},
    { label: 'Район Сарыарка'},
    { label: 'Район Байконыр'},
    { label: 'Г.Астана'}
];
const typesofoffer = [
    { label: 'Работы'},
    { label: 'Услуги'},
    { label: 'Учесть всё'},
];