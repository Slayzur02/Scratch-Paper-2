import styles from "./render-footer.module.css";
import { GiLotus } from "react-icons/gi";
import { FaEye } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

const FooterButton = ({ fn, title, children }) => {
  return (
    <button
      className={styles.footerButtons}
      onClick={() => {
        fn();
      }}
      title={title}
    >
      {children}
    </button>
  );
};

const DrawingFooter = (zenFn) => {
  return (
    <div className={styles.footerWrapper}>
      <IconContext.Provider value={{ size: "2em" }}>
        <FooterButton
          fn={() => {
            console.log("ZENN");
          }}
          title="Zen mode"
        >
          <GiLotus />
        </FooterButton>
      </IconContext.Provider>
    </div>
  );
};

export default DrawingFooter;
