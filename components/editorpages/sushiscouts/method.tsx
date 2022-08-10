import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { ConfigFile } from "../../../util/configfile";
import styles from "../../../styles/components/configfilepages/Method.module.css";
import NewPage from "./newpage";
import Page from "./page";

type PropsData = {
    data: ConfigFile,
    setData: Function,
    setPage: Function,
    method: string
};

const ScoutingMethods: NextPage<PropsData> = (props: PropsData) => {
    const [newPage, setNewPage] = useState<boolean>(Object.keys(props.data.scouting[props.method]).length === 0);
    const [currPage, setCurrPage] = useState<string>(Object.keys(props.data.scouting[props.method]).length === 0 ? "" : Object.keys(props.data.scouting[props.method])[(Object.keys(props.data.scouting[props.method]).length)-1]);

    function goBack() {
        if (Object.keys(props.data.scouting[props.method]).length !== 0) {
            setNewPage(false);
            setCurrPage(Object.keys(props.data.scouting[props.method])[(Object.keys(props.data.scouting[props.method]).length)-1]);
        }
    }

    useEffect(() => {
        console.log(currPage);
    }, [currPage]);

    function remove(name: string) {
        setNewPage(true);
        delete props.data.scouting[props.method][name];
        props.setData(props.data);
        setCurrPage(Object.keys(props.data.scouting[props.method]).length === 0 ? "" : Object.keys(props.data.scouting[props.method])[0]);
        setTimeout(() => {if(Object.keys(props.data.scouting[props.method]).length !== 0) { setNewPage(false); }}, 0);
    }

    return <>
        <section className={styles.title}>
            <div onClick={() => {props.setPage("Sushi Scouts");}}><svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.back}>
                <path d="M2.31234 13.5756C0.3634 12.4116 0.363405 9.58844 2.31235 8.42441L15.2117 0.720152C17.2114 -0.474169 19.75 0.966562 19.75 3.29574V18.7043C19.75 21.0334 17.2114 22.4742 15.2117 21.2798L2.31234 13.5756Z" fill="black"/>
            </svg></div>

            <h1>{props.method}</h1>
        </section>

        <section className={styles.pageSelector}> 
            {
                Object.keys(props.data.scouting[props.method]).map((key, i) => {
                    return <p key={key} onClick={() => setCurrPage(key)} onDoubleClick={() => remove(key)}>P{i+1}</p>
                })
            }
            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => { setNewPage(true); console.log("hello")}}>
                <rect width="7.57908" height="29.9968" rx="3.78954" transform="matrix(0.000588272 -1 1 0.000300139 0 18.5259)" fill="#4F4F4F"/>
                <rect x="18.8632" y="30" width="7.62126" height="30" rx="3.81063" transform="rotate(-180 18.8632 30)" fill="#4F4F4F"/>
            </svg>
        </section>

        { !newPage && <Page data={props.data} setData={props.setData} method={props.method} page={currPage}/> }

        { newPage && <NewPage data={props.data} setData={props.setData} method={props.method} back={goBack}/>}
    </>
};

export default ScoutingMethods;