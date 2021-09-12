/**
 * The PublicationPage component displays a list of publications and a twitter panel.
 */
import React from 'react';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// import TwitterFeed from '../twitter/TwitterFeed';
import Publications from './Publications';
// import { TEAM_INFO } from '../../global/data';

const PublicationPage = () => (

  <>
    <Container className="pages-top-padding text-center mt-3 mb-3">
      <div className="publication-pg-title">Our Publications</div>
    </Container>
    <Container fluid>
      <Publications />
    </Container>
  </>
);
export default PublicationPage;
