import React from 'react';

import "./footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <p>© Royal Mail Group Limited {new Date().getFullYear()}</p>
    </footer>
  );
}
