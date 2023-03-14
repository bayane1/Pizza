import { useState, useRef } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState({ text: "", price: "" });
  const [formErrors, setFormErrors] = useState({});
  const inputIngrédient= useRef(null);
  const inputPrix = useRef(null);
  const changePrice = (e, index) => {
    const currentPrices = [...prices];
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
   
    if (!extra || !extra.text || !extra.price) {
      setFormErrors({
        ...formErrors,
        extra: "Veuillez entrer un ingrédient et son prix."

      });
      isValid = false;
      return;

    } else {
      setExtraOptions((prev) => [...prev, extra]);
      setFormErrors({});
    
    }
    
    inputIngrédient.current.value = "",
  
     inputPrix.current.value ="";
    
    setExtra({ text: "", price: "" });

  };

  const validateFields = () => {
    const formErrorsCopy = { ...formErrors };
    let isValid = true;
    if (!file) {
      formErrorsCopy.file = "Veuillez sélsctionner une image.";
      isValid = false;
    } else {
      delete formErrorsCopy.file;

    }
    if (!title) {
      formErrorsCopy.title = "Veuillez entrer un titre";
      isValid = false;
    } else {
      delete formErrorsCopy.title;

    }
    if (!desc) {
      formErrorsCopy.desc = "Veuillez entrer une description.";
      isValid = false;
    } else {
      delete formErrorsCopy.desc;
    }

    if (prices.length !== 3 || prices.some(price => price === null)) {
      formErrorsCopy.prices = "Veuillez entrer un prix pour chaque taille.";
      isValid = false;
    } else {
      delete formErrorsCopy.prices;
    }


    setFormErrors(formErrorsCopy);
    return isValid;
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    let validate = validateFields();
    
    if (!validate) return;

const donnees = new FormData();
donnees.append("file", file);
donnees.append("upload_preset", "uploads");
 
    /* 
    setFormErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      // Si des erreurs ont été trouvées, on les affiche et on arrête l'exécution de la fonction
      // console.log(formErrors);
      return;

    }
*/
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dl9gtlwks/image/upload",
        data
      );

      //console.log(uploadRes.data)
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post("/api/products", newProduct);
      setClose(true);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }

    // Effacer les valeurs après la validation
    setFile(null);
    setTitle("");
    setDesc("");
    setPrices([null, null, null]);
    setExtraOptions([]);
    setExtra({ text: "", price: "" });

  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Ajouter Pizza</h1>
        <form className={styles.form} noValidate onSubmit={handleCreate}>
          <div className={styles.item}>
            <label className={styles.label}>Choisir une image</label>
            <input type="file" accept="image/*" 
             onBlur={validateFields}
            onChange={(e) => setFile(e.target.files[0])} required={true} />
            {formErrors.file && <span className={styles.error}>{formErrors.file}</span>}
          </div>
          <div className={styles.item}>
            <label htmlFor="title" className={styles.label}>Titre</label>
            <input
              className={styles.input}
              type="text" maxLength={40}
              value={title}
              onBlur={validateFields}
              onChange={(e) => setTitle(e.target.value)}
              required={true}
            />

            {formErrors.title && <span className={styles.error}>{formErrors.title}</span>}
          </div>
          <div className={styles.item}>
            <label htmlFor="desc" className={styles.label}>Description</label>
            <textarea
              rows={4}
              type="text" maxLength={300}
              onBlur={validateFields}
              onChange={(e) => setDesc(e.target.value)}
              required={true}
            />
          </div>
          {formErrors.desc && <span className={styles.error}>{formErrors.desc}</span>}
          <div className={styles.item}>
            <label className={styles.label}>Prix</label>
            <div className={styles.priceContainer}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Petite"
                onBlur={validateFields}
                onChange={(e) => changePrice(e, 0)}
                required={true}
                min={0}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Moyenne"
                onBlur={validateFields}
                onChange={(e) => changePrice(e, 1)}
                required={true}
                min={0}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Large"
                onBlur={validateFields}
                onChange={(e) => changePrice(e, 2)}
                required={true}
                min={0}
              />
              
            </div>
            {formErrors.prices && <span className={styles.error}>{formErrors.prices}</span>}
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Extra(s)</label>
            <div className={styles.extra}>

              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="text"
                placeholder="Ingrédient"
                name="text"
                ref={inputIngrédient}
                onChange={handleExtraInput}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                ref={inputPrix}
                placeholder="Prix"
                name="price"
                min="0"
                onChange={handleExtraInput}
                required={true}

              />

              <button className={styles.extraButton} type="button" onClick={handleExtra}>
                Ajouter
              </button>
            </div>
            {formErrors.extra && <span className={styles.error}>{formErrors.extra}</span>}
            <div className={styles.extraItems}>
              {extraOptions.map((option) => (
                option && option.text && (
                  <span key={option.text} className={styles.extraItem}>
                    {option.text}
                  </span>
                )
              ))}
            </div>

          </div>

          <button className={styles.addButton} type="submit" >
            Créer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
