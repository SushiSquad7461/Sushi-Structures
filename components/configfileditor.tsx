import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ConfigFile } from "../util/configfile";
import Method from "./editorpages/sushiscouts/method";
import ScoutingMethods from "./editorpages/sushiscouts/scoutingmethods";
import Year from "./editorpages/year";

type PropsData = {
    data: ConfigFile,
    setData: Function,
    reset: Function,
};

const ConfigFileEditor: NextPage<PropsData> = (props: PropsData) => {
    const [currPage, setCurrPage] = useState("year");
    const [ret, setRet] = useState(<Year submit={submit} setData={props.setData} data={props.data} setPage={setCurrPage}/>);

    async function submit() {
        console.log("in");
        console.log(props.data);
        props.data.version += 1;

        const res = await  fetch(`/api/updateconfig`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"config" : JSON.stringify(props.data)}),
        });

        if (res.ok) {
            props.reset();
        }
    }

    useEffect(() => {
        switch (currPage.split(".")[0]) {
            case "year":
                setRet(<Year submit={submit} setData={props.setData} data={props.data} setPage={setCurrPage}/>);
                break;  
            case "Sushi Scouts":
                setRet(<ScoutingMethods setData={props.setData} data={props.data} setPage={setCurrPage}/>);
                break;
            case "scoutingmethod":
                setRet(<Method setData={props.setData} data={props.data} setPage={setCurrPage} method={currPage.split(".")[1]}/>);
                break;
            default:
                setRet(<p>Page {currPage} is not defined</p>);
                break;
        }
    }, [currPage, props.data, props.setData]);

    return ret;
};

export default ConfigFileEditor;