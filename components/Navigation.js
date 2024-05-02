import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import styles from "../styles/component.module.css";

const Navigation = ({ handleInputChange, query }) => {
    return (
        <div className={styles.nav}>
            <div className="nav-container">
                <input
                    className={styles.input}
                    type="text"
                    onChange={handleInputChange}
                    value={query}
                    placeholder="Поиск по названию..."
                />
            </div>
        </div>
    );
};

export default Navigation;
