import {ReactNode, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../hooks/useStore';
import {getValidSearchParams} from '../utils';
import {setSearchQuery, setMarkets} from '../features/market/marketSlice';
import {Market} from '../interfaces';
export default function SearchURLHandler({children}: {children: ReactNode}) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const marketSearch = useAppSelector((state) => state.marketSearch);

  useEffect(() => {
    const {markets, query} = getValidSearchParams();

    if (marketSearch.searchQuery !== query) dispatch(setSearchQuery(query));
    if (markets?.join('') !== marketSearch?.markets?.join(''))
      dispatch(setMarkets(markets as Market[]));
  }, [location]);

  return <div>{children}</div>;
}
