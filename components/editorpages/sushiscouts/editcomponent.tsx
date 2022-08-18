import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { ConfigFile } from "../../../util/configfile";
import styles from "../../../styles/components/configfilepages/EditComponent.module.css";
import { arrayBuffer } from "stream/consumers";
import e from "cors";

type PropsData = {
    data: ConfigFile,
    setData: Function,
    method: string,
    page: string,
    section: number,
    index: number,
    goBack: Function,
};

const isValue = ["dropdown", "select", "ranking", "multiselect"];

const EditComponent: NextPage<PropsData> = (props: PropsData) => {
    const [name, setName] = useState<string>("");
    const [component, setComponent] = useState<string>("");
    const [required, setRequired] = useState<boolean>(false);
    const [timestamp, setTimestamp] = useState<boolean>(false);
    const [setCv, setSetCv] = useState<boolean>(false);
    const [isCv, setIsCv] = useState<boolean>(false);
    const [values, setValues] = useState<Array<string>>([]);
    const [usingValues, setUsingValues] = useState<boolean>(false);

    const [rowSelected, setRowSelected] = useState<boolean>(true);
    const [numOptions, setNumOptions] = useState<string>("");
    const [numColumns, setNumColumns] = useState<string>("");
    const [configValues, setConfigValues] = useState<Array<string>>([]);
    const [hide, setHide] = useState<boolean>(false);

    useEffect(() => {
        console.log(props.section);
        console.log(props.index);
        const component = props.data.scouting[props.method][props.page].sections[props.section].components[props.index];
        setName(component.name);
        setComponent(component.component);
        setRequired(component.required);
        setTimestamp(component.timestamp);
        setSetCv(component.setCommonValue);
        setIsCv(component.isCommonValue);
        setUsingValues(isValue.includes(component.component));

        if (component.component === "select") {
            setRowSelected(component.values.at(0) === "r");
            setValues(component.values);
        } else if (component.component === "multiselect") {
            setNumOptions(component.values.at(1)!);
            setNumColumns(component.values.at(3)!);

            const valueSplit = component.values.indexOf("c");

            let newConfigValues: Array<string> = [];
            for (let i=4; i < valueSplit; ++i) {
                console.log("hello?", component.values[i]);
                newConfigValues.push(component.values[i]);
            }
            setConfigValues(newConfigValues);

            let newValues: Array<string> = [];
            for (let i=valueSplit+1; i < component.values.length; ++i) {
                newValues.push(component.values[i]);
            }

            setValues(newValues);
        } else {
            setValues(component.values);
        }
    }, []);

    function submit() {
        props.data.scouting[props.method][props.page].sections[props.section].components[props.index].name = name;
        props.data.scouting[props.method][props.page].sections[props.section].components[props.index].component = component;
        props.data.scouting[props.method][props.page].sections[props.section].components[props.index].required = required;
        props.data.scouting[props.method][props.page].sections[props.section].components[props.index].timestamp = timestamp;
        props.data.scouting[props.method][props.page].sections[props.section].components[props.index].isCommonValue = isCv;
        props.data.scouting[props.method][props.page].sections[props.section].components[props.index].setCommonValue = setCv;

        if (component === "multiselect") {
            props.data.scouting[props.method][props.page].sections[props.section].components[props.index].values = ["#o", numOptions, "l", numColumns, ...configValues, "c", ...values];
        } else {
            props.data.scouting[props.method][props.page].sections[props.section].components[props.index].values = usingValues ? values : [];
        }
        props.setData(props.data);
        props.goBack();
    }

    return <section className={styles.background}>
        <div></div>

        <article>
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="1" onClick={() => props.goBack()}>
                <rect x="10.1184" y="26.5513" width="5.85418" height="23.237" rx="2.92709" transform="rotate(-134.976 10.1184 26.5513)" fill="black" opacity="1" fillOpacity="1"/>
                <rect x="26.718" y="22.4854" width="5.9038" height="23.1724" rx="2.9519" transform="rotate(135 26.718 22.4854)" fill="black" opacity="1"/>
            </svg>

            <input placeholder={"NAME"} value={name} onChange={(e) => setName(e.target.value)}/>

            <select defaultValue={props.data.scouting[props.method][props.page].sections[props.section].components[props.index].component === "" ? "COMPONENT TYPE" : props.data.scouting[props.method][props.page].sections[props.section].components[props.index].component} onChange={(e) => {
                setComponent(e.target.value);
                if (isValue.includes(e.target.value)) {
                    setUsingValues(true);

                    if (e.target.value === "select") {
                        setValues(["r"]);
                        setRowSelected(true);
                    } else if (e.target.value === "multiselect") {
                        setConfigValues([]);
                        setValues([]);
                        setNumOptions("");
                        setNumColumns("");
                    } else {
                        setValues([]);
                    }
                } else {
                    setUsingValues(false);
                }
            }}>
                <option value="" disabled selected hidden>COMPONENT TYPE</option>
                <option value="number input">NUMBER INPUT</option>
                <option value="dropdown">DROPDOWN</option>
                <option value="select">SELECT</option>
                <option value="checkbox">CHECKBOX</option>
                <option value="increment">BUTTON INPUT</option>
                <option value="ranking">RANKING</option>
                <option value="text input">TEXT INPUT</option>
                <option value="multiselect">MULTISELECT</option>
            </select>

            <section>
                <div><div className={required ? styles.selected : ""} onClick={() => setRequired(!required)}></div><p>Required</p></div>
                <div><div className={timestamp ? styles.selected : ""} onClick={() => setTimestamp(!timestamp)}></div><p>Timestamp</p></div>
            </section>

            <section>
                <div><div className={isCv ? styles.selected : ""} onClick={() => setIsCv(!isCv)}></div><p>Is CV</p></div>
                <div><div className={setCv ? styles.selected : ""} onClick={() => setSetCv(!setCv)}></div><p>Set CV</p></div>
            </section>

            {
                component === "select" && <div className={styles.rowOrCol}>
                    <p className={rowSelected ? styles.selected : ""} onClick={(e) => {
                        values[0] = 'r';
                        setValues(values);
                        setRowSelected(true);
                    }}>row</p>
                    <p className={!rowSelected ? styles.selected : ""} onClick={(e) => {
                        values[0] = 'c';
                        setValues(values);
                        setRowSelected(false);
                    }}>column</p>
                </div>
            }

            {
                component === "multiselect" && <>
                    <input type="number" placeholder={"# OF OPTIONS"} className={styles.bottom} value={numOptions} onChange={
                        (e) => {
                            setNumOptions(e.target.value);
                        }
                    }/>
                    <input type="number" placeholder={"# OF COLUMNS"} className={styles.bottom && styles.extramargin} value={numColumns} onChange={(e) => {
                        setNumColumns(e.target.value)
                        configValues[3] = e.target.value;

                        if (e.target.value !== "") {
                            setHide(true);
                            setConfigValues(Array<string>(parseInt(e.target.value)).fill(" "));
                            setTimeout(() => setHide(false), 0);
                        }
                    }}/>

                    { !hide && <div className={styles.collList}>
                        <p># OF ITEMS PER COLUMN</p>

                        <div>
                            { configValues.map((i, index) => {
                                return <input key={index + "asd"} defaultValue={i} onChange={e => { configValues[index] = e.target.value.trim(); setConfigValues(configValues)}}/>
                            }) }
                        </div>
                    </div> }
                </>
            }

            { usingValues && <div className={styles.values}>
                <div>
                    <p>VALUES</p>

                    <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {
                        values.push("");
                        setValues(values);
                        setUsingValues(false);
                        setTimeout(() => setUsingValues(true), 0);
                    }}>
                        <rect width="2.5" height="10.6049" rx="1.25" transform="matrix(0.000882409 -1 1 0.000200093 0 6.5)" fill="black"/>
                        <rect x="6.5" y="10" width="2.5" height="10" rx="1.25" transform="rotate(-180 6.5 10)" fill="black"/>
                    </svg>


                    <svg width="11" height="3" viewBox="0 0 11 3" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {
                        if (component !== "select" || values.length > 1) {
                            values.pop();
                        }
                        setValues(values);
                        setUsingValues(false);
                        setTimeout(() => setUsingValues(true), 0);
                    }}>
                        <rect width="2.5" height="10" rx="1.25" transform="matrix(0.000882409 -1 1 0.000200093 0 2.5)" fill="black"/>
                    </svg>

                </div>

                <article>
                    {
                        values.map((i, index) => {
                            if (component === "select" && index < 1) {
                                return <></>;
                            } else {
                                return <section className={styles.rowInput} key={index}>
                                    <p>{index as number + (component === "select" ? 0 : 1)}</p>
                                    <input defaultValue={i} onChange={(e) => {
                                        values[index] = e.target.value;
                                        console.log(values);
                                        setValues(values);
                                    }}/>
                                </section>;
                            }
                        })
                    }
                </article>
            </div> }

            <button onClick={submit}>EDIT</button>
        </article>
    </section>
};

export default EditComponent;