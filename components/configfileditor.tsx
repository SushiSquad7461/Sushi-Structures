import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ConfigFile } from "../util/configfile";
import Year from "./editorpages/year";

type PropsData = {
    data: ConfigFile,
    setData: Function,
};

const ConfigFileEditor: NextPage<PropsData> = (props: PropsData) => {
    const [currPage, setCurrPage] = useState("year");
    const [ret, setRet] = useState(<Year setData={props.setData} data={props.data} setPage={setCurrPage}/>);

    useEffect(() => {
        switch (currPage) {
            case "year":
                setRet(<Year setData={props.setData} data={props.data} setPage={setCurrPage}/>);
                break;  
            default:
                setRet(<p>Page {currPage} is not defined</p>);
                break;
        }
    }, [currPage]);

    return ret;
};

export default ConfigFileEditor;