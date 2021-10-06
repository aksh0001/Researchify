/**
 * This component display a single team member as a card component.
 */

import React from 'react';
import { Card } from 'react-bootstrap';

const TeamMember = ({ member }) => (
  <Card className="team-card">
    <Card.Img variant="top" src={member.memberPic} />
    <Card.Body>
      <div className="member-name">{member.fullName}</div>
      <div className="member-position">{member.position}</div>
      <div className="member-summary">{member.summary}</div>
    </Card.Body>
  </Card>
);

export default TeamMember;
