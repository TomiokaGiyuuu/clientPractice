import styles from "./Product/product.module.css";

const Card = ({ nameRu, nameKz, lotNumber, customerBin, descriptionRu, descriptionKz }) => {
    return (
        <>
            <section className={styles.card}>
                <div className={styles["card-details"]}>
                    <h3 className={styles["card-title"]}>{`Номер лота: ${lotNumber}`}</h3>
                    <h3 className={styles["card-title"]}>{`Название на русском: ${nameRu}`}</h3>
                    <h3 className={styles["card-title"]}>{`Название на казахском: ${nameKz}`}</h3>
                    <h3 className={styles["card-title"]}>{`БИН: ${customerBin}`}</h3>

                </div>
            </section>
        </>
    );
};

export default Card;
