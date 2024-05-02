import styles from "./product.module.css";

const Products = ({ result }) => {
    return (
        <>
            <section className={styles['card-container']}>{result}</section>
        </>
    );
};

export default Products;
