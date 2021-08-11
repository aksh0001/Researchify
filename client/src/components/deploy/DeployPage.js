import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { githubLoginUrl } from '../../config/deploy';
import { GoMarkGithub } from 'react-icons/go';
import { deployToGHPages, getGHAccessToken } from '../../actions/team';
import { Button, Spinner } from 'react-bootstrap';

const DeployPage = ({ teamId }) => {

  console.log("deploy page ")
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.deploy.loading);
  const retrievedAccessToken = useSelector(
    (state) => state.team.retrievedAccessToken
  );

  console.log(githubLoginUrl)
  
  const handleDeploy = () => {
    const accessToken = localStorage.getItem('GH_access_token');


    console.log("handle deploy")
    // call backend endpoint to deploy and give the access token
    dispatch(deployToGHPages(teamId, accessToken));
  };


  useEffect(() => {
    // github returns a code in the url after user logs in
    const url = window.location.href;

    const hasCode = url.includes('?code=');
    if (hasCode && !retrievedAccessToken && teamId) {



      console.log("@@@@@@@@@@@@@@")
      const code = url.split('?code=')[1];
      // we use this code to exchange an access token
      dispatch(getGHAccessToken(teamId, code));
    } else if (!retrievedAccessToken) {
      // we refreshed so we should clear local storage
      localStorage.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, teamId, window.location.href]);



  const GitHubLoginButton = (
    <Button
      className="action primary-danger float-right"
      variant="outline-primary"
      href={githubLoginUrl}
      disabled={retrievedAccessToken}
    >
      <GoMarkGithub className="mr-2"/>
      Login with Github
    </Button>
  );

  const DeployButton = (
    <Button
      className="action primary-danger float-right"
      variant="primary"
      disabled={!retrievedAccessToken}
      onClick={handleDeploy}
    >
      Deploy to GitHub Pages
    </Button>
  );

  return (
    <>
      Deploy Website with GitHub
      {
        loading ? 
        <div className="mb-3 mt-3 text-center">
          <Spinner animation="border" />
        </div> : 
        (
          retrievedAccessToken? 
          DeployButton:
          GitHubLoginButton 

        )
      }
    </>
  );
};

export default DeployPage;
