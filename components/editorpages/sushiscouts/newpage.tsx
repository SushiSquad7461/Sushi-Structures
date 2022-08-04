import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { ConfigFile } from "../../../util/configfile";
import styles from "../../../styles/components/configfilepages/NewPage.module.css";

type PropsData = {
    data: ConfigFile,
    setData: Function,
    method: string,
    back: Function,
};

const NewPage: NextPage<PropsData> = (props: PropsData) => {
    const [footer, setFooter] = useState<boolean>(false);
    const [footerName, setFooterName] = useState<string>("");
    const [name, setName] = useState<string>("");

    useEffect(() => {
        console.log(props.data.scouting[props.method]);
    }, []);

    function submit() {
        if (name !== "" && (!footer || footerName !== "")) {
            props.data.scouting[props.method][name] = {
                "footer": footer ? footerName : "",
                "sections": []
            };
            props.setData(props.data);
            console.log(props.data);
            props.back();
        }
    }

    return <section className={styles.popup}>
        <div className={styles.opacity}></div>

        <article>
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="1">
                <rect x="10.1184" y="26.5513" width="5.85418" height="23.237" rx="2.92709" transform="rotate(-134.976 10.1184 26.5513)" fill="black" opacity="1" fillOpacity="1"/>
                <rect x="26.718" y="22.4854" width="5.9038" height="23.1724" rx="2.9519" transform="rotate(135 26.718 22.4854)" fill="black" opacity="1"/>
            </svg>

            <input placeholder="PAGE NAME" value={name} onChange={event => setName(event.target.value)}/>
            <p onClick={() => setFooter(!footer)} className={footer ? styles.border : ""}>FOOTER</p>
            <input placeholder="FOOTER NAME" disabled={!footer} value={footerName} onChange={event => setFooterName(event.target.value)}/>
            <button onClick={submit}>SUBMIT</button>
        </article>
    </section>
};

export default NewPage;