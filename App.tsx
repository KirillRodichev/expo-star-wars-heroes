import React, {useEffect} from 'react';
import { Providers } from './src/app/providers';
import { Navigation } from './src/app/navigation';

export default function App() {
    useEffect(() => {
        console.log('dummy effect')

        return () => {
            console.log('dummy cleanup')
        }
    }, []);

  return (
    <Providers>
      <Navigation />
    </Providers>
  );
}
