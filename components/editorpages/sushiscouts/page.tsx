import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { ConfigFile } from "../../../util/configfile";
import styles from "../../../styles/components/configfilepages/Page.module.css";
import NewSection from "./newsection";

type PropsData = {
    data: ConfigFile,
    setData: Function,
    method: string,
    page: string,
};

const Page: NextPage<PropsData> = (props: PropsData) => {
    const [addSection, setAddSection] = useState<boolean>(false);

    function goBack() {
        setAddSection(false);
    }

    return <section className={styles.page}>
        <h1>{props.page}</h1>

        <section className={styles.sections}>
            <article onClick={() => setAddSection(true)}> 
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="5.05272" height="19.997" rx="2.52636" transform="matrix(0.000882409 -1 1 0.000200093 0 12.3506)" fill="#56CBF9"/>
                    <rect x="12.5752" y="20" width="5.08062" height="20" rx="2.54031" transform="rotate(-180 12.5752 20)" fill="#56CBF9"/>
                </svg>
                <p>ADD SECTION</p>
            </article>
        </section>

        <article>
            <div className={styles.black}></div>
            <div className={styles.grey}></div>
        </article>

        {addSection && <NewSection data={props.data} method={props.method} page={props.page} setData={props.setData} back={goBack}/>}

        <p>FOOTER : {props.data.scouting[props.method][props.page].footer === "" ? "BLANK" : props.data.scouting[props.method][props.page].footer}</p>
    </section>
};

export default Page;