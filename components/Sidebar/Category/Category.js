import styles from "./Category.module.css";
import Input from "../../Input";

function Category({ handleChange }) {
  return (
      <div>
        <h2 className={styles["sidebar-title"]}>Category</h2>

        <div>
          <label className={styles["sidebar-label-container"]}>
            <input onChange={handleChange} type="radio" value="" name="test" />
            <span className={styles.checkmark}></span>All
          </label>
          <Input
              handleChange={handleChange}
              value="sneakers"
              title="Sneakers"
              name="test"
          />
          <Input
              handleChange={handleChange}
              value="flats"
              title="Flats"
              name="test"
          />
          <Input
              handleChange={handleChange}
              value="sandals"
              title="Sandals"
              name="test"
          />
          <Input
              handleChange={handleChange}
              value="heels"
              title="Heels"
              name="test"
          />
        </div>
      </div>
  );
}

export default Category;
