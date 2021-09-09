/**
 * LogoutModal component display a modal and ask for confirmation when the sign out button is clicked
 */
import { Button, Modal } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const LogoutModal = ({ logoutAlert, setLogoutAlert }) => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logout());
  };
  return (
    <Modal show={logoutAlert}>
      <Modal.Header className="modalHeader">
        <Modal.Title> Logging out </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to log out?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => setLogoutAlert(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSignOut}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

LogoutModal.propTypes = {
  logoutAlert: PropTypes.bool.isRequired,
  setLogoutAlert: PropTypes.func.isRequired,
};

export default LogoutModal;
