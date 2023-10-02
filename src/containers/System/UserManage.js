import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss'
import { toast } from 'react-toastify';
import { createUser, deleteUser, editUserService, getAllUsers } from '../../services/userService';

import ModalUser from './ModalUser';
import { emitter } from "../../utils/emitter"
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsers();
    }

    getAllUsers = async () => {
        let response = await getAllUsers('All');
        if (response && response.errorCode === 0) {
            this.setState({
                arrUser: response.users
            })
        }
    }

    handleAddNewUser = (data) => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data, message) => {
        try {
            let response = await createUser(data);
            if (response && response.errorCode === 0) {
                await this.getAllUsers();
                toast.success('create user success')
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUser(user.id)
            if (response && response.errorCode === 0) {
                await this.getAllUsers();
                toast.success('delete user success')
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    handleEditUser = async (user) => {
        try {
            this.setState({
                isOpenModalEditUser: true,
                userEdit: user
            })
        } catch (error) {
            toast.error(error)
        }
    }

    editUserFunction = async (data, message) => {
        try {
            let response = await editUserService(data);
            if (response && response.errorCode === 0) {
                await this.getAllUsers();
                toast.success('edit user success')
                this.setState({
                    isOpenModalEditUser: false
                })
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast(error)
        }
    }

    render() {
        let arrUsers = this.state.arrUser
        return (
            <>
                {this.state.isOpenModalUser &&
                    <ModalUser
                        isOpen={this.state.isOpenModalUser}
                        toggleFromParent={this.toggleUserModal}
                        createUser={this.createNewUser} />
                }


                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.editUserFunction}
                    />
                }


                <div className="text-center">Manage users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={(data) => this.handleAddNewUser(data)}>
                        <i className='fas fa-plus'></i> Add New
                    </button>
                </div>

                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                        }
                    </tbody>
                </table>
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
