/* eslint-disable react/button-has-type */
/* add new, delete, edit */
import React, { useState } from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import { BiHelpCircle } from 'react-icons/bi';

const AchievementsPageWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#add-achievement-button',
        title: 'Add Achievement',
        intro: 'Click here to add a new achievement manually',
      },
      {
        element: '#delete-icon',
        title: 'Deleting selected Achievements',
        intro: 'Click here to delete all selected achievements',
      },
      {
        element: '#select-achievements-checkbox',
        title: 'Selecting Achievements',
        intro: 'Click on this checkbox to select all achievements',
      },
    ],
  });

  const toggleSteps = () => {
    setIntro({ ...intro, stepsEnabled: !intro.stepsEnabled });
  };

  const onExit = () => {
    setIntro({ ...intro, stepsEnabled: false });
  };

  return (
    <div>
      <Steps
        enabled={intro.stepsEnabled}
        steps={intro.steps}
        initialStep={intro.initialStep}
        onExit={onExit}
      />
      <BiHelpCircle onClick={toggleSteps} />
    </div>
  );
};

const AchievementsEditDeleteWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#achievement-checkbox',
        title: 'Selecting the Achievement',
        intro: 'Click on this checkbox to select the added achievement',
      },
      {
        element: '#edit-achievement-button',
        title: 'Edit Achievement',
        intro: 'Click on this button to edit the added achievement',
      },
      {
        element: '#delete-achievement-button',
        title: 'Delete Achievement',
        intro: 'Click on this button to delete the added achievement',
      },
    ],
  });

  const toggleSteps = () => {
    setIntro({ ...intro, stepsEnabled: !intro.stepsEnabled });
  };

  const onExit = () => {
    setIntro({ ...intro, stepsEnabled: false });
  };

  return (
    <div>
      <Steps
        enabled={intro.stepsEnabled}
        steps={intro.steps}
        initialStep={intro.initialStep}
        onExit={onExit}
      />
      <BiHelpCircle onClick={toggleSteps} />
    </div>
  );
};

const AchievementsFormWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#form',
        title: 'New Achievement',
        intro: 'Please ensure that: all fields are filled',
      },
      {
        element: '#achieve-title',
        title: 'Achievement Title',
        intro: 'Please ensure that the title is 3-60 characters',
      },
      {
        element: '#year',
        title: 'Achievement Year',
        intro: 'Use the drop down menu to select the year.',
      },
      {
        element: '#desc',
        title: 'Achievement Description',
        intro: 'Please ensure that the description is 5-500 characters',
      },
    ],
  });

  const toggleSteps = () => {
    setIntro({ ...intro, stepsEnabled: !intro.stepsEnabled });
  };

  const onExit = () => {
    setIntro({ ...intro, stepsEnabled: false });
  };

  return (
    <div>
      <Steps
        enabled={intro.stepsEnabled}
        steps={intro.steps}
        initialStep={intro.initialStep}
        onExit={onExit}
      />
      <BiHelpCircle onClick={toggleSteps} />
    </div>
  );
};

export default AchievementsPageWalkthrough;
export { AchievementsEditDeleteWalkthrough };
export { AchievementsFormWalkthrough };
