import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from "../components/header";
import Login from '../components/login';
import { useEffect, useState } from 'react';

const Create: NextPage = () => {
  const [login, setLogin] = useState(true);

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
                setLogin(false);
            }
        }
    })();
  }, []);

  return (
    <div className={styles.container}>
      { login ? <Login /> : <>

      </>}
    </div>
  )
}

export default Create;
