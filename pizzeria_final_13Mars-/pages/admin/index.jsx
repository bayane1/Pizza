import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import AddButton from '@/components/AddButton';
import Add from "@/components/Add";


const Index = ({ orders, products}) => {

  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["En préparation", "En route", "Livré"];
  const [close, setClose] = useState(true);

  const handleDelete = async (id) => {
      console.log(id);
      try {
        const res = await axios.delete(
          "/api/products/" + id
        );
        setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
      } catch (err) {
        console.log(err);
      }
  };

  
  // const handleUpdate = async (id) => {
  //   console.log(id);
  //   const item = pizzaList.filter((pizza) => pizza._id === id)[0];
  //     const currentTitle = item.title;
  //     const currentImg = item.img;
  //     const currentPrices= item.prices;
  //     const currentDesc = item.desc;
  //     const currentExtra = item.extraOptions

  //   try {
  //     const res = await axios.put(
  //       "http://127.0.0.1:3000/api/products/" + id ,{
  //         title: currentTitle,
  //         Desc: currentDesc,
  //         img: currentImg,
  //         prices: currentPrices,
  //         extraOptions: currentExtra

  //       });
        
  //     setPizzaList(res.data,
  //       ...pizzaList.filter((pizza) => pizza._id !== id),);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  
  
  const handleStatus = async (id) => {
      const item = orderList.filter((order) => order._id === id)[0];
      const currentStatus = item.status;
  
      try {
        const res = await axios.put("/api/orders/" + id, {
          status: currentStatus<2 ? currentStatus + 1 : currentStatus,
        });
        setOrderList([
          res.data,
          ...orderList.filter((order) => order._id !== id),
        ]);
      } catch (err) { 
        console.log(err);
      }
  };

  return (
    <div className={styles.container}>
        <div className={styles.item}>
            <h1 className={styles.title}>Produits</h1>
            {<AddButton setClose={setClose} />}
            {!close && <Add setClose={setClose} />}
            <table className={styles.table}>
            <thead>
                <tr className={styles.trTitle}>
                <th>Image</th>
                <th className={styles.identification}>Id</th>
                <th>Titre</th>
                <th>Prix</th>
                <th>Action</th>
                </tr>
            </thead>
            {pizzaList.map((product) => (
                <tbody key={product._id}>
                <tr className={styles.trTitle}>
                    <td>
                    <Image
                        src={product.img}
                        width={50}
                        height={50}
                        alt="Photo de la pizza"
                    />
                    </td>
                    {/* <td>{product._id.slice(0, 5)}...</td> */}
                    <td className={styles.identification}>{product._id}</td>
                    <td>{product.title}</td>
                    <td>${product.prices[0]}-${product.prices[1]}-${product.prices[2]}</td>
                    <td>
                    {/* <button className={styles.button}
                      onClick={() =>{
                        setClose(false),
                      handleUpdate(product._id)}
                      } 
                    >Modifier
                    </button> */}
                    <button  className={styles.button}
                      onClick={() => handleDelete(product._id)}
                    >
                    Supprimer
                    </button>
                    </td>
                </tr>
                </tbody>
            ))}
            </table>
        </div>
        <div className={styles.item}>
            <h1 className={styles.title}>Commandes</h1>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.trTitle}>
                    <th className={styles.identification}>Id</th>
                    <th>Client</th>
                    <th>Total</th>
                    <th>Paiement</th>
                    <th>Statut</th>
                    <th>Action</th>
                    </tr>
                </thead>
                {orderList.map((order) => (
                <tbody key={order._id}>
                <tr className={styles.trTitle}>
                  <td className={styles.identification}>{order._id}</td>
                  {/* <td>{order._id.slice(0, 5)}...</td> */}
                  <td>{order.customer}</td>
                  <td>${order.total}</td>
                  <td>
                  {order.method === 0 ? <span>espèce</span> : <span>payé</span>}
                  </td>
                  <td>{status[order.status]}</td>
                  <td>
                    <button className={styles.btn} onClick={() => handleStatus(order._id)}>
                        Suivant
                    </button>
                  </td>
                </tr>
            </tbody>
            ))}
        </table>
      </div>
    </div>
  );      
}

export const getServerSideProps = async (ctx) => {
  
 const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
     redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  
  const productRes = await axios.get("http://127.0.0.1:3000/api/products");
  const orderRes = await axios.get("http://127.0.0.1:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;