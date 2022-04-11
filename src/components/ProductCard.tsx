import {Tooltip, Card, Avatar} from "antd";
import {Link} from "react-router-dom";
import { generateProductUrl } from "../utils";
import { Product } from "../interfaces";
import { logoTable } from "../constants";
export default function ProductCard({ product }: { product: Product }) {
  return (
    <>
      <Card
        key={product.link}
        className="product__card"
        cover={
          <img
            alt={product.title}
            className="product__img"
            src={product.image}
          />
        }
      >
        <Card.Meta
          avatar={
            <Tooltip title={product.market}>
              <Avatar
                className="product__market"
                src={logoTable[product.market]}
              />
            </Tooltip>
          }
          description={
            <div className="product__meta">
              <span className="product__price">
                ${new Intl.NumberFormat("es-ES").format(product.price)}
              </span>
            </div>
          }
          title={
            <Link
              className="product__link"
              state={product}
              to={generateProductUrl(product)}
            >
              <h2 className="product__name">{product.title}</h2>
            </Link>
          }
        />
      </Card>
      <style>
        {`
  .product__card{
    box-shadow:0 1px 1px 0 rgb(0 0 0 / 10%);
    overflow: hidden;
    transition:all 0.3s ease;
      }
      .product__card:hover,.product__card:focus-within{
        box-shadow:0 7px 11px 0 rgb(0 0 0 / 10%), 0 2px 4px 0 rgb(0 0 0 / 10%);
      }
      .product__card .ant-card-meta-title{
            white-space: pre-wrap;
      }
      .product__img{
          width: 150px;
    height: 150px;
    object-fit: contain;
    padding: 1rem 0 1rem 1rem;
    margin: 0 auto;
      }
      .product__name{ 
    font-size: 16px;
    color:inherit;
   
      }
        
      .product__meta{
            display: flex;
    gap: 1rem;
    justify-content: space-between;;
        text-transform: capitalize;

}

      .product__price{ 
        color:var(--secondary);
    font-weight: 600;
          background: var(--secondary-transparent);
    padding: 2px 6px;
    border-radius: 2px;
    border: 1px solid transparent;
      }

.product__market{
position: absolute;
    top: 10px;
    transform: scale(1.5)
      }
  .product__market img{
        object-fit: contain;
        
      }
      `}
      </style>
    </>
  );
}
