import React from 'react';
import { Link } from 'react-router-dom';

function TdLink({ children, to }) {
  // Conditionally wrapping content into a link
  const ContentTag = to ? Link : 'div';

  return (
    <td>
      <ContentTag className="link" to={to}>{children}</ContentTag>
    </td>
  );
} export default TdLink