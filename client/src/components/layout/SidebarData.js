import React from 'react';
import {
  BsFillGridFill,
  BsBookHalf,
  BsPerson,
  BsGearFill,
  BsPeople,
  BsFillQuestionCircleFill,
  BsBoxArrowLeft
} from 'react-icons/bs';
import { signOut } from '../../actions/auth';
import { useDispatch } from 'react-redux';

/*
    List of navigations inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
export const SidebarData = () => {
  const dispatch = useDispatch();
  return [
    {
      title: 'Dashboard',
      icon: <BsFillGridFill />,
      link: '/dashboard',
    },
    {
      title: 'Publications',
      icon: <BsBookHalf />,
      link: `/publications`,
    },
    {
      title: 'Team Profile',
      icon: <BsPerson />,
      link: '/dashboard/profile',
    },
    {
      title: 'Team Member',
      icon: <BsPeople />,
      link: '/team',
    },
    {
      title: 'Settings',
      icon: <BsGearFill />,
      link: '/dashboard/settings',
    },
    {
      title: 'Help',
      icon: <BsFillQuestionCircleFill />,
      link: '/dashboard/help',
    },
    {
      title: "Logout",
      icon: <BsBoxArrowLeft />,
      link: '/',
      action: () => dispatch(signOut())
    }
  ];
};
