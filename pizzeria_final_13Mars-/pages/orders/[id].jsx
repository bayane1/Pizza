import styles from "../../styles/Order.module.css"
import Image from "next/image"
import axios from "axios";

const Order =  ({order, method})=> {
    const status = order.status;
  

    const statusClass = (index) => {
        if (index-status < 1) {
            return styles.done
        }
        if (index-status === 1) {
            return styles.inProgress
        }
        if (index-status > 1) {
            return styles.undone
        }
    }
   
     return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.row}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tr}>
                                <th>ID commande</th>
                                <th>Client</th>
                                <th>Adresse</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={styles.tr}>
                                <td>
                                    <span className={styles.id}>{order._id}</span>
                                </td>
                                <td>
                                    <span className={styles.name}>{order.customer}</span>
                                </td>
                                <td>
                                    <span className={styles.address}>{order.address}</span>
                                </td>
                                <td>
                                    <span className={styles.total}>${order.total}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.row}>
                    <div className={statusClass(0)}>
                        <Image src="/img/bake.png" width={30} height={30} alt="Icone paiement"/>
                        <span>Paiement</span>
                        <div>
                            <Image className={styles.checkedIcon} src="/img/checked.png" width={20} height={20} alt="Icone Effectué"/>
                        </div>
                    </div>
                    <div className={statusClass(1)}>
                        <Image src="/img/paid.png" width={30} height={30} alt="Icone paiement"/>
                        <span>Préparation</span>
                        <div>
                            <Image className={styles.checkedIcon} src="/img/checked.png" width={20} height={20} alt="Icone Effectué"/>
                        </div>
                    </div>
                    <div className={statusClass(2)}>
                        <Image src="/img/bike.png" width={30} height={30} alt="Icone paiement"/>
                        <span>En route</span>
                        <div>
                            <Image className={styles.checkedIcon} src="/img/checked.png" width={20} height={20} alt="Icone Effectué"/>
                        </div>
                    </div>
                    <div className={statusClass(3)}>
                        <Image src="/img/delivered.png" width={30} height={30} alt="Icone paiement"/>
                        <span>Livré</span>
                        <div>
                            <Image className={styles.checkedIcon} src="/img/checked.png" width={20} height={20} alt="Icone Effectué"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
            <div className={styles.wrapper}>
                    <h2 className={styles.title}></h2>
                    {/* <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Sous-total:</b> $78.45
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Remise:</b> $0.0
                    </div> */}
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b> ${order.total}
                    </div>
                    <div className={styles.button}>
                        <div>
                            <Image className={styles.checkedIcon} src="/img/checked.png" width={20} height={20} alt="Icone Effectué"/>
                        </div>
                        COMMANDE PASSÉE
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async({params}) =>{
    const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`)
    return{
      props: {
        order: res.data,
      },
    };
}

export default Order;