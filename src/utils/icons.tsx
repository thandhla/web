import React from 'react';
import {
  FaAlignJustify,
  FaAt,
  FaChevronCircleDown,
  FaFont,
  FaHashtag,
  FaLink,
  FaListUl,
  FaRegCalendarAlt,
  FaVectorSquare
} from "react-icons/fa";
import Caution from '../components/atoms/Caution';

export const fieldIcon = (type: string) => {
  switch (type) {
    case 'line':
      return <FaFont />;
    case 'email':
      return <FaAt />;
    case 'number':
      return <FaHashtag />;
    case 'url':
      return <FaLink />;
    case 'date':
      return <FaRegCalendarAlt />;
    case 'dropdown':
      return <FaChevronCircleDown />;
    case 'multi_select':
      return <FaListUl />;
    case 'textbox':
      return <FaAlignJustify />;
    case 'relation':
      return <FaVectorSquare />;
    default:
      return <Caution details={`No icon found for field type: ${type}`}/>;
  }
};

export const viewIcon = (type: string) => {
  switch (type) {
    case 'table':
      return <FaFont />;
    case 'gallery':
      return <FaAt />;
    default:
      return <div style={{ color: 'red' }}>View type error</div>;
  }
}
