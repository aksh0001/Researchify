/**
 * This file exports a profile page management component that displays the ability to edit user information
 */

import React, { useState, useEffect } from 'react';

import {
  Form, Container, Image, Modal,
} from 'react-bootstrap';
import './Settings.css';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import defaultProfilePic from '../../images/profilepic.jpg';
import { updateTeam, updatePassword } from '../../actions/team';
import ProfileResetModal from './ProfileResetModal';
import ProfileDeleteModal from './ProfileDeleteModal';
import { PrimaryButton, DangerButton } from '../shared/styledComponents';
import UpdatePasswordForm from './UpdatePasswordForm';

const Settings = () => {
  const dispatch = useDispatch();
  const [updatePasswordForm, setUpdatePasswordForm] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    teamId, teamName, orgName, email, profilePic,
  } = useSelector(
    (state) => state.team,
  );

  const [profileData, setProfileData] = useState({
    teamName, orgName, email, profilePic,
  });

  const [profileDataPassword, setprofileDataPassword] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setProfileData({
      teamName, orgName, email, profilePic,
    });
  }, [email, orgName, teamName, profilePic]);

  const updateInputs = (form) => {
    const { name, value } = form.target;
    setProfileData({ ...profileData, [name]: value });
  };

  /**
    * Updates profile image field when user uploads file
   */

  // If profilePic is undefined, set a default profile pic
  profileData.profilePic = profileData.profilePic ?? defaultProfilePic;

  /* eslint-disable no-shadow */
  const handleImageUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (e.target.files[0]) {
      reader.onload = (e) => {
        setProfileData({ ...profileData, profilePic: e.target.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const setPassword = (field, value) => {
    setprofileDataPassword({
      ...profileDataPassword,
      [field]: value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Use 8 or more characters with a mix of letters, numbers & symbols',
      ),
    confirmedPassword: yup
      .string(),
  });

  const checkPassword = async () => {
    const { password, confirmedPassword } = profileDataPassword;

    const valid = await passwordSchema.isValid({
      password,
      confirmedPassword,
    });
    if (valid) {
      return true;
    }
    return false;
  };

  const findFormErrors = async () => {
    const newErrors = {};
    // name errors
    if (!await checkPassword()) {
      newErrors.password = 'Please enter a password at least 8 chars long, using only numbers, letters and characters';
    }

    if ({ ...profileDataPassword }.password !== { ...profileDataPassword }.confirmedPassword) {
      newErrors.confirmedPassword = ' Passwords do not match';
    } if ({ ...profileDataPassword }.currentPassword === '' || { ...profileDataPassword }.currentPassword === null || { ...profileDataPassword }.currentPassword === undefined) {
      newErrors.currentPassword = ' Please enter a current password';
    }
    return newErrors;
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    // get our new errors
    const newErrors = await findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      setErrors(newErrors);

      const newdata = {
        currentPassword: { ...profileDataPassword }.currentPassword,
        password: { ...profileDataPassword }.password,
      };
      dispatch(updatePassword(teamId, newdata, ' Password has been updated'));
    }
  };

  const [validated, setValidated] = useState(false);
  const handleUpdate = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const newdata = {
        teamName: { ...profileData }.teamName,
        orgName: { ...profileData }.orgName,
        email: { ...profileData }.email,
      };
      dispatch(updateTeam(teamId, newdata));
    }
    setValidated(true);
  };

  return (
    <div className="mt-5">
      <Container className="profile-container">
        <Form
          className="profile-form"
          noValidate
          validated={validated}
          onSubmit={handleUpdate}
        >
          <p className="profile-title-name">Account Settings</p>

          <Form.Group controlId="formProfilePic">
            <Image
              className="profile-img"
              src={profileData.profilePic}
              roundedCircle
            />
            <Form.Label className="upload-label">
              Change Profile Photo
            </Form.Label>
            <Form.Control className="profile-pic" type="file" accept="image/*" onChange={handleImageUpload} multiple={false} name="profilePic" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="placeholder-text"
              type="email"
              readonly="true"
              placeholder="allenlab@gmail.com"
              name="email"
              defaultValue={profileData.email}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Research Group Name</Form.Label>
            <Form.Control
              className="placeholder-text"
              type="text"
              placeholder="Allan Lab"
              defaultValue={profileData.teamName}
              onChange={updateInputs}
              required
              name="teamName"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Organisation Name</Form.Label>
            <Form.Control
              className="placeholder-text"
              type="text"
              placeholder="Leiden University"
              defaultValue={profileData.orgName}
              onChange={updateInputs}
              required
              name="orgName"
            />
          </Form.Group>

          <div className="my-1">
            <PrimaryButton
              id="updateButton"
              type="submit"
              color="primary"
              className="mr-2"
            >
              Update
            </PrimaryButton>
          </div>
        </Form>
        <DangerButton
          type="button"
          variant="outline-danger"
          className=" mb-2"
          style={{
            align: 'center',
          }}
          onClick={() => {
            setShowResetModal(true);
          }}
        >
          Reset data
        </DangerButton>

        <DangerButton
          type="button"
          variant="outline-danger"
          className="ml-2 mb-2"
          onClick={() => {
            setShowDeleteModal(true);
          }}
        >
          Delete account
        </DangerButton>
      </Container>
      <div />
      <p> </p>
      <Container className="profile-container">
        <Form
          className="profile-form"
          onSubmit={handleUpdatePassword}
        >
          <p className="profile-title-name">Team Password update</p>

          <Form.Group>
            <Form.Label>Current Password </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={profileDataPassword.currentPassword}
              onChange={(e) => setPassword('currentPassword', e.target.value)}
              isInvalid={!!errors.currentPassword}
            />
            <Form.Control.Feedback type="invalid">
              { errors.currentPassword }
            </Form.Control.Feedback>

          </Form.Group>

          <Form.Group>
            <Form.Label> New Password </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={profileDataPassword.password}
              onChange={(e) => setPassword('password', e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              { errors.password }
            </Form.Control.Feedback>

          </Form.Group>
          <Form.Group>
            <Form.Label> Confirm Password </Form.Label>
            <Form.Control
              type="password"
              name="confirmedPassword"
              placeholder="Password"
              value={profileDataPassword.confirmedPassword}
              onChange={(e) => setPassword('confirmedPassword', e.target.value)}
              isInvalid={!!errors.confirmedPassword}
            />
            <Form.Control.Feedback type="invalid">
              { errors.confirmedPassword }
            </Form.Control.Feedback>
          </Form.Group>
          <div className="my-1">
            <PrimaryButton
              id="updateButtonPassword"
              type="submit"
              color="primary"
              className="mr-2"
            >
              Update Password
            </PrimaryButton>
          </div>
        </Form>

      </Container>
      <div />

      {/* A modal for showing import publication form */}
      <Modal size="lg" show={updatePasswordForm}>
        <Modal.Header className="modalHeader">
          <Modal.Title> Update Password </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdatePasswordForm closeModal={() => setUpdatePasswordForm(false)} />
        </Modal.Body>
      </Modal>

      <ProfileResetModal shouldShow={showResetModal} setShouldShow={setShowResetModal} />
      <ProfileDeleteModal shouldShow={showDeleteModal} setShouldShow={setShowDeleteModal} />
    </div>
  );
};
export default Settings;
