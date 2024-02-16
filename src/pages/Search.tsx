import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Typography, Layout, Checkbox, message, Collapse } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { v4 as uuid } from 'uuid';

import { generateSearchUrl } from '../utils';
import Cart from '../components/svg/Cart';
import ErrorMessage from '../components/ErrorMessage';
import ProductSkeleton from '../components/ProductCartSkeleton';
import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { Product, Market } from '../interfaces';
import { MARKET_OPTIONS } from '../constants';
import { useGetProductsByMarketsQueryState } from '../services';
import { setMarkets } from '../features/market/marketSlice';
const { Content } = Layout;

const { Title, Paragraph } = Typography;
const CheckboxGroup = Checkbox.Group;

function App() {
  const navigate = useNavigate();
  const marketSearch = useAppSelector((state) => state.marketSearch);
  const dispatch = useAppDispatch();

  const result = useGetProductsByMarketsQueryState({
    searchQuery: marketSearch.searchQuery,
    markets: marketSearch.markets,
  });

  const [products, setProducts] = React.useState<Product[]>([]);
  const [isCollapseActive, setIsCollapseActive] =
    React.useState<boolean>(false);
  const [error, setError] = React.useState<'404' | '500' | ''>('');

  React.useEffect(() => {
    if (result.isError && result.error?.name !== 'AbortError') {
      setError('500');
      setProducts([]);

      return;
    }
    if (result.isSuccess) {
      const data: { total: number; products: Product[] } = result.data;

      setProducts(data.products);

      if (data.total === 0) return setError('404');
      setError('');
    }
  }, [result]);

  const warning = (content: string) => {
    message.warning(content);
  };

  const onMarketSelectChange = (list: CheckboxValueType[]) => {
    if (list.length > 3) {
      return warning(
        'Como máximo solo se es permitido consultar en tres supermercados a la misma vez.',
      );
    }
    dispatch(setMarkets(list as Market[]));
    navigate(generateSearchUrl({ markets: list }));
  };

  const handleCollapse = () => {
    if (window.innerWidth < 1023) {
      setIsCollapseActive((isActive) => !isActive);
    }
  };

  React.useEffect(() => {
    setIsCollapseActive(window.innerWidth > 1023);
  }, []);

  return (
    <Layout className='page'>
      <Header loading={result.isFetching} />
      <section>
        <Content className='content'>
          <div onClick={handleCollapse}>
            <Collapse
              activeKey={[isCollapseActive ? '1' : '']}
              bordered={false}
              className='select-markets__section'
            >
              <Collapse.Panel
                key='1'
                className='collapse-panel__header'
                header='En donde deseas consultar?'
              >
                <CheckboxGroup
                  defaultValue={marketSearch.markets}
                  options={MARKET_OPTIONS}
                  onChange={onMarketSelectChange}
                />
              </Collapse.Panel>
            </Collapse>
          </div>
          {!result.isFetching && !error && products.length === 0 && (
            <section className='cart__illustration'>
              <Cart />
            </section>
          )}
          {result.isFetching && (
            <section className='search__results'>
              <div className='search__meta'>
                <Title level={1}>{marketSearch.searchQuery}</Title>
                <Paragraph type='secondary'>
                  Cosas buenas necesitan tiempo...
                </Paragraph>
              </div>
              <section className='products__grind skeleton__grid'>
                {new Array(9).fill(1).map((el, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </section>
            </section>
          )}

          {error && !result.isFetching && <ErrorMessage status={error} />}

          {products.length > 0 && !error && !result.isFetching && (
            <section className='search__results'>
              <div className='search__meta'>
                <Title level={1}>{marketSearch.searchQuery}</Title>
                {result.isFetching ? (
                  <Paragraph type='secondary'>
                    Cosas buenas necesitan tiempo...
                  </Paragraph>
                ) : (
                  <Paragraph type='secondary'>
                    {products.length} resultados
                  </Paragraph>
                )}
              </div>
              <section className='products__grind'>
                {products.map((product) => (
                  <ProductCard key={uuid()} product={product} />
                ))}
              </section>
            </section>
          )}
        </Content>
      </section>

      <style>{`
.page{
     min-height:100vh;
}
 .products__grind{
     min-height: 40vh;
     display: grid;
     gap: 10px;
}
 .content{
     min-height:90vh;
     max-width: 1250px;
     margin: 0 auto;
     padding: 0 1rem;
}
 .search__results{
     margin-bottom:2rem;
}
 .search__meta h1{
     margin-bottom:0;
     font-size: 25px;
     text-transform:capitalize ;
}
 .ant-collapse-header{
     font-weight: 600;
     opacity: 0.95;
     padding: 12px 0 !important;
}
 .select-markets__section{
     margin: 1rem 0;
}
 .select-markets__section span{
     font-size:16px;
}
 .ant-checkbox-group{
     text-transform:capitalize;
}
.ant-btn.confirm-market-btn{
  margin-top: 24px;
    line-height: 1em;
}
 .cart__illustration{
    display: flex;
     align-items: center;
     justify-content: center;
     min-height: 500px;
     padding: 2rem 2rem 4rem 1rem;
     background: #dcdcdc70;
     border-radius:12px;
     margin-top: 1rem;
}
 .cart__illustration svg{
     max-width: 150px;
     opacity: 0.2;
}
 @media(min-width:500px){
     .products__grind{
         grid-template-columns: 1fr 1fr;
    }
}
 @media(min-width:760px){
     .products__grind{
         grid-template-columns: 1fr 1fr 1fr;
    }
     .illustration__section__text{
         max-width: 370px;
    }
}
 @media(min-width:1024px){
     .select-markets__section{
         width: 260px;
         float: left;
         margin:0;
         padding-right:1.5rem;
    }
     .ant-checkbox-group{
         flex-direction:column;
    }
}
      `}</style>
    </Layout>
  );
}

export default App;
