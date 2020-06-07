import React from 'react';
import * as FA from "react-icons/fa";

export const fieldIcon = (type: string) => {
  switch (type) {
    case 'line':
      return <FA.FaFont />;
    case 'email':
      return <FA.FaAt />;
    case 'number':
      return <FA.FaHashtag />;
    case 'link':
      return <FA.FaLink />;
    case 'date':
      return <FA.FaRegCalendarAlt />;
    case 'dropdown':
      return <FA.FaChevronCircleDown />;
    case 'multi_select':
      return <FA.FaListUl />;
    case 'textbox':
      return <FA.FaAlignJustify />;
    case 'relation':
      return <FA.FaVectorSquare />;
    default:
      throw new Error('Unkmown fied type: ' + type);
  }
};

export const viewIcon = (type: string) => {
  switch (type) {
    case 'table':
      return <FA.FaFont />;
    case 'gallery':
      return <FA.FaAt />;
    default:
      return <div style={{ color: 'red' }}>View type error</div>;
  }
}