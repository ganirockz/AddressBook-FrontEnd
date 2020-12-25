import React from 'react';
import logo from '../../assets/icons/logo3.jpg';
import './home.scss';
import addIcon from '../../assets/icons/add-24px.svg';
import {Link, withRouter} from 'react-router-dom';
import Display from '../display/display';
import AddressbookService from '../../services/addressbook-service';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            personArray: [],
            AllPersonArray: [],
        };
        this.addressbookService = new AddressbookService();
        console.log(this.state.personArray);
    }
    
    componentDidMount(){
        this.getAllPersons();
    }

    getAllPersons = () => {
        this.addressbookService
                .getAllPersons()
                .then((data) => {
                    console.log("data is "+ data.data);
                    this.setState(
                        {
                            personArray: data.data,
                            AllPersonArray: data.data,
                        }
                    )
                    console.log(this.state.personArray);
                })
                .catch((err) => {
                    console.log(err);
                })
        console.log(this.state.personArray);
    };

    render(){
        return(
            <div>
                <header className="header">
                    <div className="logo">
                        <img src={logo} alt=""/>
                        <div>
                            <span className="emp-text">ADDRESS</span> <br />
                            <span className="emp-text emp-payroll">BOOK</span>
                        </div>
                    </div>
                </header>
                <div >
                    <div className="emp-detail flex-row-center">
                        <div className="detail-text">
                            Person Details
                        </div>
                        <Link to="addressbook" className="add-button flex-row-center">
                        <img src={addIcon} alt=""/>Add Person
                        </Link>
                    </div>
                </div>
                <div className="table-main">
                    <Display personArray={this.state.personArray}/>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);