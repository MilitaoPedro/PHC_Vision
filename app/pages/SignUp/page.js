import '@ant-design/v5-patch-for-react-19';
import styles from "./page.module.css";
import WrappedRegistrationForm  from "../../../components/SignUpForm/signUpForm.js"

export default function SignUp(){
    return (
        <div className = {styles.backgroundContainer}>
            <div className = {styles.forms}>
                <div className = {styles.formsImageContainer} />
                <div className = {styles.formsContainer}>
                    <div className = {styles.formsLogoContainer} />
                    <WrappedRegistrationForm />
                </div>
            </div>
        </div>
    )
}
