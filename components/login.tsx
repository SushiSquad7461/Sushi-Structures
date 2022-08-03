import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import styles from '../styles/components/Login.module.css'

const Header: NextPage = () => {
    const [mode, setMode] = useState("login");

    return <section className={styles.login}>
        <div></div>
        <form>
            <input placeholder="TEAM #" required/>
            <input placeholder="PASSWORD" required type="password"/>
            <button>{mode == "create" ? "CREATE" : "LOGIN"}</button>
            <p onClick={() => {setMode(mode == "create" ? "login" : "create")}}>{mode == "create" ? "LOGIN" : "CREATE ACCOUNT"}</p>
            <h6>Password storage is not secure. DO NOT use a sensitive password</h6>
        </form>
    </section>
};

export default Header;