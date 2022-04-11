import React from "react";
import {useLocation, useNavigate, Link} from "react-router-dom";
import {useQuery, useMutation} from "react-query";
import {Breadcrumb, message} from "antd";

import {extractProductDataFromParams} from "../utils";
import ProductsDetails from "../components/ProductDetails";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import {getTrackedProduct, createProductRecord} from "../services/tracker";
import {TrackedProduct, TrackedPrice, Product} from "../interfaces";
import Header from "../components/Header";
import LinearChart from "../components/LinearChart";
export default function ProductPage() {
  const location = useLocation();
  const statedProduct =
    (location.state as Product | null) ||
    (extractProductDataFromParams(location.search) as Product | undefined);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!statedProduct) return navigate("/404", {replace: true});
  }, []);
  const notification = (type: "success" | "error", content: string) => {
    if (type === "success") return message.success(content);
    message.error(content);
  };
  const [product, setProduct] = React.useState<{
    createdAt?: string;
    updatedAt?: string;
    price: number;
    title: string;
    image: string;
    link: string;
    market: string;
    id?: string;
  } | null>((statedProduct as Product) || null);
  const [priceHistory, setPriceHistory] = React.useState<
    {createdAt: string; value: number; productId: string}[]
  >([]);
  const trackedProductRequest = useQuery(
    ["product", statedProduct ? statedProduct?.link : ""],
    () => getTrackedProduct(product?.link || ""),
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (data: {product: TrackedProduct; priceHistory: TrackedPrice[]}) => {
        setPriceHistory(data.priceHistory);
        setProduct(data.product);
      },
    },
  );
  const createRecordRequest = useMutation(
    () =>
      createProductRecord(
        product as {
          price: number;
          title: string;
          image: string;
          link: string;
          market: string;
        },
      ),
    {
      onSuccess: (productRecord) => {
        setProduct(productRecord);
        notification("success", "Se ha inizializado el seguiminto de precios de forma exitosa");
      },
      onError: () => {
        notification(
          "error",
          "Devido a un error no se ha podido inizializar el seguiminto de precios",
        );
      },
    },
  );

  const handleInitTracking = async () => {
    await createRecordRequest.mutate();
  };

  function getPriceVariation(currentPrice: number, priceHistory: TrackedPrice[]) {
    const lastVariation =
      priceHistory.find((price) => price.value !== currentPrice)?.value || currentPrice;
    const difference = currentPrice - lastVariation;

    return {
      trend: difference === 0 ? "equal" : difference > 0 ? "increase" : "decrease",
      value: Math.abs(difference),
    };
  }
  const priceVariation =
    priceHistory.length > 1
      ? getPriceVariation(product?.price as number, priceHistory)
      : {trend: "increase", value: 0};

  if (!statedProduct) return <div />;

  return (
    <>
      {" "}
      <Header />
      <main className="page">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link
              to="/search"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              {" "}
              Search
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{product?.title}</Breadcrumb.Item>
        </Breadcrumb>
        {product && !trackedProductRequest.isLoading && (
          <ProductsDetails
            loading={createRecordRequest.isLoading}
            product={product}
            onTrack={handleInitTracking}
          />
        )}
        {product && trackedProductRequest.isLoading && <ProductDetailsSkeleton product={product} />}
        {priceHistory.length > 1 && (
          <section>
            <div className="chart__summary">
              {priceVariation.trend === "equal" ? (
                <p>No sea ha detectado una variación de precio</p>
              ) : (
                <p>
                  En la última variación el precio{" "}
                  <span
                    className={`price__trend ${
                      priceVariation.trend === "increase"
                        ? "price__trend--increase"
                        : "price__trend--decrease"
                    }`}
                  >
                    {priceVariation.trend === "increase" ? "subió" : "bajó"}
                  </span>{" "}
                  <strong>${priceVariation.value} </strong> con respecto al anterior.
                </p>
              )}
            </div>
            <div className="chart__container">
              <div className="chart__inner">
                <LinearChart chartData={priceHistory} />
              </div>
            </div>
          </section>
        )}
        <style>{`
           .page{
     
    padding:  1rem 2rem;
    max-width: 1250px;
    width: 100%;
    margin: 0 auto ;
      }
   
      .chart__container{
overflow-x: auto;

      }
      .chart__summary{
    
        padding:1rem 0;
        font-size: 15px;
    font-weight: 500;
      }
       .chart__inner{
    min-width:800px;

      }
      .price__trend{
text-decoration: 2px solid underline;
    text-underline-offset: 2px;
  
      }
      .price__trend--increase{
  text-decoration-color:  #f44336;
      }
      .price__trend--decrease{
  text-decoration-color:#009688;
      }

      `}</style>
      </main>
    </>
  );
}
