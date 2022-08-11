import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from "../components/header";
import Login from '../components/login';
import { useEffect, useState } from 'react';
import ConfigFileEditor from '../components/configfileditor';
import { ConfigFile, createConfigFile } from '../util/configfile';

const Create: NextPage = () => {
  const [login, setLogin] = useState(true);
  const [data, setData] = useState<ConfigFile>(createConfigFile(0));
  const [teamNum, setTeamNum] = useState<number>(0);

  useEffect(() => {
    const teamNum = localStorage.getItem("teamNum");
    const token = localStorage.getItem("token");

    ( async () => {
        if (teamNum !== null && token !== null) {
            const res = await fetch(`/api/checktoken`, {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({"num" : teamNum, "token" : token}),
            });

            if (res.ok) {

                if (localStorage.getItem("config" + parseInt(teamNum)) !== null) {
                  setData(JSON.parse(localStorage.getItem("config" + parseInt(teamNum))!));
                } else {
                  setData(createConfigFile(parseInt(teamNum)));
                }
                setTeamNum(parseInt(teamNum));
                setLogin(false);
            }
        }
    })();
  }, []);

  function changeData(newData: ConfigFile) {
    setData(newData);
    localStorage.setItem("config" + teamNum, JSON.stringify(newData));
  }

  function reset() {
    changeData(createConfigFile(teamNum));
  }

  return (
    <div className={styles.container}>
      { login ? <Login /> : <ConfigFileEditor data={data} setData={changeData} reset={reset}/>}
    </div>
  )
}

export default Create;
