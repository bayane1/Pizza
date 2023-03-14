import { useState } from "react";
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen,setIsOpen] = useState(false);
  const openMenu= ()=> setIsOpen(!isOpen);
  const quantity = useSelector((state)=> state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image
            src="/img/telephone.png"
            alt="Telephone image"
            width="32"
            height="32"
          />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>Commandez maintenant!</div>
          <div className={styles.text}>+1 613 123 4567</div>
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.item}>
          <ul className={isOpen === false ? styles.list : styles.list +' '+ styles.active}>

            <Image
              className={styles.logo}
              src="/img/pizza1.png"
              alt="Logo"
              width="70"
              height="55"
            />
          <Link className={styles.lien} href="/" passHref>
            <li className={styles.listItem}>
              Accueil
            </li>
          </Link>
          <Link className={styles.lien} href="/#list">
            <li className={styles.listItem}>
              Menu
            </li>
          </Link>
          <Link className={styles.lien} href="/contact" passHref>  
            <li className={styles.listItem}>
              Contact
            </li>
          </Link> 
          <Link className={styles.lien} href="/admin/login" passHref>  
            <div className={styles.item}>
              <Image className={styles.adminIcon} src="/img/admin.png" alt="Panier" width="30" height="30"/>
            </div>
            {/* <li className={styles.listItem}>
              Admin
            </li> */}
          </Link> 
          <Link className={styles.lien} href="/cart" passHref>
            <div className={styles.item}>
              <div className={styles.cart}>
                <Image src="/img/cart.png" alt="Panier" width="30" height="30" />
                <div className={styles.counter}>{quantity}</div>
              </div>
            </div>
          </Link>
          </ul>
        </div>
       
     
      </div>
      <div className={ isOpen === false ? styles.hamburger : styles.hamburger +' '+ styles.active}
                      onClick={openMenu}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </div>
    </div>
  );
}

export default Navbar;