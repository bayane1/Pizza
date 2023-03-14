import styles from '@/styles/Sentmail.module.css';
import Link from 'next/link';



const Sentmail = () => {
    return (
      <>
        <div className={styles.container}>
            <div className={styles.validation}>
                <img className={styles.img} width="100" height={100} src='../img/felicitation.png' alt='Icone bravo'></img>
                <p>Hourra! Votre message a été envoyé avec succès !</p>
                <img className={styles.img} width="100" height={100} src='../img/felicitation.png' alt='Icone bravo'></img>
            </div>
            <Link href="/">
                <button className={styles.retour}>Retour à la page d'accueil</button>
            </Link>
        </div>
      </>
    );
}

export default Sentmail;