import { Button } from "antd";
import { Link } from "react-router-dom";
import { LIGHT2, OVERLAY, OVERLAY_SECONDARY } from "../../reusables/constants";
import styles from "./Landing.module.css";
const Landing = () => {
  return (
    <div>
      <div className={styles.menuWrap}>
        <input type="checkbox" className={styles.toggler} />
        <div
          className={styles.hamburger}
          style={{ background: OVERLAY_SECONDARY }}
        >
          <div></div>
        </div>
        <div className={styles.menu}>
          <div>
            <div>
              <ul>
                <li>
                  <Link to="/"> Home</Link>
                </li>
                <li>
                  <Link to="/login">Get Started</Link>
                </li>
                <li>
                  <Link to="/">Contact</Link>
                </li>
                <li>
                  <Link to="/">FAQ</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <header className={styles.showcase} style={{ background: OVERLAY }}>
        <div className={`${styles.container} ${styles.showcaseInner}`}>
          <h1 style={{ color: LIGHT2 }}>Welcome to PICT Virtual Lab</h1>
          <p>
            This is the virtual lab portal of PICT where you can get to known
            everything related to labs and assignments. Login to get access to
            this portal.
          </p>
          <Link to="/login">
            <Button type="default">Get Started</Button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Landing;
