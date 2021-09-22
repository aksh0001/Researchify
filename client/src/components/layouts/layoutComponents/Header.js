import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav, Dropdown, Image, Row, Col, Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillSetting, AiOutlineLogout } from 'react-icons/ai';
import { PropTypes } from 'prop-types';
import './Header.css';
import { NavbarBrand } from 'reactstrap';
import { theme } from '../../landing-pages/theme';
import defaultProfilePic from '../../../images/profilepic.jpg';

/**
 * This function provides header for Layout.js
 * @returns Header component to be rendered in Layout.js
 */
const Header = ({ data, setLogoutAlert }) => {
  const { teamName, orgName, profilePic } = useSelector((state) => state.team);
  const [profileData, setProfileData] = useState({
    teamName, orgName, profilePic,
  });
  useEffect(() => {
    setProfileData({
      teamName, orgName, profilePic,
    });
  }, [orgName, teamName, profilePic]);

  /**
   * Updates profile image field when user uploads file
   */

  // If profilePic is undefined, set a default profile pic
  profileData.profilePic = profileData.profilePic ?? defaultProfilePic;
  // TODO: Remove hard-coded team id and publications id from the links
  return (
    <>
      <Navbar className="header" fixed="top">
        <NavbarBrand href="/">
          <Link className="header-brand" to={data.dashboardURL}>
            <h2 style={{ color: theme.dark, fontFamily: 'Arial' }}>
              RE
              <b style={{ color: theme.primary }}>SEARCH</b>
              IFY
            </h2>
          </Link>
        </NavbarBrand>
        <Nav className="mr-auto" />
        <Nav>
          <Dropdown drop="down" alignRight="end" className="header-link">
            <Dropdown.Toggle
              as={BsFillPersonFill}
              className="dashboard-dropdown-toggle"
            />
            <Dropdown.Menu>
              <Dropdown.Item className="dashboard-dropdown-login-details">
                <Container fluid>
                  <Row>

                    <Image
                      src={profileData.profilePic}
                      roundedCircle
                      height="60px"
                      width="60px"
                    />

                    <Col>
                      {profileData.teamName}
                      <br />
                      {profileData.orgName}
                    </Col>
                  </Row>
                </Container>

              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="2" href="/dashboard/profile">
                <AiFillSetting />
                {' '}
                Settings
              </Dropdown.Item>
              <Dropdown.Item eventKey="3" onClick={() => setLogoutAlert(true)}>
                <AiOutlineLogout />
                {' '}
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>
        </Nav>
      </Navbar>
    </>
  );
};

// props validation
Header.propTypes = {
  data: PropTypes.object.isRequired,
  setLogoutAlert: PropTypes.func.isRequired,
};

export default Header;
