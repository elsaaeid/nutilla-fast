import styles from "../styles/Add.module.css";
import { WithRole } from "../protect/AuthGate";

const AddButton = ({ setClose }) => {
  return (
    <WithRole roles={["admin"]}>
      <div onClick={() => setClose(false)} className={styles.mainAddButton}>
        Add New nutella
      </div>
    </WithRole>
  );
};

export default AddButton;