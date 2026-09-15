import React, { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%'
});

const LazyLoader = (Component: React.LazyExoticComponent<React.ComponentType<unknown>>) => {
  const Wrapped = (props: Record<string, unknown>) => (
    <Suspense
      fallback={
        <LoaderWrapper>
          <LinearProgress />
        </LoaderWrapper>
      }
    >
      <Component {...props} />
    </Suspense>
  );

  return Wrapped;
};

export default LazyLoader;
