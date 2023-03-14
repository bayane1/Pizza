import styles from '../styles/Featured.module.css';

const Featured = () => {
   
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <p>PIZZA</p>
                <p>MARCONI</p>
            </div>
            <button className={styles.buttonOrder}>
                <a href="#list">Passez votre commande!</a>
            </button>
        </div>
    )
}

export default Featured;