/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { RiSearch2Line, RiFilter2Line } from 'react-icons/ri';
import { useSearchParams } from 'react-router-dom';
import Modal from 'react-modal';
import { Club } from './../index.d';
import { css } from '@emotion/react';

const byName =
  (name: string | null) =>
  ({ club }: Club) =>
    club.name.toLowerCase().includes((name || '').toLowerCase());

const byType =
  (types: string | null) =>
  ({ club }: Club) => {
    if (!types) return true;
    return types
      ?.split(',')
      .map((type) => club.type.toLowerCase().includes((type || '').toLowerCase()))
      .includes(true);
  };
const byPlace =
  (places: string | null) =>
  ({ club }: Club) => {
    if (!places) return true;
    return places
      ?.split(',')
      .map((place) => club.place.toLowerCase().includes((place || '').toLowerCase()))
      .includes(true);
  };

// We can add types and places from the clubs object as well, but it'll be expensive based on the data.

const TYPES = ['함께 만드는 클럽', '클럽장 있는 클럽', '함께 듣는 클럽'];

const PLACES = [
  '강남 아지트',
  '안국 아지트',
  '온라인',
  '롯데백화점 본점(을지로입구역)',
  '롯데백화점 잠실점',
  '그 외 장소',
];

const SearchAndFilter = ({
  clubs,
  setClubs,
}: {
  clubs: Club[];
  setClubs: React.Dispatch<React.SetStateAction<Club[]>>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useSearchParams();
  const [checkedType, setCheckedType] = useState(search.get('type')?.split(',') || []);
  const [checkedPlace, setCheckedPlace] = useState(search.get('place')?.split(',') || []);

  const handleSearch = (e: { target: { value: any } }) => {
    const text = e.target.value;

    if (text.length === 0) {
      search.delete('searchKeyword');
      setSearch(search, {
        replace: true,
      });
    } else {
      search.set('searchKeyword', text);
      setSearch(search, {
        replace: true,
      });
    }
    //setSearch({ searchKeyword: e.target.value });
  };
  const handleType = (e: { target: { value: any; checked: any } }) => {
    const { value, checked } = e.target;
    if (checked) {
      if (!checkedType.includes(value)) {
        setCheckedType((prev) => [...prev, value]);
      }
    } else {
      setCheckedType((prev) => {
        return prev.filter((item) => item !== value);
      });
    }
  };
  const handlePlace = (e: { target: { value: any; checked: any } }) => {
    const { value, checked } = e.target;
    if (checked) {
      if (!checkedPlace.includes(value)) {
        setCheckedPlace((prev) => [...prev, value]);
      }
    } else {
      setCheckedPlace((prev) => prev.filter((item) => item !== value));
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const resetFilters = () => {
    setCheckedType([]);
    setCheckedPlace([]);
  };
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      maxWidth: '800px',
      transform: 'translate(-50%, -50%)',
      zIndex: 99999,
    },
  };

  useEffect(() => {
    if (checkedType.length === 0) {
      search.delete('type');
      setSearch(search, {
        replace: true,
      });
    } else {
      search.set('type', checkedType.join(','));
      setSearch(search, {
        replace: true,
      });
    }
  }, [checkedType]);

  useEffect(() => {
    if (checkedPlace.length === 0) {
      search.delete('place');
      setSearch(search, {
        replace: true,
      });
    } else {
      search.set('place', checkedPlace.join(','));
      setSearch(search, {
        replace: true,
      });
    }
  }, [checkedPlace]);

  useEffect(() => {
    setClubs(
      clubs
        .filter(byName(search.get('searchKeyword')))
        .filter(byType(search.get('type')))
        .filter(byPlace(search.get('place'))),
    );
  }, [search, clubs]);

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
          gap: 1rem;
        `}
      >
        <div
          css={css`
            position: relative;
            flex: 1 0 auto;
          `}
        >
          <label
            htmlFor="searchKeyword"
            css={css`
              position: absolute;
              width: 2rem;
              height: 2rem;
              top: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              color: var(--yellow);
            `}
          >
            <RiSearch2Line width={'2rem'} height={'2rem'} />
          </label>
          <input
            type="text"
            onChange={handleSearch}
            id="searchKeyword"
            name="searchKeyword"
            value={search.get('searchKeyword') || ''}
            css={css`
              padding: 0.5rem 1rem;
              padding-left: 2rem;
              background: #fff;
              width: 100%;
              border: 1px solid #dadada;
            `}
          />
        </div>

        <button onClick={openModal}>
          <RiFilter2Line width="2rem" height={'2rem'} />
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName="overlay"
      >
        <div>
          <h4
            css={css`
              margin: 1rem 0;
            `}
          >
            Types
          </h4>
          <div
            css={css`
              display: flex;
              gap: 0.5rem;
              flex-wrap: wrap;
            `}
          >
            {TYPES.map((type, i) => (
              <React.Fragment key={i}>
                <input
                  className="checkbox"
                  type="checkbox"
                  name="type"
                  id={type}
                  checked={search.get('type')?.split(',').includes(type) ?? false}
                  value={type}
                  onChange={handleType}
                />
                <label className="for-checkbox" htmlFor={type}>
                  <span className="text">{type}</span>
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div>
          <h4
            css={css`
              margin: 1rem 0;
            `}
          >
            Places
          </h4>
          <div
            css={css`
              display: flex;
              gap: 0.5rem;
              flex-wrap: wrap;
            `}
          >
            {PLACES.map((place, i) => (
              <React.Fragment key={i}>
                <input
                  className="checkbox"
                  type="checkbox"
                  name="place"
                  id={place}
                  checked={search.get('place')?.split(',').includes(place) ?? false}
                  value={place}
                  onChange={handlePlace}
                />
                <label className="for-checkbox" htmlFor={place}>
                  <span className="text">{place}</span>
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            width: 100%;
            margin-top: 2rem;
            button {
              padding: 0.5rem 1rem;
              border: none;
              border-radius: 0.25rem;
              cursor: pointer;
            }
          `}
        >
          <button onClick={resetFilters}>Reset Filters</button>{' '}
          <button
            onClick={closeModal}
            css={css`
              background: rgb(255, 121, 0);
              color: #fff;
            `}
          >
            Close
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default SearchAndFilter;
