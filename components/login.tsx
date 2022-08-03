import { NextPage } from "next";
import Link from "next/link";
import { useRef, useState } from "react";
import styles from '../styles/components/Login.module.css'

const Header: NextPage = () => {
    const [mode, setMode] = useState("login");
    const [teamNum, setTeamNum] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    async function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        console.log(teamNum);
        const res = await fetch(`/api/${mode == "login" ? "login" : "signup"}`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"num" : teamNum, "pass" : password}),
        });

        if (!res.ok) {
            setErr((await res.json()).error);
            setTimeout(() => setErr(""), 2000);
        }
    }

    return <section className={styles.login}>
        <div></div>
        <form onSubmit={handleSubmit}>
            <input placeholder="TEAM #" required value={teamNum} onChange={(curr) => setTeamNum(curr.target.value)}/>
            <input placeholder="PASSWORD" required type="password" value={password} onChange={(curr) => setPassword(curr.target.value)}/>
            <button>{mode == "create" ? "CREATE" : "LOGIN"}</button>
            <p onClick={() => {setMode(mode === "create" ? "login" : "create")}}>{mode === "create" ? "LOGIN" : "CREATE ACCOUNT"}</p>
            <h6 className={err.length !== 0 ? "err" : ""}>{err.length == 0 ? "Password storage is not secure. DO NOT use a sensitive password" : err}</h6>
        </form>
    </section>
};

export default Header;