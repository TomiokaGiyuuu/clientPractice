import * as React from 'react';
import Typography from '@mui/material/Typography';

import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import styles from "/styles/component.module.css"
import Card from "./Card";
import {LotsData} from "../data/lotsData";
import {useState} from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navigation from "./Navigation";
import Products from "./Product/Products";

const Lots = () => {
    const lots = LotsData;

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [lotNumberFilter, setLotNumberFilter] = useState({ from: "", to: "" });

    // ----------- Input Filter -----------
    const [query, setQuery] = useState("");

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const filteredItems = lots.filter(
        (product) => product.nameRu.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

    // ----------- Radio Filtering -----------
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleLotNumberFilter = (priceFilter) => {
        setLotNumberFilter(priceFilter);
    };

    // ------------ Button Filtering -----------
    const handleClick = (event) => {
        setSelectedCategory(event.target.value);
    };

    function filteredData(products, selected, query) {
        let filteredProducts = products;

        // Filtering Input Items
        if (query) {
            filteredProducts = filteredItems;
        }

        // Applying selected filter
        if (selected) {
            filteredProducts = filteredProducts.filter(
                ({ id, lotNumber, nameRu, customerBin }) =>
                    id === selected ||
                    lotNumber === selected ||
                    nameRu === selected ||
                    customerBin === selected
            );
        }

        if (lotNumberFilter.from && lotNumberFilter.to) {
            filteredProducts = filteredProducts.filter(
                (product) => product.lotNumber >= lotNumberFilter.from && product.lotNumber <= lotNumberFilter.to
            );
        }

        return filteredProducts.map(
            ({  id, lotNumber, nameRu, nameKz, descriptionRu, descriptionKz, customerBin }) => (
                <Card
                    key={id}
                    lotNumber={lotNumber}
                    nameRu={nameRu}
                    nameKz={nameKz}
                    descriptionRu={descriptionRu}
                    descriptionKz={descriptionKz}
                    customerBin={customerBin}
                />
            )
        );
    }

    const result = filteredData(lots, selectedCategory, query);

    return (
        <>
            <div className={styles.headerBack}>
                <div className={styles.headerInside}>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Лоты
                    </Typography>
                    <Button color="inherit" href={"/"}><ExitToAppIcon/>Выход</Button>
                </div>
            </div>
            <Sidebar handleChange={handleLotNumberFilter} />
            <Navigation query={query} handleInputChange={handleInputChange} />
            <div>
                <Products result={result} />
            </div>
        </>
    );
};

export default Lots;
