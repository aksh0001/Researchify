/**
 * This file exports Sidebar component for layouts
 */
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { Fragment } from 'react';

const Sidebar = ({ data }) => {
  let location = useLocation();

  return (
    <Fragment>
      <ul className="SidebarList">
        {data.map((val, key) => (
          // if the link property of a sidebar item is undefined, stays in the current page
          <Link to={val.link ? val.link : '#'} key={key}>
            <li
              className="row"
              id={location.pathname === val.link ? 'active' : ''}
              onClick={val.action}
            >
              {/* Sets sidebar navigation to active (blue) if the current page is the same in sidebar*/}

              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          </Link>
        ))}
      </ul>
    </Fragment>
  );
};

export default Sidebar;
