import React from 'react';
import { Button } from 'semantic-ui-react';
import { Grid } from '../components/styled';

const IndexPage = () => (
  <Grid>
    <div style={{ textAlign: 'center' }}>
      <h1>
        {`Next.js + Semantic UI with LESS `}
        <span role="img" aria-label="tada">
          🎉
        </span>
      </h1>
    </div>
    <div>
      <Button primary>Primary</Button>
      <Button secondary>Secondary</Button>
    </div>
  </Grid>
);

export default IndexPage;
