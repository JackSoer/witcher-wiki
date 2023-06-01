import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__copyright-section">
        <Link to="/">
          <img
            src="../public/assets/icons/witcher-medalion.png"
            alt="Something went wrong"
            className="footer__logo"
          />
        </Link>
        <div className="footer__copyright-section-text">
          <p className="footer__witcher-wiki-def">
            The Withcer Wiki is a Dedicated Gaming Community.
          </p>
          <p className="footer__copyright-text">&copy; 2023 The Witcher Wiki</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
