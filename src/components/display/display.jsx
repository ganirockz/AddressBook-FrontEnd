import { withRouter } from "react-router-dom";
import React from 'react';
import './display.scss'
import AddressbookService from "../../services/addressbook-service";
import deleteIcon from '../../assets/icons/delete-black-18dp.svg'
import editIcon from '../../assets/icons/create-black-18dp.svg'

const Display = (props) => {

    const addressbookService = new AddressbookService();

    const update = (id) => {
        props.history.push(`/addressbook/${id}`);
    }

    const remove = (id) => {
        addressbookService.deletePerson(id)
        .then((data) => {
            window.location.reload();
            alert(data.data+ "data is delete");
            props.getAllPersons();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
            <table className="display">
                <tbody>
                <tr key={-1}>
                    <th>Fullname</th>
                    <th>Address</th>
                    <th>city</th>
                    <th>State</th>
                    <th>Zip Code</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                </tr>
                {
                    
                    props.personArray && props.personArray.map((element,ind) => (    
                        <tr key={ind}>
                            <td>{element.firstName+" "+element.lastName}</td>
                            <td>{element.address}</td>
                            <td>{element.city}</td>
                            <td>{element.state}</td>
                            <td>{element.zip}</td>
                            <td>{element.phoneNumber}</td>
                            <td>
                            <img src={deleteIcon} onClick={()=> remove(element.id)} alt="delete"/>
                                <img src={editIcon} onClick={()=> update(element.id)} alt="edit"/>
                            </td>
                        </tr>
                        ))
                }
                </tbody>
            </table>
    );
}

export default withRouter(Display);