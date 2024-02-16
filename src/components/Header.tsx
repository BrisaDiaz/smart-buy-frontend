import { Layout, Input, message } from 'antd';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

import { useLazyGetProductsByMarketsQuery } from '../services';
import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import { generateSearchUrl } from '../utils';
import { setSearchQuery } from '../features/market/marketSlice';
import logo from '../public/logo.png';
export default function Header({ loading }: { loading?: boolean }) {
  const navigate = useNavigate();
  const marketSearch = useAppSelector((state) => state.marketSearch);
  const dispatch = useAppDispatch();
  const [trigger] = useLazyGetProductsByMarketsQuery({
    refetchOnFocus: false,
  });
  const handleSearch = async (search: string) => {
    if (!marketSearch.markets.length) {
      message.warning('Por favor seleccione algún supermercado');
    } else if (!search) {
      message.warning('Por favor inserte el producto a buscar');
    } else {
      await trigger(
        {
          searchQuery: search,
          markets: marketSearch.markets,
        },
        true,
      );
    }

    navigate(generateSearchUrl({ search: search?.trim() }));
    dispatch(setSearchQuery(search?.trim()));
  };
  const [params] = useSearchParams();

  return (
    <>
      <Layout.Header className='header'>
        <div className='header__inner'>
          <Link to='/'>
            <img alt='home' className='logo' src={logo} />
          </Link>

          <Input.Search
            enterButton
            className='search-bar'
            defaultValue={params.get('query') || ''}
            loading={loading || false}
            placeholder='Buscar producto'
            size='large'
            onSearch={handleSearch}
          />
        </div>
      </Layout.Header>
      <style>{`.search-bar {max-width:500px},.header{height:auto}`}</style>
    </>
  );
}
