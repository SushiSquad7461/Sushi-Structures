import { NextPage } from "next";
import { useState } from "react";
import { ConfigFile, createEmptyComponent } from "../../../util/configfile";
import styles from "../../../styles/components/configfilepages/Page.module.css";
import NewSection from "./newsection";
import EditComponent from "./editcomponent";

type PropsData = {
    data: ConfigFile,
    setData: Function,
    method: string,
    page: string,
};

const Page: NextPage<PropsData> = (props: PropsData) => {
    const [addSection, setAddSection] = useState<boolean>(false);
    const [section, setSection] = useState<string>("");
    const [componentIndex, setComponentIndex] = useState<number>(-1);
    const [sectionIndex, setSectionIndex] = useState<number>(-1);

    function goBack() {
        setAddSection(false);
    }

    function switchPage(name: string) {
        if (section === name) {
            setSection("");
        } else {
            setSection(name);
        }
    }

    return <section className={styles.page}>
        <h1>{props.page}</h1>

        <section className={styles.sections}>
            {
                props.data.scouting[props.method][props.page].sections.map((key, index) => {
                    return <article key={key.properties.title} className={styles.section}>
                        <div>
                            <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => switchPage(key.properties.title)} className={section === key.properties.title ? styles.selected : ""}>
                                <path d="M9.73205 12C8.96225 13.3333 7.03775 13.3333 6.26795 12L1.0718 3C0.301996 1.66667 1.26425 0 2.80385 0L13.1962 0C14.7358 0 15.698 1.66667 14.9282 3L9.73205 12Z" fill="black"/>
                            </svg>

                            <h6>{key.properties.title}</h6>

                            <h4>[{key.properties.componentsInRow.map((key, i) => {return (i !== 0 ? " " : "") + key;})}]</h4>

                            <div>
                                <div style={{backgroundColor: key.properties.color}}></div>
                                <div style={{backgroundColor: key.properties.darkColor}}></div>
                                <div style={{backgroundColor: key.properties.textColor}}></div>
                                <div style={{backgroundColor: key.properties.darkTextColor}}></div>
                            </div>
                        </div>

                        {
                            section === key.properties.title && <section className={styles.components}>
                                {
                                   (() => {
                                        let mapArray = [];
                                        for (let i=0; i < key.properties.rows; ++i) {
                                            mapArray.push(i+1);
                                        }

                                        return mapArray.map(val => {
                                            return <section>
                                                <h1>COLUMN {val}</h1>

                                                { (() => {
                                                    let retArray = [];
                                                    let startIndex = 0;
                                                    for (let i=0; i < val-1; ++i) {
                                                        startIndex += key.properties.componentsInRow[i];
                                                    }

                                                    for (let i=0; i <key.properties.componentsInRow[val-1]; ++i) {
                                                        retArray.push(
                                                            <p className={key.components[i+startIndex].name === "" ? "" : styles.created}
                                                                onClick={ () => {
                                                                    setComponentIndex(startIndex+i);
                                                                    setSectionIndex(index);
                                                            }}>{key.components[i+startIndex].name === "" ?  "COMPONENT" : key.components[i+startIndex].name}</p>
                                                        );
                                                    }

                                                    return retArray.map(val => val);
                                                })()}
                                            </section>
                                        });
                                   })()
                                }
                            </section>
                        }
                    </article>
                })
            }
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

        { componentIndex !== -1 && <EditComponent section={sectionIndex} goBack={() => setComponentIndex(-1)} data={props.data} setData={props.setData} method={props.method} page={props.page} index={componentIndex} />}
    </section>
};

export default Page;