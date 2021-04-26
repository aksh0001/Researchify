import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPublicationsByTeamId } from '../../actions/publications'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import PublicationForm from './PublicationForm'
import { BsFillPersonFill, BsArrowUpDown } from 'react-icons/bs'
import { VscAdd } from 'react-icons/vsc'
import { IconContext } from "react-icons"
import Publication from './publication/Publication'
import './publications.css'


const Publications = () => {
    const dispatch = useDispatch();
    const { teamId } = useParams();
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showImportForm, setShowImportForm] = useState(false)

    useEffect(() => {
        dispatch(getPublicationsByTeamId(teamId));
      }, [teamId, dispatch]);

    const teamPublications = useSelector(state => state.publications.teamPublications)

    return (
        <> 
            <div className="mb-3 mt-3 text-center">
                <Button className="mr-2" size="lg" onClick={() => setShowCreateForm(true)}>    
                    <IconContext.Provider
                        value={{ color: 'black', size: '25px' }}
                    >
                        <VscAdd />
                    </IconContext.Provider>
                </Button>
                <Button className="ml-2" size="lg" onClick={() => setShowImportForm(true)}> 
                    <IconContext.Provider
                        value={{ color: 'black', size: '25px' }}
                    >
                        <BsArrowUpDown /> 
                    </IconContext.Provider>
                </Button>
            </div>

            <div className="publicationList">
                {
                    teamPublications.map(pub => 
                        <Publication pub={pub} key={pub._id}/>)
                }
            </div>

            <Modal show={showCreateForm}>
                <Modal.Header>
                    <Modal.Title> New Publication </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PublicationForm type="create" closeModal={() => setShowCreateForm(false)}/>
                </Modal.Body>
            </Modal>

            <Modal show={showImportForm}>
                <Modal.Header>
                    <Modal.Title> Import from Google Scholar </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="Google Scholar Profile Link"/>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={() => setShowImportForm(false)}> Cancel </Button>
                    <Button> Confirm </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Publications