import type { NextPage } from 'next'
import styles from '../styles/Edit.module.css'
import Login from '../components/login';
import { useEffect, useState } from 'react';

const Create: NextPage = () => {
  const [login, setLogin] = useState(true);
  const [teamNum, setTeamNum] = useState<Number>(0);

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
                setTeamNum(parseInt(teamNum));
                setLogin(false);
            }
        }
    })();
  }, []);



  function reset() {

  }

  return (
    <div className={styles.container}>
      { login ? <Login /> : <article className={styles.edit}>
        <div className={styles.grey}></div> 
        <div className={styles.black}></div> 

        <article>

        </article>
      </article>
      }
    </div>
  )
}

export default Create;
