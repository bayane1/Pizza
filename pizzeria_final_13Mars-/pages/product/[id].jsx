import styles from "../../styles/Product.module.css"
import Image from "next/image"
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/cartSlice";
import Link from "next/link";
import {default as ProductMongo} from "@/models/Product";
import dbConnect from "@/util/mongo";

const Product = ({ pizza }) => {
    const [price, setPrice] = useState(pizza.prices[0]);
    const [size, setSize] = useState(0);
    const [extras, setExtras] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    var [message, setMessage] = useState(false);
    // const [delivery, setDelivery] = useState(0);


    const changePrice = (number) => {
        setPrice(price + number)
    }

    const handleSize = (sizeIndex) =>{
        const difference = pizza.prices[sizeIndex] - pizza.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    }
    const handleChange = (e, option) => {
        const checked = e.target.checked;
        if(checked) {
            changePrice(option.price);
            setExtras(prev =>[...prev, option]);
        }
        else{
            changePrice(-option.price);
            setExtras(extras.filter((extra) => extra._id !== option._id));
        }
    };

    // const handleDelivery = (e) => {
    //     const checked = e.target.checked;
    //     setDelivery(5);

    //     if(checked) {
    //         changePrice(delivery);
    //         console.log("Le prix avec livraison" +price);

    //     }
    //     else{
    //         changePrice(-delivery);
    //         console.log("Le prix sans livraioson" +price);
    //     }       
    // }

    const handleClick = () =>{
        setMessage(true);
        if(qtte.value < 1) qtte.value = 1;
        dispatch(addProduct({...pizza, extras, price, quantity}));
    }

   

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.imgContainer}>
                        <Image className={styles.img} src={pizza.img} fill alt="Photo pizza"/>
                    </div>
                </div>
                <div className={styles.right}>
                    <h1 className={styles.title}>{pizza.title}</h1>
                    <span className={styles.price}>$ {price}</span>
                    <p className={styles.desc}>{pizza.desc}</p>
                    <h2 className={styles.choose}>Choisir la grandeur</h2>
                    <div className={styles.sizes}>
                        <div className={styles.size} onClick={()=>handleSize(0)}>
                            <Image src="/img/size.png" fill alt=""/>
                            <span className={styles.number}>Petite</span>
                        </div>
                        <div className={styles.size} onClick={()=>handleSize(1)}>
                            <Image src="/img/size.png" fill alt=""/>
                            <span className={styles.number}>Moyenne</span>
                        </div>
                        <div className={styles.size} onClick={()=>handleSize(2)}>
                            <Image src="/img/size.png" fill alt=""/>
                            <span className={styles.number}>Grande</span>
                        </div>
                    </div>
                    <h2 className={styles.choose}>Choisir un supplément</h2>
                    <div className={styles.ingredients}>
                        {pizza.extraOptions.map((option) => (
                            <div className={styles.option} key={option._id}>
                                <input 
                                type="checkbox"
                                id={option.text} 
                                name={option.text}  
                                className={styles.checkbox}
                                onChange={(e) => handleChange(e, option)}
                                />
                                <label className={styles.txt} htmlFor="double">{option.text}</label>
                            </div>
                        ))}  
                    </div> 
                  
                    <input id="qtte" onChange={(e)=>setQuantity(e.target.value > 0 ? e.target.value:1)} type="number" defaultValue={1} min="0" className={styles.quantity} />
                
                    <button className={styles.button} onClick={handleClick}>Ajouter au panier</button>        
                </div>
            </div>
            <div className={styles.add}>              
                {message && 
                    <div className={styles.confirm}>
                        <div className={styles.message}>
                            <p>Votre commande a été ajoutée au panier avec succès !</p>
                        </div>
                        <div>
                            <Link className={styles.lien} href="/#list">
                                <button className={styles.retourMenu}>
                                    Revenir au menu
                                </button>
                            </Link>
                            <Link className={styles.lien} href="/cart">
                                <button className={styles.retourMenu}>
                                    Aller au panier
                                </button>
                            </Link>
                        </div>
                    </div>
                }
            </div>   
        </div>
    )
}

export const getServerSideProps = async({params}) =>{
    
    await dbConnect();

    const product = await  ProductMongo.findById(params.id);
    return{
      props: {
        pizza: JSON.parse(JSON.stringify(product)),
      },
    };
}

export default Product;

