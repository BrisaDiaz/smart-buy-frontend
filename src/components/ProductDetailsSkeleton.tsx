import {Typography, Skeleton} from "antd";

import {logoTable} from "../constants";

export default function ProductsDetails({
  product,
}: {
  product: {
    createdAt?: string;
    updatedAt?: string;
    price?: number;
    title: string;
    image?: string;
    link: string;
    market?: string;
    id?: string;
  };
}) {
  return (
    <article className="product">
      <div className="product__info">
        <div className="product__header">
          {product?.price ? (
            <p className="product__price"> ${product?.price}</p>
          ) : (
            <p className="product__price">
              $
              <Skeleton active={true} className="price-skeleton" paragraph={false} title={true} />
            </p>
          )}
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
          Ver en la página del producto
        </a>
        <Skeleton active={true} className="product__meta-skeleton" paragraph={true} title={false} />
      </div>
      <div className="product__img-container">
        <div className="product__img-inner">
          {product.image ? (
            <img alt={product?.title} className="product__img " src={product?.image} />
          ) : (
            <Skeleton.Image className="product__img-skeleton " />
          )}
          {product?.market ? (
            <img className="product__market" src={logoTable[product?.market]} />
          ) : (
            <Skeleton.Avatar active={true} className="product__market" size="large" />
          )}
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
      .product__title{    font-size: 1.125rem !important;    font-weight: 500 !important;margin:0;
      text-transform:capitalize
      }
      .product__price{
            font-size: 1.5rem;
            font-weight:700;
            margin:0
      }
        .price-skeleton {
    display: inline-block;
      width: 80px;
          margin:0 5px;
        }
      .price-skeleton .ant-skeleton-title{
          width: 80px;
height: 20px;
    margin:0;
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
      .product__img-skeleton .ant-skeleton-image{
     width: 200px;
    height: 200px;
    margin-right: 10px;
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
