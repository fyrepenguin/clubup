/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { MdHome } from 'react-icons/md';

const Navbar = () => {
  return (
    <nav
      css={css`
        background: #f5ebdc;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          max-width: 1200px;
          padding: 1rem 2rem;
          margin: 0 auto;
          align-items: center;
        `}
      >
        <Link
          to="/"
          css={css`
            text-decoration: none;
            color: inherit;
            display: flex;
            align-items: center;
            gap: 0.25rem;
            svg {
              width: 2rem;
            }
          `}
        >
          <MdHome /> Home
        </Link>
        <button
          css={css`
            background: var(--yellow);
            color: #fff;
          `}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
