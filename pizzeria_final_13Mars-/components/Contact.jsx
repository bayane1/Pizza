import styles from '../styles/Contact.module.css'
import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/router';

const Contact = () => {

    const { register, handleSubmit, formState:{ errors} } = useForm();
    const router = useRouter();
    const onFormSubmit = async (values) => {
     
        try{
            const res = await axios.post("/api/contact", values);
            if (res.status == 200) {
                router.push('/sentmail');
            }
        }
        catch(err) {
            console.log(err);
        }
    };

    const onErrors =(errors) => console.error(errors);
    return(
        <main>
            <div className={styles.container}>
                <h1>Nous <span className={styles.nom}>contacter</span></h1>
                <form className={styles.form} onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                    <div className={styles.line}>
                        <label htmlFor="first">Prénom:</label>
                        <input className={styles.field} type="text"
                        {...register("first", 
                        { required: "Le prénom est requis !",
                        maxLength:40})}
                        placeholder='Entrez votre prénom'
                        />
                        <span className={styles.danger}>{errors.first && errors.first.message}</span>
                    </div>
                    <div className={styles.line}>
                        <label htmlFor="last">Nom:</label>
                        <input className={styles.field} type="text" id="last"
                        {...register('last',  
                        { required: "Le nom est requis !"})}
                        placeholder='Entrez votre nom'/>
                        <span className={styles.danger}>{errors.last && errors.last.message}</span>
                    </div>
                    <div className={styles.line}>
                        <label htmlFor="email">Courriel:</label>
                        <input className={styles.field}
                        type="email"
                        {...register("email", {
                            required: "Le courriel est requis !",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Le courriel entré est invalide !"
                            }
                        })}                        
                        placeholder='Entrez votre courriel'
                        />
                        <span className={styles.danger}>{errors.email && errors.email.message}</span>
                    </div>
                    <div className={styles.line}>
                        <label htmlFor="phone">Téléphone:</label>
                        <input className={styles.field}
                        id="phone"
                        type="tel"
                        {...register("phone", {
                            required: "Le numéro de téléphone est requis !",
                            pattern: {
                              value: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
                              message: "Le numéro entré est erroné !"
                            }
                        })}
                        placeholder='Entrez votre numéro de téléphone'
                        />
                        <span className={styles.danger}>{errors.phone && errors.phone.message}</span>
                    </div>
                    <div className={styles.line}>
                        <label htmlFor="message">Message:</label>
                        <textarea className={styles.message} id="message" rows="6" name="message" 
                        {...register('message', {required: "Le message est requis !"})} 
                        placeholder='Ajouter un message ici' maxLength={200}></textarea>
                        <span className={styles.danger}>{errors.message && errors.message.message}</span>
                    </div>
                    <div className={styles.button}>
                        <button className={styles.btn} type="submit">Envoyer</button>
                    </div>
                </form>
            </div>
        </main>
    )
};

export default Contact;
