import React from 'react';
import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import Newsletter from '../components/Newsletter/Newsletter';
import Download from '../components/Download/Download';
import useTitle from '../hooks/useTitle';

const Home = () => {
  useTitle('Home');
  return (
    <>
      <Hero />
      <Services />
      <Newsletter />
      <Download />
    </>
  );
};

export default Home;
