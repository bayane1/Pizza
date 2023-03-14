import Image from 'next/image';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image className={styles.itemImg} src="/img/bg.png" fill alt="background" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>PIZZA MARCONI</h2>

          <div className={styles.contact_phone}>
            <div>
              <Image
                className={styles.contactImg}
                src="/img/phone.png"
                alt="Phone image"
                width="32"
                height="32"
              />
            </div>

            <div className={styles.text}>+1 613 123 4567</div>
          </div>
          <div className={styles.contact_fax}>
            <div>
              <Image
                className={styles.contactImg}
                src="/img/fax.png"
                alt="Phone image"
                width="32"
                height="32"
              />
            </div>

            <div className={styles.text}>+1 613 123 4545</div>
          </div>

          <div className={styles.contact_mail}>
            <div>
              <Image
                className={styles.contactImg}
                src="/img/mail.png"
                alt="mail image"
                width="32"
                height="32"
              />
            </div>
            <div className={styles.text}>pizza.marconi@info.com</div>
          </div>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Trouver nos restaurants</h1>
          <p className={styles.text}>
            2015, Boul. St-Laurent,
            <br />
            Ottawa, K7Y8U1
            <br />
            (613) 222 4157
          </p>
          <p className={styles.text}>
            125, Boul. St-Joseph,
            <br />
            Orléans, K1C5R8
            <br />
            (613) 222 4158
          </p>
          <p className={styles.text}>
            368, rue Slater,
            <br />
            Ottawa, K1LO8W1
            <br />
            (613) 222 4159
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Heures d'ouverture</h1>
          <p className={styles.text}>
            Lundi à Vendredi :
            <br />
            08h00 - 22h00
          </p>
          <p className={styles.text}>
            Samedi - Dimanche :
            <br />
            10h00 - 00h00
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;