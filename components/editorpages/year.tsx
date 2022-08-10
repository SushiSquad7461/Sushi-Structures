import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { ConfigFile } from "../../util/configfile";
import styles from "../../styles/components/configfilepages/Year.module.css";

type PropsData = {
    data: ConfigFile,
    setData: Function,
    setPage: Function,
};

const Year: NextPage<PropsData> = (props: PropsData) => {
    const [year, setYear] = useState<Number>(props.data.year);

    function changeYear(event: any) {
        setYear(event.target.value);
        props.data.year = (event.target.value);
        props.setData(props.data);
    }

    return <>
        <article className={styles.select}>
            <section className={styles.left} onClick={() => props.setPage("Sushi Scouts")}>
                <p>SUSHI SCOUTS</p>
            </section>

            <section className={styles.center}>
                <p>SUSHI SUPERVISE</p>
            </section>

            <section className={styles.right}>
                <p>SUSHI STRAT</p>
            </section>
        </article>

        <article className={styles.year}>
            <div className={styles.grey}></div>
            <div className={styles.black}></div>
            <input placeholder="YEAR" onChange={changeYear} value={props.data.year.toString()}/>

            <div className={styles.text}>
                <div><p>PASSWORD:</p><h6>{props.data.password}</h6></div>
                <div><p>VERSION:</p><h6>{props.data.version.toString()}</h6></div>
            </div>
            <button>SUBMIT FILE</button>
        </article>
    </>
};

export default Year;