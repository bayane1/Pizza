import Head from 'next/head';
import axios from 'axios';
import styles from '@/styles/Home.module.css';
import Featured from '@/components/Featured';
import PizzaList from '@/components/PizzaList';
import Product from '@/models/Product';
import dbConnect from '@/util/mongo';


const Home = ({pizzaList, admin}) => {
  return (
    <>
      <div id='home' className={styles.container}>
        <Head>
          <title>Pizzeria Marconi</title>
          <meta name="description" content="La meilleure pizza à Ottawa" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Featured />
      <PizzaList pizzaList={pizzaList} />
      </div>
    </>
  );
}


export const getServerSideProps = async(ctx) =>{
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

await dbConnect();

  const products = await Product.find();
  return {
    props: {
      pizzaList: JSON.parse(JSON.stringify(products)),
      admin,
    },
  };
}

export default Home;
