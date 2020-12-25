import React, { useState } from 'react';
import logo from '../../assets/icons/logo3.jpg'
import cancelIcon from '../../assets/icons/cancel3.png'
import '../addressbook-form/addressbook-form.scss'
import { withRouter } from 'react-router-dom';

const AddressbookForm = (props) => {
    
    let initialValue = {
        name:'',
        firstName: '',
        lastName:'',
        phoneNumber:'',
        address:'',
        city:'',
        state:'',
        zipCode:'',
        id:'',
        isUpdate: false,
        error: {
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address:'',
            city:'',
            state:'',
            zipCode:'',
        }
    }

    const [formValue, setForm] = useState(initialValue);

    const changeValue = (event) => {
        setForm({...formValue, [event.target.name]: event.target.value});
        console.log(formValue);
    }

    const save = async (event) => {
            event.preventDefault();
            console.log(props);
            let nameArray = formValue.name.split(" ");
            let object  = {
                firstName: nameArray[0],
                lastName: nameArray[1],
                address : formValue.address,
                city: formValue.city,
                state: formValue.state,
                zip: formValue.zipCode,
                phoneNumber: formValue.phoneNumber,
            };
    }

    const reset = () =>{
        setForm({ ...initialValue, isUpdate: formValue.isUpdate});
        console.log(formValue);
    }

    const cancel =() =>{
        props.history.push("");
    }
    
        return(
            <div className="addressbook-main">
                <header className="header">
                    <div className="logo">
                        <img src={logo} alt=""/>
                        <div>
                            <span className="emp-text">ADDRESS</span> <br />
                            <span className="emp-text emp-payroll">BOOK</span>
                        </div>
                    </div>
                </header>
                <div className="content">
                <form className="form" action="#">
                    <div className="form-head">
                        <span className="form-description">PERSON ADDRESS FORM</span>
                        <img className="cancel-icon" src={cancelIcon} onClick={cancel} alt=""/>
                    </div>
                    <div className="column">
                        <span className="label text">Full Name</span>
                        <input type="text" className="input" name="fullname" id="fullname" value={formValue.name} onChange={changeValue} />
                    </div>
                    <div className="column">
                        <span className="label text">Phone Number</span>
                        <input type="text" className="input" name="phoneNumber" id="phoneNumber" value={formValue.phoneNumber} onChange={changeValue} />
                    </div>
                    <div className="column">
                        <span className="label text">Address</span>
                        <textarea className="input" cols="10" rows="4" name="address" value={formValue.address} onChange={changeValue}></textarea>
                    </div>
                    <div className="row">
                        <div >
                            <span className="label text">City</span>
                            <select name="city" id="city" className="input" value={formValue.city} onChange={changeValue}>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Pune">Pune</option>
                                <option value="Hyderabad">Hyderabad</option>
                            </select>
                        </div>
                        <div >
                            <span className="label text">State</span>
                            <select name="state" id="state" className="input" value={formValue.state} onChange={changeValue}>
                                <option value="Maharastra">Maharastra</option>
                                <option value="Maharastra">Karnataka</option>
                                <option value="Maharastra">Mumbai</option>
                            </select>
                        </div>
                        <div >
                            <span className="label text">Zip Code</span>
                            <input type="text" name="zipCode" id="zipCode" className="input" value={formValue.zipCode} onChange={changeValue}/>
                        </div>
                    </div>
                    <div className="row">
                        <button value="Add"  className="button add-button" onClick={save} >Add</button>
                        <button value="Reset"  className="button reset-button" onClick={reset} >Reset</button>
                    </div>
                </form>
                </div>
            </div>
        );
    
}

export default withRouter(AddressbookForm);