import styles from "./page.module.css";
import '@ant-design/v5-patch-for-react-19';

import WrappedNormalLoginForm  from "../components/Form/form.js"


export default function Home() {
  return (
    <div className = {styles.backgroundContainer}>
      <div className = {styles.forms}>
        <div className = {styles.formsContainer}>
          <WrappedNormalLoginForm />
          <div className = {styles.formsLogoContainer} />
        </div>
        <div className = {styles.formsImageContainer} />
      </div>
    </div>
  );
}
