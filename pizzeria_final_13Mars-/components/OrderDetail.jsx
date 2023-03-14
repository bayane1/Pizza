import { useState } from "react";
import styles from "../styles/OrderDetail.module.css"
import { useForm } from "react-hook-form";


const OrderDetail = ({total, createOrder, setCash}) =>{
    const [customer, setCustomer] = useState(""); 
    const [address, setAddress] = useState(""); 

    const { register, handleSubmit, formState:{ errors} } = useForm();


    // const handleClick = () => {
    //     total = total + 5;
    //     createOrder({customer, address, total, method:0});
    // };

    const onFormSubmit = async () => {
     
        try{
            total = total + 5;
            createOrder({customer, address, total, method:0});
        }
        catch(err) {
            console.log(err);
        }
    };
    const onErrors =(errors) => console.error(errors);

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.closeContainer}>
                    <button onClick={() => setCash(false)} className={styles.close}>
                    X
                    </button>
                </div>
                <div className={styles.totalText}>
                    <h3>Récapitulatif de paiement</h3>
                    <div>
                        <b className={styles.totalTextTitle}>Total:</b> ${total + 5}
                    </div>
                </div>
                <form className={styles.form} onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                    <div className={styles.item}>
                        <label htmlFor="first">Nom & Prénom:</label>
                        <input placeholder="Nom complet" type="text" 
                        className={styles.input} 
                        {...register("first", 
                        { required: "Le nom complet est requis !",
                        maxLength:40})}
                        onChange={(e)=> setCustomer(e.target.value)}/>
                        <span className={styles.danger}>{errors.first && errors.first.message}</span>
                    </div>
                    
                    <div className={styles.item}>
                        <label htmlFor="phone">Numéro de téléphone:</label>
                        <input 
                        type="text" 
                        placeholder="Ajouter votre N° de téléphone"
                        {...register("phone", {
                                required: "Le numéro de téléphone est requis !",
                                pattern: {
                                value: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
                                message: "Le numéro entré est erroné !"
                                }
                            })}
                        className={styles.input} />
                        <span className={styles.danger}>{errors.phone && errors.phone.message}</span>                        
                    </div>
                    <div className={styles.item}>
                        <label htmlFor="address">Adresse:</label>
                        <textarea rows={3} 
                        placeholder="Ajouter votre adresse" 
                        type="text" 
                        {...register("address", {required: "L'adresse est requise !"})} 
                        maxLength={200}
                        className={styles.textarea} onChange={(e)=> setAddress(e.target.value)} />
                        <span className={styles.danger}>{errors.address && errors.address.message}</span>                        
                    </div>
                    <button className={styles.button} type="submit">
                        Commandez!
                    </button>
                </form>
            </div>
        </div>
    )
}

export default OrderDetail;