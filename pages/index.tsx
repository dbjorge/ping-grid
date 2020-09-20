import Head from 'next/head'
import { useState } from 'react';
import { EndpointSelector } from '../components/endpoint-selector';
import { PingTracker } from '../components/ping-tracker';

export default function Home() {
  const [ endpoints, setEndpoints ] = useState([
    // tracert sjc.login.pathofexile.com
    '192.168.1.1',
    '96.120.70.113',
    '96.110.28.13',
    '162.151.113.73',
    '76.96.121.242',
    'sjc01.login.pathofexile.com',
  ]);

  return (
    <div className="container">
      <Head>
        <title>Ping grid</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/*
        <EndpointSelector
          endpoints={endpoints}
          onAddEndpoint={addMe => setEndpoints([...endpoints, addMe]) }
          onRemoveEndpoint={removeMe => setEndpoints(endpoints.filter(e => e !== removeMe))}
          />
        */}

        { endpoints.map(endpoint => <PingTracker
            key={endpoint}
            endpoint={endpoint}
            windowMs={60000}
            width={400}
            height={200} />)}
      </main>

      <style jsx>{`
        main {
          flex-wrap: wrap;
          padding: 5rem 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
