import React from 'react';
import { useZipInformationQuery } from './utils/__generated__/graphql';

export const App: React.FC = () => {
  const { loading, error, data } = useZipInformationQuery({
    variables: { country: 'us', zipCode: '91403' },
  });

  // TODO: add loading state
  // TODO: add error state
  return loading ? (
    <div>hi</div>
  ) : error ? (
    <div>hi</div>
  ) : (
    <div>{data?.zipInformation?.city}</div>
  );
};
