/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parseDate, parsePrice } from './../utils/parse';
import Layout from './../components/Layout/index';
import { Club, Meeting } from '../index.d';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const ClubPage = () => {
  const { clubId } = useParams();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [clubData, setClubData] = useState<Club>();

  const getClub = (id: string): Club => {
    return clubs.filter(({ club }: Club) => club.id === id)[0];
  };

  useEffect(() => {
    const club = getClub(String(clubId));
    setClubData(club);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clubs]);
  const fetchData = async () => {
    return await fetch(' https://api.json-generator.com/templates/ePNAVU1sgGtQ/data', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 22swko029o3wewjovgvs9wcqmk8p3ttrepueemyj',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClubs(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!clubData) {
    return (
      <Layout>
        <div
          css={css`
            text-align: center;
            margin-top: 3rem;
          `}
        >
          loading...
        </div>
      </Layout>
    );
  }
  const { club, price } = clubData;
  const { name, type, place, coverUrl, meetings, description } = club;

  return (
    <Layout>
      <div
        css={css`
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr;
            @media (min-width: 840px) {
              grid-template-columns: 3fr 2fr;
            }
          `}
        >
          <div>
            <img
              src={coverUrl}
              alt={name}
              css={css`
                width: 100%;
                height: 100%;
                object-fit: cover;
              `}
            />
          </div>
          <div
            css={css`
              padding: 2rem;
              p {
                margin: 1rem 0;
              }
            `}
          >
            <Link
              css={css`
                display: inline-block;
                margin-bottom: 1rem;
                text-decoration: none;
                background: var(--dark-blue);
                color: #fff;
                font-size: 0.75rem;
                padding: 0.5rem 1rem;
                border-radius: 50px;
              `}
              to={`/type=${type}`}
            >
              {type}
            </Link>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{place}</p>
            <p
              css={css`
                font-size: 1.25rem;
              `}
            >
              {parsePrice(price)}
            </p>
            <button
              css={css`
                padding: 0.5rem 1rem;
                background: var(--yellow);
                color: #fff;
              `}
            >
              Click here to sign up
            </button>
          </div>
        </div>
        <div
          css={css`
            padding: 2rem;
            p {
              margin: 1rem 0;
            }
          `}
        >
          <p>{meetings.length + ` ${meetings.length === 1 ? 'meeting' : 'meetings'}`}</p>

          <h3>Meeting Schedules</h3>
          {meetings.map((meeting: Meeting, i: number) => {
            return (
              <div key={meeting.order}>
                <p>{`${i + 1}. ${parseDate(meeting.startedAt)} ~ ${parseDate(meeting.endedAt)}`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ClubPage;
