import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { ConfigFile } from "../../../util/configfile";
import styles from "../../../styles/components/configfilepages/Method.module.css";
import NewPage from "./newpage";

type PropsData = {
    data: ConfigFile,
    setData: Function,
    setPage: Function,
    method: string
};

const ScoutingMethods: NextPage<PropsData> = (props: PropsData) => {
    const [newPage, setNewPage] = useState<boolean>(Object.keys(props.data.scouting[props.method]).length === 0);

    useEffect(() => {
        console.log(props.data.scouting[props.method]);
    }, []);

    function goBack() {
        if (Object.keys(props.data.scouting[props.method]).length !== 0) {
            setNewPage(false);
        }
    }

    return <>
        <section className={styles.title}>
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.back} onClick={() => props.setPage("Sushi Scouts")}>
                <path d="M2.31234 13.5756C0.3634 12.4116 0.363405 9.58844 2.31235 8.42441L15.2117 0.720152C17.2114 -0.474169 19.75 0.966562 19.75 3.29574V18.7043C19.75 21.0334 17.2114 22.4742 15.2117 21.2798L2.31234 13.5756Z" fill="black"/>
            </svg>

            <h1>{props.method}</h1>
        </section>

        <section className={styles.pageSelector}>

        </section>
        { newPage && <NewPage data={props.data} setData={props.setData} method={props.method} back={goBack}/>}
    </>
};

export default ScoutingMethods;