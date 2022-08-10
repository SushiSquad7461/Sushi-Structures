import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { ConfigFile } from "../../../util/configfile";
import styles from "../../../styles/components/configfilepages/EditComponent.module.css";

type PropsData = {
    data: ConfigFile,
    setData: Function,
    method: string,
    page: string,
    section: number,
    index: number,
    goBack: Function,
};

const EditComponent: NextPage<PropsData> = (props: PropsData) => {
    const [name, setName] = useState<string>("");
    const [component, setComponent] = useState<string>("");
    const [required, setRequired] = useState<boolean>(false);
    const [timestamp, setTimestamp] = useState<boolean>(false);

    useEffect(() => {
        const component = props.data.scouting[props.method][props.page].sections[props.section].components[props.index-1];
        setName(component.name);
        setComponent(component.component);
        setRequired(component.required);
        setTimestamp(component.timestamp);
    }, []);

    function submit() {
        
    }

    return <section className={styles.background}>
        <div></div>

        <article>
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="1" onClick={() => props.goBack()}>
                <rect x="10.1184" y="26.5513" width="5.85418" height="23.237" rx="2.92709" transform="rotate(-134.976 10.1184 26.5513)" fill="black" opacity="1" fillOpacity="1"/>
                <rect x="26.718" y="22.4854" width="5.9038" height="23.1724" rx="2.9519" transform="rotate(135 26.718 22.4854)" fill="black" opacity="1"/>
            </svg>

            <input placeholder={"NAME"} value={name} onChange={(e) => setName(e.target.value)}/>

            <select defaultValue={"COMPONENT TYPE"} onChange={(e) => setComponent(e.target.value)}>
                <option value="" disabled selected hidden>COMPONENT TYPE</option>
                <option value="number input">NUMBER INPUT</option>
                <option value="dropdown">DROPDOWN</option>
                <option value="select">SELECT</option>
            </select>

            <section>
                <div><div className={required ? styles.selected : ""} onClick={() => setRequired(!required)}></div><p>Required</p></div>
                <div><div className={timestamp ? styles.selected : ""} onClick={() => setTimestamp(!timestamp)}></div><p>Timestamp</p></div>
            </section>

            <button onClick={submit}>ADD</button>

        </article>
    </section>
};

export default EditComponent;