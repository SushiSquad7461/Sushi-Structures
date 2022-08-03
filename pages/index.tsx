import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from "../components/header";
import Login from '../components/login';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sushi Structures</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Login />
    </div>
  )
}

export default Home
