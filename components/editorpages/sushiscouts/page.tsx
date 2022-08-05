import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { ConfigFile } from "../../../util/configfile";
import styles from "../../../styles/components/configfilepages/Page.module.css";

type PropsData = {
    data: ConfigFile,
    setData: Function,
    method: string,
    page: string,
};

const NewPage: NextPage<PropsData> = (props: PropsData) => {
    return <section className={styles.page}>
        <h1>{props.page}</h1>
        <p>FOOTER : {props.data.scouting[props.method][props.page].footer === "" ? "BLANK" : props.data.scouting[props.method][props.page].footer}</p>
    </section>
};

export default NewPage;