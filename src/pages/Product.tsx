import React from 'react';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import {Breadcrumb, message} from 'antd';

import ProductsDetails from '../components/ProductDetails';
import ProductDetailsSkeleton from '../components/ProductDetailsSkeleton';
import {
  useCreateTrackingProductRecordMutation,
  useUpdateTrackingProductPriceMutation,
} from '../services/index';
import {TrackedPrice, Product} from '../interfaces';
import Header from '../components/Header';
import LinearChart from '../components/LinearChart';

interface PartialProduct {
  createdAt?: string;
  updatedAt?: string;
  price?: number;
  title: string;
  image?: string;
  link: string;
  market?: string;
  id?: string;
}
export default function ProductPage() {
  const location = useLocation();

  const statedProduct = location.state as Product | null;

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!statedProduct) return navigate('/404', {replace: true});
  }, []);
  const notification = (type: 'success' | 'error', content: string) => {
    if (type === 'success') return message.success(content);
    message.error(content);
  };

  const [product, setProduct] = React.useState<PartialProduct | null>(
    statedProduct as PartialProduct,
  );

  const [priceHistory, setPriceHistory] = React.useState<TrackedPrice[]>([]);

  const [createTrackingRecord, createTrackingRecordResult] =
    useCreateTrackingProductRecordMutation();

  const [updateProductPrice, updatePriceResult] = useUpdateTrackingProductPriceMutation();
  const handleInitTracking = async () => {
    await createTrackingRecord(product as Product);
  };
  const handleUpdatePrice = async (args: {price?: number; link: string}) => {
    await updateProductPrice(args);
  };

  React.useEffect(() => {
    if (createTrackingRecordResult.data) {
      setProduct(createTrackingRecordResult.data);

      return notification(
        'success',
        'Se ha inizializado el seguiminto de precios de forma exitosa',
      );
    }
    if (createTrackingRecordResult.isError) {
      notification(
        'error',
        'Devido a un error no se ha podido inizializar el seguiminto de precios',
      );
    }
  }, [createTrackingRecordResult]);

  React.useEffect(() => {
    if (updatePriceResult.data) {
      notification('success', 'El historial de precios ha sido correctamente validado');
    }
  }, [updatePriceResult.data]);
  React.useEffect(() => {
    if (!statedProduct) return;
    handleUpdatePrice({
      price: statedProduct?.price,
      link: statedProduct.link,
    });
  }, []);
  React.useEffect(() => {
    if (updatePriceResult.data) {
      setPriceHistory(updatePriceResult.data.priceHistory);
      setProduct(updatePriceResult.data.product);
    }
  }, [updatePriceResult]);

  function getPriceVariation(currentPrice: number, priceHistory: TrackedPrice[]) {
    const lastVariation =
      priceHistory.find((price) => price.value !== currentPrice)?.value || currentPrice;
    const difference = currentPrice - lastVariation;

    return {
      trend: difference === 0 ? 'equal' : difference > 0 ? 'increase' : 'decrease',
      value: Math.abs(difference).toFixed(2),
    };
  }
  const priceVariation =
    priceHistory.length > 1
      ? getPriceVariation(priceHistory[0].value, priceHistory)
      : {trend: 'increase', value: 0};

  if (!statedProduct) return <div />;

  return (
    <>
      {' '}
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
              {' '}
              Search
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumb">{statedProduct?.title}</Breadcrumb.Item>
        </Breadcrumb>
        {product && !updatePriceResult.isLoading && (
          <ProductsDetails
            loading={createTrackingRecordResult.isLoading}
            product={product as Product}
            onTrack={handleInitTracking}
          />
        )}
        {statedProduct && updatePriceResult.isLoading && (
          <ProductDetailsSkeleton product={statedProduct} />
        )}
        {priceHistory.length > 0 && (
          <section>
            <div className="chart__summary">
              {priceVariation.value === 0 ? (
                <p>No sea ha detectado una variación de precio</p>
              ) : (
                <p>
                  En la última variación el precio{' '}
                  <span
                    className={`price__trend ${
                      priceVariation.trend === 'increase'
                        ? 'price__trend--increase'
                        : 'price__trend--decrease'
                    }`}
                  >
                    {priceVariation.trend === 'increase' ? 'subió' : 'bajó'}
                  </span>{' '}
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
 .breadcrumb{
     text-transform:capitalize !important;
}
 .page{
     padding: 1rem 2rem;
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
     text-decoration-color: #f44336;
}
 .price__trend--decrease{
     text-decoration-color:#009688;
}
      `}</style>
      </main>
    </>
  );
}
