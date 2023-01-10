import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/index';
import SearchAndFilter from '../components/SearchAndFilter';
import CardList from '../components/CardList';
import { Club } from './../index.d';

const HomePage = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [data, setData] = useState<Club[]>([]);

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
        setData(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log({ clubs, data });

  return (
    <Layout>
      <SearchAndFilter clubs={data} setClubs={setClubs} />

      <CardList data={clubs} />
    </Layout>
  );
};

export default HomePage;
