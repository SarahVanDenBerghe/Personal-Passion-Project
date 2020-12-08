import React, { Suspense } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../hooks';
import { Bauble } from '..';

const Baubles = observer(({ history, pathname }) => {
  const { baublesStore } = useStore();

  return (
    <>
      {baublesStore.baubles.map((bauble, i) => (
        <Suspense fallback={null}>
          <Bauble key={i} args={[0.2, 10, 10]} bauble={bauble} pathname={pathname} history={history} />
        </Suspense>
      ))}
    </>
  );
});

export default Baubles;
