import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { sortingOptions, layoutOptions } from '../../../config/publications';
import { updatePublicationOptions } from '../../../actions/website';
import 'intro.js/introjs.css';

const PublicationsDropdown = ({
  options,
  setOptions,
  publication,
  teamId,
  sortPublications,
}) => {
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updatePublicationOptions(teamId, options));
  };

  return (
    <div id="publication-options">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Dropdown>
          <Dropdown.Toggle variant="light" className="mb-2">
            Layout:
            {' '}
            {options.layout}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(layoutOptions).map((layout, i) => (
              <Dropdown.Item
                key={i}
                as="button"
                onClick={() => setOptions({ ...options, layout: layoutOptions[layout] })}
              >
                {layoutOptions[layout]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="light" className="mb-2">
            Sort by:
            {' '}
            {options.sortBy}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(sortingOptions).map((sortBy, i) => (
              <Dropdown.Item
                key={i}
                as="button"
                value={sortingOptions[sortBy]}
                onClick={(e) => {
                  setOptions({ ...options, sortBy: sortingOptions[sortBy] });
                  sortPublications(publication, e.target.value);
                }}
              >
                {sortingOptions[sortBy]}
              </Dropdown.Item>
            ))}
            {options.layout === layoutOptions.BY_CATEGORY
              && (
              <Dropdown.Item
                as="button"
                value="Category Title"
                onClick={(e) => {
                  setOptions({ ...options, sortBy: e.target.value });
                  sortPublications(publication, e.target.value);
                }}
              >
                Category Title
              </Dropdown.Item>
              )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="secondary"
          onClick={handleUpdate}
        >
          Update Layout &amp; Sorting Options
        </Button>
      </div>
    </div>
  );
};

export default PublicationsDropdown;
