/**
 * Delete Alert Modal component display a modal and ask for confirmation when the delete button is clicked
 */

import React from 'react';
import toast from 'react-hot-toast';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { successMessageCreator } from '../../notification/notificationReduxFunctions';
import { clearTeam, deleteGHPages } from '../../actions/team';

const ProfileClearModal = ({ clearAlert, setClearAlert }) => {
  const { teamId } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  const HandleClear = () => {
    const accessToken = localStorage.getItem('GH_access_token');
    try {
      dispatch(deleteGHPages(teamId, accessToken));
    } catch (error) {
      toast.error('GitHub Pages doesnt exist');
    }
    const isDeleteFlag = false;
    dispatch(clearTeam(teamId, isDeleteFlag));
    setClearAlert(false);
    dispatch(successMessageCreator('Profile data cleared successfully!'));
  };
  return (
    <Modal show={clearAlert}>
      <Modal.Header className="modalHeader">
        <Modal.Title> Clear Account Data! </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to reset your account? All significant data will be deleted!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => setClearAlert(false)}>
          Back
        </Button>
        <Button variant="danger" onClick={HandleClear}>
          Clear
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ProfileClearModal;
