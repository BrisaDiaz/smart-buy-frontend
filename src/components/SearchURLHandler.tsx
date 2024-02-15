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

    const queryChange = marketSearch.searchQuery !== query;
    const marketChange = markets?.join('') !== marketSearch?.markets?.join('');

    if (queryChange || marketChange) dispatch(setSearchQuery(query));
    if (marketChange) dispatch(setMarkets(markets as Market[]));
  }, [location]);

  return <div>{children}</div>;
}
