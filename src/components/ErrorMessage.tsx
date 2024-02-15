import {Result} from 'antd';
import React from 'react';
export default function ErrorMessage({
  status,
  message,
  children,
}: {
  status: '500' | '404' | '';
  message?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      {' '}
      {status === '500' ? (
        <Result
          status="500"
          title={message || 'Lo sentimos, algo salío mal en el lado del servidor.'}
        />
      ) : (
        <Result
          extra={children}
          status="404"
          title={message || 'El producto que buscas no fue encontrado.'}
        />
      )}
    </>
  );
}
