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

    function removeMethod(name: string) {
        setFocus(true);
        delete props.data.scouting[name]
        props.setData(props.data);
        // idk what the fuck is happening here but just trust
        setTimeout(() => setFocus(false), 0);
    }

    return <>
        <div className={styles.title}>
            <div onClick={() => {props.setPage("year");}}><svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.back}>
                <path d="M2.31234 13.5756C0.3634 12.4116 0.363405 9.58844 2.31235 8.42441L15.2117 0.720152C17.2114 -0.474169 19.75 0.966562 19.75 3.29574V18.7043C19.75 21.0334 17.2114 22.4742 15.2117 21.2798L2.31234 13.5756Z" fill="black"/>
            </svg></div>

            <h1>SUSHI SCOUTS</h1>
        </div>

        <article className={styles.methods}>
            <div className={styles.grey}></div>
            <div className={styles.black}></div>

            <section className={styles.list}>
                {
                    Object.keys(props.data.scouting).map(key => {
                        return <div className={styles.method} key={key}>
                            <p onClick={() => props.setPage("scoutingmethod." + key)}>{key}</p>
                            <svg width="30" height="8" viewBox="0 0 30 8" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => removeMethod(key)}>
                                <rect width="7.57908" height="29.9933" rx="3.78954" transform="matrix(0.000882343 -1 1 0.000200108 0 7.5791)" fill="#FF729F"/>
                            </svg>
                        </div>
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