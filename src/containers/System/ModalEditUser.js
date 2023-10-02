import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash'
class ModalEditUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            phoneNumber:''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id:user.id,
                email:user.email,
                password:'password',
                firstName:user.firstName,
                lastName:user.lastName,
                address:user.address,
                phoneNumber:user.phoneNumber
            })
        }
    }

    toggle= () =>{
        this.props.toggleFromParent();
    }

    handleSaveUser = async () =>{
       let isValid =  this.checkValidateInput();
       if(isValid===true){
            this.props.editUser(this.state);
       }else{
            alert('oh no')
       }
    }
    handleOnChangeInput = (event,id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () =>{
        let isValid =true;
        let arrInput = ['email','password','firstName','lastName','address','phoneNumber']
        for(let i = 0 ;i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid =false;
                alert('missing parameter: ',arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} 
            toggle={()=>this.toggle()} 
            className={'modal-user-container'}
            size='lg' >
            <ModalHeader toggle={()=>this.toggle()}>Edit user</ModalHeader>
            <ModalBody>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email</label>
                            <Input 
                            type="text"
                            placeholder='Enter your email' 
                            value={this.state.email}
                            onChange={(event)=>this.handleOnChangeInput(event,"email")}
                            disabled/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Password</label>
                            <Input type="password" 
                            placeholder='Enter your password' 
                            value={this.state.password}
                            onChange={(event)=>this.handleOnChangeInput(event,"password")}
                            disabled/>
                        </div>

                        <div className='col-6 form-group'>
                            <label>First Name</label>
                            <Input 
                            type="text"
                            placeholder='Enter your firstName' 
                            value={this.state.firstName}
                            onChange={(event)=>this.handleOnChangeInput(event,"firstName")}/>
                        </div> 

                        <div className='col-6 form-group'>
                            <label>Last name</label>
                            <Input type="text"
                            placeholder='Enter your lastName' 
                            value={this.state.lastName}
                            onChange={(event)=>this.handleOnChangeInput(event,"lastName")}/>
                        </div> 

                        <div className='col-12 form-group'>
                            <label>Address</label>
                            <Input type="text"
                            placeholder='Enter your address' 
                            value={this.state.address}
                            onChange={(event)=>this.handleOnChangeInput(event,"address")}/>
                        </div> 

                        <div className='col-6 form-group'>
                            <label>Phone number</label>
                            <Input type="text"
                            placeholder='Enter your phone Number' 
                            value={this.state.phoneNumber}
                            onChange={(event)=>this.handleOnChangeInput(event,"phoneNumber")}/>
                        </div>  
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" className='px-3' onClick={()=>this.handleSaveUser()}>Save</Button>{' '}
                <Button color="secondary" className='px-3' onClick={()=>this.toggle()}>Cancel</Button>
            </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);


