/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { parsePrice } from './../utils/parse';
import { css } from '@emotion/react';
import { Club } from './../index.d';
import { MdLocationPin, MdPeople } from 'react-icons/md';

interface Props {
  data: Club;
  view: string;
}

const ClubCard = ({ data, view = 'grid' }: Props) => {
  const { club, price } = data;
  const { id, name, type, place, coverUrl, meetings, description } = club;

  if (view === 'list') {
    return (
      <div
        css={css`
          display: flex;
          transition: all 0.5s;
          &:hover {
            scale: 1.01;
          }
          box-shadow: 2px 4px 18px 0 rgb(0 0 0 / 10%);
        `}
      >
        <div
          css={css`
            flex: 1 0 25%;
          `}
        >
          <Link
            to={`/club/${id}`}
            css={css`
              position: relative;
              padding-top: 100%;
              height: 100%;
              display: block;
              overflow: hidden;
              img {
                transition: all 0.3s ease-in-out;
                width: 100%;
                height: 100%;
                object-fit: cover;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 2;
              }
            `}
          >
            <img src={coverUrl} alt={name} />
          </Link>
        </div>
        <div
          css={css`
            padding: 1rem;
            flex: 1 0 60%;
            p {
              margin-top: 0.5rem;
              margin-bottom: 0.5rem;
            }
          `}
        >
          <Link
            to={`/club/${id}`}
            css={css`
              text-decoration: none;
              color: inherit;
              &:hover {
                color: var(--yellow);
              }
            `}
          >
            <h2>{name}</h2>
          </Link>
          <p>{description}</p>
          <div>
            <div
              css={css`
                p {
                  display: flex;
                  gap: 0.5rem;
                  align-items: center;
                }
              `}
            >
              <p>
                <MdLocationPin />
                {place}
              </p>

              <p>
                <MdPeople />{' '}
                {meetings.length + ` ${meetings.length === 1 ? 'meeting' : 'meetings'}`}
              </p>

              {/* <p>{partners.length + ` ${partners.length === 1 ? 'partner' : 'partners'}`}</p> */}
            </div>
          </div>

          <p
            css={css`
              font-size: 1.25rem;
            `}
          >
            {parsePrice(price)}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      css={css`
        box-shadow: 2px 4px 18px 0 rgb(0 0 0 / 10%);
      `}
    >
      <Link
        to={`/club/${id}`}
        css={css`
          flex: 1 0 40%;
        `}
      >
        <div
          css={css`
            position: relative;
            padding-top: 56.25%;
            overflow: hidden;
            &:hover {
              img {
                scale: 1.05;
              }
            }
            img {
              transition: all 0.3s ease-in-out;
              width: 100%;
              height: 100%;
              object-fit: cover;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 2;
            }
            p {
              position: absolute;
              top: 0;
              left: 0;
              background-color: rgba(0, 0, 0, 1);
              color: rgba(255, 255, 255, 1);
              padding: 0.2rem 0.5rem;
              z-index: 2;
              display: ${view === 'grid' ? 'block' : 'none'};
            }
          `}
        >
          <img src={coverUrl} alt={name} />
          <p>{type}</p>
        </div>
      </Link>
      <div
        css={css`
          padding: 1rem;
          flex: 1 0 60%;
          p {
            margin-top: 0.75rem;
            margin-bottom: 0.5rem;
          }
        `}
      >
        <Link
          to={`/club/${id}`}
          css={css`
            text-decoration: none;
            color: inherit;
            &:hover {
              color: var(--yellow);
            }
          `}
        >
          <h2>{name}</h2>
        </Link>
        <p>{description}</p>
        <div>
          <div
            css={css`
              p {
                display: flex;
                gap: 0.5rem;
                align-items: center;
              }
            `}
          >
            <p>
              <MdLocationPin />
              {place}
            </p>

            <p>
              <MdPeople /> {meetings.length + ` ${meetings.length === 1 ? 'meeting' : 'meetings'}`}
            </p>

            {/* <p>{partners.length + ` ${partners.length === 1 ? 'partner' : 'partners'}`}</p> */}
          </div>
        </div>

        <p
          css={css`
            font-size: 1.25rem;
          `}
        >
          {parsePrice(price)}
        </p>
      </div>
    </div>
  );
};

export default ClubCard;
