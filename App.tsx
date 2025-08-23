import React from 'react';
import { Providers } from './src/app/providers';
import { Navigation } from './src/app/navigation';

export default function App() {
  return (
    <Providers>
      <Navigation />
    </Providers>
  );
}
