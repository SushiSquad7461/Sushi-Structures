import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ConfigFile } from "../util/configfile";
import Method from "./editorpages/sushiscouts/method";
import ScoutingMethods from "./editorpages/sushiscouts/scoutingmethods";
import Year from "./editorpages/year";

type PropsData = {
    data: ConfigFile,
    setData: Function,
};

const ConfigFileEditor: NextPage<PropsData> = (props: PropsData) => {
    const [currPage, setCurrPage] = useState("year");
    const [ret, setRet] = useState(<Year setData={props.setData} data={props.data} setPage={setCurrPage}/>);

    useEffect(() => {
        switch (currPage.split(".")[0]) {
            case "year":
                setRet(<Year setData={props.setData} data={props.data} setPage={setCurrPage}/>);
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