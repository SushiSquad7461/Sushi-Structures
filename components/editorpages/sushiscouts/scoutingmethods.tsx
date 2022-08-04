import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { ConfigFile } from "../../../util/configfile";
import styles from "../../../styles/components/configfilepages/ScoutingMethods.module.css";

type PropsData = {
    data: ConfigFile,
    setData: Function,
    setPage: Function,
};

const ScoutingMethods: NextPage<PropsData> = (props: PropsData) => {
    const [year, setYear] = useState<Number>(props.data.year);
    const [newMethodName, setNewMethodName] = useState("");
    const [focus, setFocus] = useState<boolean>(false);

    function changeYear(event: any) {
        setYear(event.target.value);
        props.data.year = (event.target.value);
        props.setData(props.data);
    }

    function turnOnFocus() {
        document.getElementById("focus")?.focus();
        setFocus(true);
        setNewMethodName("");
    }

    function newMethod(event: any) {
        event.preventDefault();
        console.log(newMethodName);
        props.data.scouting[newMethodName] = {};
        props.setData(props.data);
        setFocus(false);
    }

    return <>
        <h1 className={styles.title}>SUSHI SCOUTS</h1>
        <article className={styles.methods}>
            <div className={styles.grey}></div>
            <div className={styles.black}></div>

            <section className={styles.list}>
                {
                    Object.keys(props.data.scouting).map(key => {
                        return <p onClick={() => props.setPage("scoutingmethod." + key)} key={key}>{key}</p>
                    })
                }

                {focus && <form onSubmit={newMethod}><input autoFocus id="focus" value={newMethodName} onChange={event => setNewMethodName(event.target.value)}/></form>}

                <div>
                    <p>METHOD 
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={turnOnFocus}>
                        <rect width="7.57908" height="29.9933" rx="3.78954" transform="matrix(0.000882343 -1 1 0.000200108 0 18.5259)" fill="white"/>
                        <rect x="18.8608" y="30" width="7.62036" height="30" rx="3.81018" transform="rotate(-180 18.8608 30)" fill="white"/>
                        </svg>
                    </p>
                </div>
            </section>
        </article>
    </>
};

export default ScoutingMethods;