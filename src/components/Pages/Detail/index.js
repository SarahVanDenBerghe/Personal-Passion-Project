import React, { useState } from 'react';
import { Sidebar } from '../../UI';
import { DetailInfo } from '../../Content';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <Sidebar active={active} setActive={setActive}>
        <DetailInfo active={active} setActive={setActive} />
      </Sidebar>
    </>
  );
};

export default Detail;
