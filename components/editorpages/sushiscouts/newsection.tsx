import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { ConfigFile, createEmptyComponent } from "../../../util/configfile";
import styles from "../../../styles/components/configfilepages/NewSection.module.css";

type PropsData = {
    data: ConfigFile,
    setData: Function,
    method: string,
    page: string,
    back: Function,
};

const NewSection: NextPage<PropsData> = (props: PropsData) => {
    const [rowNum, setRowNum] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const [lightColor, setLightColor] = useState<string>("");
    const [darkColor, setDarkColor] = useState<string>("");
    const [lightTextColor, setLightTextColor] = useState<string>("");
    const [darkTextColor, setDarkTextColor] = useState<string>("");
    const [componentsInRow, setComponentsInRow] = useState<Array<number>>([]);

    function submit() {
        if (rowNum !== "" && title !== "" && lightColor !== "" && darkColor !== "" && lightTextColor !== "" && darkTextColor !== "" && componentsInRow.length > 0) {
            props.data.scouting[props.method][props.page].sections.push({
                properties: {
                    title: title,
                    color: "#" + lightColor,
                    rows: parseInt(rowNum),
                    textColor: "#" + lightTextColor,
                    darkColor: "#" + darkColor,
                    darkTextColor: "#" + darkTextColor,
                    componentsInRow: componentsInRow
                },
                components: []
            });

            for (let i=0; i < parseInt(rowNum); ++i) {
                console.log("i" + i);
                for (let j=0; j < componentsInRow[i]; ++j) {
                    console.log("added");
                    props.data.scouting[props.method][props.page].sections[props.data.scouting[props.method][props.page].sections.length-1].components.push(createEmptyComponent());
                }
            }
            props.setData(props.data);
            props.back();
        }
    }

    return <section className={styles.popup}>
        <div className={styles.opacity}></div>

        <article>
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="1" onClick={() => props.back()}>
                <rect x="10.1184" y="26.5513" width="5.85418" height="23.237" rx="2.92709" transform="rotate(-134.976 10.1184 26.5513)" fill="black" opacity="1" fillOpacity="1"/>
                <rect x="26.718" y="22.4854" width="5.9038" height="23.1724" rx="2.9519" transform="rotate(135 26.718 22.4854)" fill="black" opacity="1"/>
            </svg>

            <input placeholder="TITLE" value={title} onChange={event => setTitle(event.target.value)}/>
            
            <section className={styles.colors}>
                <p>color</p>

                <article>
                    <section>
                        <p>LIGHT</p>

                        <div>
                            <input placeholder="COLOR" value={lightColor} onChange={event => setLightColor(event.target.value)}/>
                            <div style={{ backgroundColor: "#" + lightColor}}></div>
                        </div>

                        <div className={styles.extrawide}>
                            <input placeholder="TEXT COLOR" value={lightTextColor} onChange={event => setLightTextColor(event.target.value)}/>
                            <div style={{ backgroundColor: "#" + lightTextColor}}></div>
                        </div>
                    </section>

                    <section className={styles.dark}>
                        <p>DARK</p>

                        <div>
                            <input placeholder="COLOR" value={darkColor} onChange={event => setDarkColor(event.target.value)}/>
                            <div style={{ backgroundColor: "#" + darkColor}}></div>
                        </div>

                        <div className={styles.extrawide}>
                            <input placeholder="TEXT COLOR" value={darkTextColor} onChange={event => setDarkTextColor(event.target.value)}/>
                            <div style={{ backgroundColor: "#" + darkTextColor}}></div>
                        </div>
                    </section>
                </article>
            </section>

            <input placeholder="COLUMN #" value={rowNum} type="number" onChange={event => { 
                setRowNum(event.target.value); 
                if (event.target.value !== "" && parseInt(event.target.value) < 1000) { 
                    setComponentsInRow(Array<number>(parseInt(event.target.value)).fill(0));
            }}}/>

            <p>COMPONENTS IN COLUMN</p>

            <div className={styles.cir}>
                {
                    componentsInRow.map((i, index) => {
                        return <section className={styles.rowInput} key={index}>
                            <p>{index as number + 1}</p>
                            <input type="number" defaultValue={i.toString()} onChange={(e) => {
                                componentsInRow[index] = parseInt(e.target.value);
                                setComponentsInRow(componentsInRow);
                            }}/>
                        </section>;
                    })
                }
            </div>

            <button onClick={submit}>ADD</button>
        </article>
    </section>
};

export default NewSection;