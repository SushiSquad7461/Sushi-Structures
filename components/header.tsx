import { NextPage } from "next";
import Link from "next/link";
import styles from '../styles/components/Header.module.css'

const Header: NextPage = () => {
    return <section className={styles.header}>
        <img src = "header.svg" alt="header drawing" className={styles.img}/>
        <h1 className={styles.text}>sushi structure</h1>

        <section>
            <article className={styles.selected}>
                <Link href = "/" passHref><p>create</p></Link>
            </article>

            <div className={styles.highest}>
               <Link href = "/edit" passHref><p>edit</p></Link>
            </div>

            <div className={styles.lowest}>
                <Link href = "/about" passHref><p>about</p></Link>
            </div>
        </section>
    </section>
};

export default Header;