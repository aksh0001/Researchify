import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

const WebpageCard = ({
  page, description, handlePageSelection,
}) => {
  const handleChange = () => {
    handlePageSelection(page);
  };
  return (
    <>
      <Form.Group>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Form.Check type="checkbox" onChange={handleChange} />
            <Card.Title>
              {page}
            </Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
          </Card.Body>
        </Card>
      </Form.Group>
    </>
  );
};

WebpageCard.propTypes = {
  page: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handlePageSelection: PropTypes.func.isRequired,
};

export default WebpageCard;
