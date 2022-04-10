import {Typography, Skeleton} from "antd";

import {logoTable} from "../constants";

export default function ProductsDetails({
  product,
}: {
  product: {
    createdAt?: string;
    updatedAt?: string;
    price: number;
    title: string;
    image: string;
    link: string;
    market: string;
    id?: string;
  };
}) {
  return (
    <article className="product">
      <div className="product__info">
        <div className="product__header">
          <p className="product__price"> ${product?.price}</p>
          <Typography.Title className="product__title" level={1}>
            {product?.title}
          </Typography.Title>
        </div>
        <div className="product__state-container">
          <div className={`product__state-color `} />{" "}
          <Skeleton
            active={true}
            className="product__state-skeleton"
            paragraph={false}
            title={true}
          />
        </div>
        <a href={product?.link} rel="noreferrer" target="_blank">
          Ver en {product?.market}
        </a>
        <Skeleton active={true} className="product__meta-skeleton" paragraph={true} title={false} />
      </div>
      <div className="product__img-container">
        <div className="product__img-inner">
          <img alt={product?.title} className="product__img" src={product?.image} />{" "}
          <img className="product__market" src={logoTable[product.market]} />
        </div>
      </div>
      <style>{`
         .product{


    margin: 1rem 0;
            padding:  1rem ;
            display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
      }
      .product__header{
        margin-bottom: 1.2rem;
      }
      .product__title{    font-size: 1.125rem !important;    font-weight: 500 !important;margin:0}
      .product__price{
            font-size: 1.5rem;
            font-weight:700;
            margin:0
      }
      .product__meta-skeleton{
        margin-top:1rem;
      }
      .product__state-container{
    display: flex;
    column-gap: 6px;
    align-items: center;
    height: min-content;
    margin:0.5em 0
}
    
      .product__state-color{
        width: 10px;
        height:10px;
    background: gray;
   
    border-radius: 100%;
      }
    
      .product__state-skeleton{
        margin:0 ;
    width:100px;
      }
      .product__img{
width:180px;

      }
      .product__img-container{
     
            width: 100%;
    flex: 1;
        display: flex;
            justify-content: center;
      }
      .product__img-inner{
   position:relative;
       display: flex;
    align-items: flex-start;
      }
      .product__market{
            

    width: 60px;
      }
      .action-bottom{
        display: block;
    margin: 2rem 0 1rem;
      }
      `}</style>
    </article>
  );
}
