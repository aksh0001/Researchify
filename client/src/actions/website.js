/**
 * This file houses Action Creaters for client website
 */
import {
  CREATE_WEBSITE,
  DELETE_WEBSITE,
  ADD_WEBPAGE,
  DELETE_WEBPAGE,
  UPDATE_PUBLICATION_OPTIONS,
  UPDATE_WEBSITE_TITLE,
  UPDATE_WEBSITE_THEME,
} from './types';
import { errorActionGlobalCreator, successMessageCreator } from '../notification/notificationReduxFunctions';
import * as api from '../api';

/**
 * Action called when 'create website' button is clicked
 */
export const createWebsite = () => ({
  type: CREATE_WEBSITE,
});

/**
 * Action called when user choose to delete the website
 */
export const deleteWebsite = () => ({
  type: DELETE_WEBSITE,
});

/**
 * Adds a new client web-page to redux store and database.
 * @param teamInfo contains teamName, orgName and email
 */
export const addPage = (teamId, pageName) => async (dispatch) => {
  try {
    const apiBody = {
      pageName,
    };
    await api.addWebPage(teamId, apiBody);

    dispatch({
      type: ADD_WEBPAGE,
      payload: pageName,
    });
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
  }
};

/**
 * Deletes info about a client's web-page from redux store and database.
 * @param teamInfo contains teamName, orgName and email
 */
export const deletePage = (teamId, pageName) => async (dispatch) => {
  const apiBody = {
    pageName,
  };
  try {
    api.deleteWebPage(teamId, apiBody);
    dispatch({
      type: DELETE_WEBPAGE,
      payload: pageName,
    });
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
  }
};

export const updatePublicationOptions = (teamId, preference) => async (dispatch) => {
  try {
    const changes = { publicationOptions: preference };
    const { data } = await api.updateClientWebMetadata(teamId, changes);
    dispatch({
      type: UPDATE_PUBLICATION_OPTIONS,
      payload: data,
    });
    dispatch(successMessageCreator('Preference has been updated.'));
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
  }
};

export const updateWebsiteTitle = (teamId, website) => async (dispatch) => {
  try {
    const change = { title: website.websiteTitle };
    await api.updateClientWebMetadata(teamId, change);
    dispatch({
      type: UPDATE_WEBSITE_TITLE,
      payload: website.websiteTitle,
    });
    dispatch(successMessageCreator('Title has been updated.'));
  } catch (err) {
    dispatch(errorActionGlobalCreator(err));
  }
};

/**
 * This action creater find/create a new theme and update it in website model.
 * @param {*} teamId The id of the team whose theme is to be updated
 * @param {*} themeData Object containing the updated 'layout'
 * @returns
 */
export const updateTheme = (teamId, themeData) => async (dispatch) => {
  try {
    console.log(themeData);
    const { result } = await api.updateClientWebMetadata(teamId, {
      layout: themeData.layout,
    });
    console.log(result);

    dispatch({
      type: UPDATE_WEBSITE_THEME,
      payload: themeData,
    });
    dispatch(successMessageCreator('Theme has been updated'));
  } catch (error) {
    dispatch(errorActionGlobalCreator(error));
  }
};
