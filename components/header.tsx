import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from '../styles/components/Header.module.css'

const Header: NextPage = () => {
    const [currPage, setCurrPage] = useState("");

    useEffect(() => {
        setCurrPage(window.location.pathname);
    }, []);

    return <section className={styles.header}>
        <img src = "header.svg" alt="header drawing" className={styles.img}/>
        <h1 className={styles.text}>sushi structure</h1>

        <section>
            <article className={currPage == "/create" ? styles.selected : styles.lowest}>
                <Link href = "/create" passHref><p onClick={(() => setCurrPage("/create"))}>create</p></Link>
            </article>

            <div className={currPage == "/edit" ? styles.selected : styles.highest}>
               <Link href = "/edit" passHref><p onClick={(() => setCurrPage("/edit"))}>edit</p></Link>
            </div>

            <div className={currPage == "/" ? styles.selected : styles.lowest}>
                <Link href = "/" passHref><p onClick={(() => setCurrPage("/"))}>about</p></Link>
            </div>
        </section>
    </section>
};

export default Header;