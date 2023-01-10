/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import ClubCard from './ClubCard';
import { css } from '@emotion/react';
import { MdViewList, MdGridView } from 'react-icons/md';
import { Club } from './../index.d';
type Props = {
  data: Club[];
};

const CardList = ({ data }: Props) => {
  console.log({ data });
  const PER_PAGE_LIMIT = 10;
  const [view, setView] = useState('grid');
  const [clubs, setClubs] = useState<Club[]>(data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = (page: number) => {
    if (page === 1) return;
    const start = page * PER_PAGE_LIMIT - PER_PAGE_LIMIT;
    const end = page * PER_PAGE_LIMIT > data.length ? data.length : page * PER_PAGE_LIMIT;
    console.log({ totalPages, start, clubs, page, hasMore });
    if (hasMore) {
      const newClubs = data.slice(start, end);
      console.log({ newClubs });
      setClubs((prev) => [...prev, ...newClubs]);
    }
    setHasMore(page <= totalPages);
  };
  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => (prev < totalPages ? prev + 1 : prev));
    }
  };

  useEffect(() => {
    console.log('fetching');
    fetchData(page);
  }, [totalPages, page]);

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / PER_PAGE_LIMIT));
    setClubs(data.slice(0, PER_PAGE_LIMIT));
    setPage(1);
  }, [data]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [clubs]);

  console.log({ clubs, data });

  return (
    <section
      css={css`
        max-width: 1200px;
        padding: 1rem 2rem;
        margin: 0 auto;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        `}
      >
        <p>{data.length} Clubs Found</p>
        <div
          css={css`
            display: flex;
            gap: 0.5rem;
            .active {
              color: #fff;
              background: var(--yellow);
            }
          `}
        >
          <button onClick={() => setView('list')} className={view === 'list' ? 'active' : ''}>
            <MdViewList />
          </button>{' '}
          <button onClick={() => setView('grid')} className={view === 'grid' ? 'active' : ''}>
            <MdGridView />
          </button>
        </div>
      </div>

      <div
        css={css`
          display: grid;

          grid-template-columns: ${view === 'grid'
            ? 'repeat(auto-fill, minmax(20rem, 1fr))'
            : '1fr'};
          gap: 2rem;
          margin: 0 auto;
        `}
      >
        {clubs.map((item, index) => {
          return <ClubCard data={item} key={index} view={view} />;
        })}
      </div>
    </section>
  );
};

export default CardList;
