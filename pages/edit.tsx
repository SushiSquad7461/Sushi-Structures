import type { NextPage } from 'next'
import styles from '../styles/Edit.module.css'
import Login from '../components/login';
import { useEffect, useState } from 'react';
import { ConfigFile, createConfigFile } from '../util/configfile';
import ConfigFileEditor from '../components/configfileditor';

const Create: NextPage = () => {
  const [login, setLogin] = useState(true);
  const [teamNum, setTeamNum] = useState<Number>(0);
  const [list, setList] = useState<Array<string>>([]);
  const [edit, setEdit] = useState<number>(-1);
  const [data, setData] = useState<ConfigFile>(createConfigFile(0));

  useEffect(() => {
    const teamNum = localStorage.getItem("teamNum");
    const token = localStorage.getItem("token");

    ( async () => {
        if (teamNum !== null && token !== null) {
            const res = await fetch(`/api/checktoken`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({"num" : teamNum, "token" : token}),
            });

            if (res.ok) {
                setTeamNum(parseInt(teamNum));
                setLogin(false);
                updateList(parseInt(teamNum));
            }
        }
    })();
  }, []);



  async function updateList(teamNum: Number) {
    const res = await fetch("/api/getconfigfilelist?teamNum=" + teamNum);

    if (res.ok) {
        setList(JSON.parse((await res.json()).list));
    }
  }

  async function setConfigFile(year: number) {
    const res = await fetch("/api/getconfigfile?teamNum=" + teamNum + "&year=" + year);

    if (res.ok) {
        const newData = (JSON.parse((await res.json()).config));
        console.log(newData);
        setData(newData);
        setEdit(year);
    }
  }

  return (
    <div className={styles.container}>
      { login ? <Login /> : ( edit === -1 ? <article className={styles.edit}>
        <div className={styles.grey}></div> 
        <div className={styles.black}></div> 

        <article>
            { list.map(i => {
                return <p onClick={() => setConfigFile(parseInt(i))} key={i}>{i} APP</p>
            }) }
        </article>
      </article> : <ConfigFileEditor data={data} setData={setData} reset={() => setEdit(-1)}/>)
      }
    </div>
  )
}

export default Create;
