import React, { useState , useEffect} from 'react';
import logo from '../../assets/icons/logo3.jpg'
import cancelIcon from '../../assets/icons/cancel3.png'
import '../addressbook-form/addressbook-form.scss'
import { withRouter, useParams} from 'react-router-dom';
import AddressbookService from '../../services/addressbook-service';

const AddressbookForm = (props) => {
    
    let initialValue = {
        name:'',
        phoneNumber:'',
        address:'',
        city:'',
        state:'',
        zipCode:'',
        id:'',
        isUpdate: false,
        error: {
            name:'',
            phoneNumber:'',
            address:'',
            city:'',
            state:'',
            zipCode:'',
        }
    }
    
    const params = useParams();
    
    useEffect(() => {
        console.log(params);
        if(params.id){
            getDataById(params.id);
        }
    }, []);

    let addressbookService = new AddressbookService();
    
    const getDataById = (id) =>{
        addressbookService.getPerson(id)
        .then((data) => {
            let obj = data.data;
            setData(obj);
        })
        .catch( (err) => {
            console.log("err is "+ err);
        });
    };

    const setData = (obj) => {
        let fullname = obj.firstName+" "+obj.lastName;
        setForm({
            ...formValue,
            ...obj,
            isUpdate : true,
            name: fullname,
            phoneNumber: obj.phoneNumber,
            address: obj.address,
            city: obj.city,
            state: obj.state,
            zipCode: obj.zip,
        });
    };

    const validData = async () => {
        let isError = false;
        let error = {
            name:'',
            phoneNumber:'',
            address:'',
            city:'',
            state:'',
            zipCode:'',
        }
        if(formValue.name.length < 1){
            error.name = 'name is required field'
            isError = true;
        }
        if(formValue.phoneNumber.length !== 10){
            error.phoneNumber = 'phone number should be 10 digits'
            isError = true;
        }
        if(formValue.address.length <1){
            error.address = 'address is required field'
            isError = true;
        }
        if(formValue.zipCode.length !== 6){
            error.zipCode = 'zip code should be 6 digit code'
            isError = true;
        }
        await setForm({...formValue, error: error});
        return isError;
    }

    const [formValue, setForm] = useState(initialValue);

    const changeValue = (event) => {
        setForm({...formValue, [event.target.name]: event.target.value});
    }

    const save = async (event) => {
            event.preventDefault();
            if(await validData()){
                console.log("error",formValue);
            }else{
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
            
            if(formValue.isUpdate){
                addressbookService.updatePerson(object,params.id)
                .then(
                    (data) => {
                        alert("Data updated successfully!");
                        props.history.push("");
                    }
                )
                .catch((err)=>{
                    console.log(err);
                })
            }else{
            addressbookService.addPerson(object)
            .then((data) => {
                console.log("data added successfully");
                props.history.push("");
            }).catch(err =>{
                console.log(err);
            });
        }
        }
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
                        <input type="text" className="input" name="name" id="name" onChange={changeValue} value={formValue.name} />
                        <div className="error">{formValue.error.name}</div>
                    </div>
                    <div className="column">
                        <span className="label text">Phone Number</span>
                        <input type="text" className="input" name="phoneNumber" id="phoneNumber" value={formValue.phoneNumber} onChange={changeValue} />
                        <div className="error">{formValue.error.phoneNumber}</div>
                    </div>
                    <div className="column">
                        <span className="label text">Address</span>
                        <textarea className="input" cols="10" rows="4" name="address" value={formValue.address} onChange={changeValue}></textarea>
                        <div className="error">{formValue.error.address}</div>
                    </div>
                    <div className="row">
                        <div >
                            <span className="label text">City</span>
                            <select name="city" id="city" className="input" value={formValue.city} onChange={changeValue}>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Pune">Bangalore</option>
                                <option value="Hyderabad">Hyderabad</option>
                            </select>
                        </div>
                        <div >
                            <span className="label text">State</span>
                            <select name="state" id="state" className="input" value={formValue.state} onChange={changeValue}>
                                <option value="Maharastra">Maharastra</option>
                                <option value="Maharastra">Karnataka</option>
                                <option value="Maharastra">Telangana</option>
                            </select>
                        </div>
                        <div >
                            <span className="label text">Zip Code</span>
                            <input type="text" name="zipCode" id="zipCode" className="input" value={formValue.zipCode} onChange={changeValue}/>
                            <div className="error">{formValue.error.zipCode}</div>
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