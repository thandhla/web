import React, { FC } from 'react';

interface CICaution {
  details: string;
  text: string;
}

const Caution: FC<CICaution> = ({ details, text }) => {
  const style = {
    cursor: 'pointer'
  };
  
  return <div style={style} title={details}>/!\ {text}</div>;
}

export default Caution;
