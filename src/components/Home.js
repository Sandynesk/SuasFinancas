// src/components/Home.js

import React from 'react';
import Navbar from './Navbar';
import F from './F';

function Home() {
  return (
    <div>
      <Navbar /> {/* Renderize o componente Navbar */}
      <F /> {/* Renderize o componente F */}
  
    </div>
  );
}

export default Home;