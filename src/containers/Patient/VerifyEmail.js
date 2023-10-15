import React, { Component } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.scss'
import HomeHeader from '../HomePage/HomeHeader'
import { postVerifyBookAppointment } from '../../services/userService';
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errorCode: 0
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errorCode === 0) {
                this.setState({
                    statusVerify: true,
                    errorCode: res.errorCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errorCode: res.errorCode ? res.errorCode : -1
                })
            }
        }

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    render() {

        console.log('check errorcode ,', this.state)
        let { statusVerify, errorCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>
                            Loading data...
                        </div>
                        :
                        <div>
                            {errorCode === 0 ?
                                <div className='info-booking'>Xác định lịch hẹn thành công!</div> :
                                <div className='info-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận</div>
                            }
                        </div>
                    }
                </div>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
