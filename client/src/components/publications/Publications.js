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
    const [sortOption, setSortOption] = useState("year")

    useEffect(() => {
        dispatch(getPublicationsByTeamId(teamId));
      }, [dispatch, teamId]);

    const teamPublications = useSelector(state => state.publications)

    const sortYear = () => {
        // sort by title then year for consistency with the db
        sortTitle();
        teamPublications.sort((a, b) => (a.year > b.year) ? -1 : 1);
    }

    const sortAuthor = () => {
        // sort by the first author in the author array
        teamPublications.sort((a, b) => (a.authors[0] > b.authors[0]) ? 1 : -1);
    }

    const sortTitle = () => {
        teamPublications.sort((a, b) => (a.title > b.title) ? 1 : -1);
    }

    const sortPublicationType = () => {
        // assuming journal and conference fields are going to be there but blank if not either
        // teamPublications.sort((a, b) => ())

    }

    const handleSortingOption = (sortingOption) => {

        switch (sortingOption) {
            case "author":
                sortAuthor();
                setSortOption("author");
                break;
            case "title":
                sortTitle();
                setSortOption("title");
                break;
            case "type":
                sortPublicationType();
                setSortOption("type");
                break;
            default:
                sortYear();
                setSortOption("year");
                break;
        }

    }        

    return (
        <> 
            <div className="mb-3 mt-3 text-center">
                <Button className="ml-2 mr-2" onClick={() => setShowCreateForm(true)}>    
                    <IconContext.Provider value={{ color: 'black', size: '30px' }}>
                        <VscAdd />
                    </IconContext.Provider>
                </Button>
                <Button className="ml-2 mr-2"  onClick={() => setShowImportForm(true)}> 
                    <IconContext.Provider value={{ color: 'black', size: '30px' }}>
                        <BsArrowUpDown /> 
                    </IconContext.Provider>
                </Button>
            </div>
            
            <div className="text-center">
                <h4>
                    Total of {teamPublications.length} publications 
                </h4>
                <select className="form-select form-select-sm" onChange={e => handleSortingOption(e.target.value)}>
                    <option defaultValue>Year</option>
                    <option value="author">Author</option>
                    <option value="title">Title</option>
                    <option value="type">Publication Type</option>
                </select>

            </div>
            <div className="publicationList">
            {
                teamPublications.map(pub => 
                    <Publication pub={pub} key={pub._id}/>)
            }
            </div>

            <Modal show={showCreateForm}>
                <Modal.Header className="modalHeader">
                    <Modal.Title> New Publication </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PublicationForm type="create" closeModal={() => setShowCreateForm(false)}/>
                </Modal.Body>
            </Modal>

            <Modal show={showImportForm}>
                <Modal.Header className="modalHeader">
                    <Modal.Title> Import from Google Scholar </Modal.Title>
                </Modal.Header >
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