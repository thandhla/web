import React from 'react';

interface ICaution {
  details: string;
  text: string;
}

const Caution = ({ details, text }: ICaution) => {
  const style = {
    cursor: 'pointer'
  };
  
  return <div style={style} title={details}>/!\ {text}</div>;
}

export default Caution;
