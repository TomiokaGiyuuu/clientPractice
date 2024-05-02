import Button from "@mui/material/Button";
import React, {useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import CreateCommercialOffer from "./CreateCommercialOffer";
import {Autocomplete, TextField} from "@mui/material";

export default function (){
    // const [searchTerm, setSearchTerm] = useState("");
    // const [results, setResults] = useState([]);
    // const [selectedCode, setSelectedCode] = useState("");
    // const handleSearch = async () => {
    //     try {
    //         const response = await axios.get(
    //             `http://localhost:8080/kato/getByName?search=${searchTerm}`
    //         );
    //         setResults(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    //
    // const handleCodeClick = (code) => {
    //     setSelectedCode(code);
    // };

    const [options, setOptions] = useState([]);
    const [selectedCode, setSelectedCode] = useState('');

    const handleSearch = async (event, value) => {
        const response = await axios.get(`http://localhost:8080/kato/getByName?search="${value}"`);
        const data = response.data;
        setOptions(data);
    };

    const handleCodeSelect = (event, value) => {
        setSelectedCode(value.code);
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return(
        <div>
            <Button onClick={handleOpenDialog} style={{marginBottom:"30px"}}>Добавить место выполнения работ/оказания услуг</Button>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Добавить место выполнения работ/оказания услуг</DialogTitle>
                <DialogContent>
                    <div>
                        {/*<TextField*/}
                        {/*    type="text"*/}
                        {/*    value={searchTerm}*/}
                        {/*    onChange={(e) => setSearchTerm(e.target.value)}*/}
                        {/*/>*/}
                        {/*<Button onClick={handleSearch}>Поиск</Button>*/}

                        {/*<ul>*/}
                        {/*    {results.map((result) => (*/}
                        {/*        <li key={result.id} onClick={() => handleCodeClick(result.code)}>*/}
                        {/*            {result.fullNameRu}*/}
                        {/*        </li>*/}
                        {/*    ))}*/}
                        {/*</ul>*/}
                        {/*Код КАТО*/}
                        {/*<input type="text" value={selectedCode} />*/}

                        <Autocomplete
                            style={{margin:"20px 0"}}
                            options={options}
                            getOptionLabel={(option) => option.nameRu}
                            renderInput={(params) => <TextField {...params} label="Поиск" />}
                            onChange={handleCodeSelect}
                            onInputChange={handleSearch}
                        />
                        <TextField label="Код КАТО" value={selectedCode} />

                    </div>

                </DialogContent>
                <DialogActions>
                    <Button color="primary">
                        Сохранить
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}