
import React from 'react';
import shot1 from '../assets/screenshot1.jpg';
import shot2 from '../assets/screenshot2.jpg';

const Screenshots = () => (
  <section style={{ background: '#f9f9f9' }}>
    <h2>App Screenshots</h2>
    <img src={shot1} alt="Screenshot 1" width="200" style={{ margin: '10px' }} />
    <img src={shot2} alt="Screenshot 2" width="200" style={{ margin: '10px' }} />
  </section>
);

export default Screenshots;
