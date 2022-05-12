import {Typography, Button} from "antd";

import {logoTable} from "../constants";

export default function ProductsDetails({
  product,
  onTrack,
  loading,
}: {
  loading: boolean;
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
  onTrack: () => void;
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
          <div
            className={`product__state-color ${
              product?.id ? "product__state-color--active" : "product__state-color--inactive"
            }`}
          />{" "}
          <p className={`product__state`}>{product?.id ? "Activo" : "Untracked"}</p>
        </div>
        <a href={product?.link} rel="noreferrer" target="_blank">
          Ver producto en {product?.market}
        </a>
        {product?.createdAt && product?.updatedAt ? (
          <>
            <p>Trackeado el {new Date(product?.createdAt).toLocaleDateString()}</p>
            <p>
              Última actualización {new Date(product?.updatedAt).toLocaleDateString()} a las{" "}
              {new Date(product?.updatedAt).toLocaleTimeString()}
            </p>
          </>
        ) : (
          <Button
            className="action-bottom"
            loading={loading}
            shape="round"
            size="large"
            type="primary"
            onClick={() => onTrack()}
          >
            Iniciar seguimiento
          </Button>
        )}
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
      .product__state-color--inactive{
            background: #f44336;
      }
         .product__state-color--active{
            background: #009688
      }
      .product__state{
        margin:0 ;
            font-weight: 600;
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
