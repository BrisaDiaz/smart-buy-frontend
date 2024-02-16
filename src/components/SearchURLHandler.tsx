import {ReactNode, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../hooks/useStore';
import {getValidSearchParams} from '../utils';
import { setSearchQuery, setMarkets } from '../features/market/marketSlice';
export default function SearchURLHandler({
  children,
}: {
  children: ReactNode;
}) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const marketSearch = useAppSelector((state) => state.marketSearch);

  useEffect(() => {
    const { markets, query } = getValidSearchParams();

    dispatch(setSearchQuery(query || marketSearch.searchQuery));
    dispatch(setMarkets(markets.length ? markets : marketSearch.markets));
  }, [location]);

  return <div>{children}</div>;
}
