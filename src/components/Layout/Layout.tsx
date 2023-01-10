/** @jsxImportSource @emotion/react */
import React from 'react';
import Navbar from './Navbar';
import { css } from '@emotion/react';

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      {children}
      <footer
        css={css`
          text-align: center;
          padding: 1rem;
          background: #dedede;
          margin-top: 2rem;
        `}
      >
        &copy; ClubUp 2023
      </footer>
    </div>
  );
};

export default Layout;
