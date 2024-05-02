import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import ToggleMenu from "./ToggleMenu";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import * as queryString from "querystring";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";


function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    const [requests, setRequests] = useState(['']);
    const [year, setYear] = useState(2023);
    const statusTexts = {
        0: 'Создано',
        1: 'Отправлено',
        2: 'Нет поставщиков по коду услуг',
        3: 'Нет поставщиков по КАТО',
        4: 'Недобросовестный поставщик',
    };
    const [statusText, setStatusText] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8080/requests?year=${year}&page=1`);
            setRequests(response.data.body);
        };
        fetchData();
    }, [year]);

    const handleYearChange = async (newYear) => {
        setYear(newYear);
    };

    const handleSend = async (id) => {
        try {
            await axios.post(`http://localhost:8080/requests/${id}/send`);
            alert(`Запрос ${id} успешно оправлен на почту!`);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <React.Fragment>
            <Title>Последние коммерческие предложения</Title>
            <Button onClick={() => handleYearChange(2022)}>2022</Button>
            <Button onClick={() => handleYearChange(2023)}>2023</Button>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Меню</TableCell>
                        <TableCell align="center">Код</TableCell>
                        <TableCell align="center">Код КАТО</TableCell>
                        <TableCell align="center">Дата начала работ</TableCell>
                        <TableCell align="center">Дата окончания работ</TableCell>
                        <TableCell align="center">Статус</TableCell>
                        <TableCell align="center">Дополнительные требования</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell component="th" scope="row">
                                <Button onClick={() => handleSend(request.id)}><ForwardToInboxIcon/>Отправить</Button>
                            </TableCell>
                            <TableCell align="center">{request.id}</TableCell>
                            <TableCell align="center">{request.katos}</TableCell>
                            <TableCell align="center">{request.startDate}</TableCell>
                            <TableCell align="center">{request.endDate}</TableCell>
                            <TableCell align="center" >{statusTexts[request.status] || 'Неизвестный статус'}</TableCell>
                            <TableCell align="center">{request.notes}</TableCell>
                            <TableCell align="center"><Link style={{cursor:"pointer"}}>{}</Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/*<Link color="primary" href="#" sx={{ mt: 3 }}>*/}
            {/*    Загрузить еще*/}
            {/*</Link>*/}
        </React.Fragment>
    );
}