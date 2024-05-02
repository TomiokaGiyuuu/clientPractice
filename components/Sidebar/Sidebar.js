import Category from "./Category/Category";
import Price from "./Price/Price";
import Colors from "./Colors/Colors";
import styles from "./Sidebar.module.css";

const Sidebar = ({ handleChange }) => {
  return (
      <>
        <section className={styles.sidebar}>
          <div className={styles["logo-container"]}>
            <h1>Фильтры</h1>
          </div>
          <Price onFilterChange={handleChange} />
        </section>
      </>
  );
};

export default Sidebar;
