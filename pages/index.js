import Head from 'next/head'
import { useState } from 'react';
import { EndpointSelector } from '../components/endpoint-selector';
import { PingGraph } from '../components/ping-graph';

export default function Home() {
  const [ endpoints, setEndpoints ] = useState(['sjc01.login.pathofexile.com']);

  return (
    <div className="container">
      <Head>
        <title>Ping grid</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to... ping graph!
        </h1>

        <EndpointSelector
          endpoints={endpoints}
          onAddEndpoint={addMe => setEndpoints([...endpoints, addMe]) }
          onRemoveEndpoint={removeMe => setEndpoints(endpoints.filter(e => e !== removeMe))}
          />

        { endpoints.map(endpoint => <PingGraph key={endpoint} endpoint={endpoint} />)}
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
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
