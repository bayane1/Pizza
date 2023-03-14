import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

const PizzaList = ({ pizzaList }) => {
    return(
        <div id='list' className={styles.container}>
            <h1 className={styles.title}>Votre meilleure pizza</h1>
            <p className={styles.desc}>
                Dégustez la véritable saveur de nos pizzas, fraîchement préparées avec des ingrédients de qualité supérieure. Chez nous, chaque bouchée est une explosion de saveurs! 
                Goûtez à la différence puisque nous vous ferons vivre un voyage culinaire inoubliable.         
            </p>
            <div className={styles.wrapper}>
                {pizzaList.map((pizza)=>(
                    <PizzaCard key={pizza._id} pizza={pizza}/>
                ))}    
            </div>
        </div>
    )
}

export default PizzaList;