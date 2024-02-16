import { ReactNode, useEffect } from 'react';

import { useLazyGetProductsByMarketsQuery } from '../services';
import { useAppDispatch } from '../hooks/useStore';
import { getValidSearchParams } from '../utils';
import { setSearchQuery, setMarkets } from '../features/market/marketSlice';
export default function SearchURLHandler({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [trigger] = useLazyGetProductsByMarketsQuery({
    refetchOnFocus: false,
  });

  useEffect(() => {
    const { markets, query } = getValidSearchParams();

    dispatch(setSearchQuery(query));
    dispatch(setMarkets(markets));
    if (markets.length === 0 || !query) return;
    trigger({ markets, searchQuery: query });
  }, []);

  return <div>{children}</div>;
}
