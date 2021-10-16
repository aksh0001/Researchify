/**
 * The Steps component displays the different pop-ups for each onboarding message in sequence
 */

import React, { useState } from 'react';
import { Steps } from 'intro.js-react';
import { BiHelpCircle } from 'react-icons/bi';
import 'intro.js/introjs.css';

const PublicationsPageWalkthrough = () => {
  const [intro, setIntro] = useState({
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '#add-publication-button',
        title: 'Add Publication(s)',
        intro: 'Click here to add a new publication by importing or manually',
      },
      {
        element: '#delete-publication-icon',
        title: 'Deleting selected publications',
        intro: 'Click here to delete all selected publications',
      },
      {
        element: '#publication-group-by',
        title: 'Selecting Achievements',
        intro: 'Click here to group all publications by none or category',
      },
      {
        element: '#publication-sort-by',
        title: 'Selecting Achievements',
        intro: 'Click here to sort all publications by title, author or year',
      },
      {
        element: '#publication-update-layout',
        title: 'Selecting Achievements',
        intro: 'Click here to update the layout of publications(sorting and group by order) in the deployed site',
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

export default PublicationsPageWalkthrough;
