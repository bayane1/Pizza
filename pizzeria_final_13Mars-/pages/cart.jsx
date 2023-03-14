import styles from "../styles/Cart.module.css"
import Image from "next/image"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { reset } from "@/redux/cartSlice";
import OrderDetail from "@/components/OrderDetail";


const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [open, setOpen] = useState(false);
    const [cash, setCash] = useState(false);
    const amount = cart.total;
    const currency = "USD";
    const style = {"layout":"vertical"};
    const router = useRouter();

    const createOrder = async (data) => {
        try {
          const res = await axios.post("/api/orders", data);
        
          res.status === 200 && router.push("/orders/" + res.data._id); 
          dispatch(reset());
        //     if (res.status === 200) {
        //     dispatch(reset());
        //     router.push(`/order/${res.data._id}`);
        //   }
        } catch (err) {
          console.log(err);
        }
    };
    
    const ButtonWrapper = ({ currency, showSpinner }) => {
  
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
        }, [currency, showSpinner]);
        return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={async (data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={async function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        const shipping = details.purchase_units[0].shipping;
                        createOrder({
                            customer: shipping.name.full_name,
                            address: shipping.address.address_line_1,
                            total: cart.total,
                            method: 1,
                        });
                    });
                }}
            />
        </>
        );
    }

    return (
      <>
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tr}>
                            <th>Produit</th>
                            <th>Nom</th>
                            <th className={styles.none}>Extras</th>
                            <th className={styles.none}>Prix</th>
                            <th>Quantité</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {cart.products.map((product) => (
                        <tr key={product._id}>
                            <td>
                                <div className={styles.imgContainer}>
                                    <Image className={styles.img} src={product.img} alt="photo pizza" fill/>
                                </div>
                            </td>
                            <td>
                                <span className={styles.name}>{product.title} </span>
                            </td>
                            <td className={styles.none}>
                                <span className={styles.extras}>
                                    {product.extras.map(extra =>(
                                        <span key={extra._id}>{extra.text}, </span>
                                    ))} 
                                </span>
                            </td>
                            <td className={styles.none}>
                                <span className={styles.price}>${product.price} </span>
                            </td>
                            <td>
                                <span className={styles.quantity}>{product.quantity}</span>
                            </td>
                            <td>
                                <span className={styles.total}>${product.price * product.quantity }</span>
                            </td>
                        </tr>
                        ))}
                    </tbody>                  
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>Montant à payer</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>total pizza(s) : </b> ${cart.total}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Livraison : </b> $5
                    </div>
                    
                    {/* <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Sous-total:</b> ${cart.total}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Remise:</b> $0.0
                    </div> */}
                    <h2 className={styles.titleG}>Total : ${cart.total + 5}</h2>
                   
                    {open ? (
                        <div className={styles.paymentMethods}>
                            <button className={styles.payButton} onClick={() => setCash(true)}>
                            PAYER À LA LIVRAISON
                            </button>
                            <PayPalScriptProvider
                                 options={{
                                    "client-id": "Ad-EHLxBykMJ-Uh1Bi2fC5mUevk-A9slT3OBXOPmlhOHmgP410Crksn_Kqnvg0PHZVzSXMYx32SMpfB-",
                                    components: "buttons",
                                    currency: "USD",
                                    intent: 'capture',
                                    'disable-funding': 'credit,card,p24',
                                }}
                                >
                            <ButtonWrapper
                                currency={currency}
                                showSpinner={false}
                            />
                        </PayPalScriptProvider>
                    </div>    
                    ) : (
                        <button onClick={() => setOpen(true)} className={styles.button}>
                            Payer maintenant
                        </button>
                    )}
                </div>
            </div>
            {cash && <OrderDetail total={cart.total} createOrder={createOrder} setCash={setCash}/>}
        </div>
      </>
    )
}

export default Cart;