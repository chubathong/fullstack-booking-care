import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService';
import { languages } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errorCode === 0) {
                result = res.data;
            }
        }
        return result
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === languages.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === languages.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY    ')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.priceBooking" /></div>
                </>
            )
        }
        return <></>
    }
    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime } = this.props;

        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi},${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn},${dataProfile.firstName} ${dataProfile.lastName}`
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}></div>
                    <div className='content-right'>
                        <div className='up'>{language === languages.VI ? nameVi : nameEn}</div>
                        <div className='down'>
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown
                                        && dataProfile.Markdown.description
                                        &&
                                        <span>{dataProfile.Markdown.description}</span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }

                        </div>
                    </div>
                </div>
                <div className='price'>
                    <FormattedMessage id="patient.booking-modal.price" />
                    {dataProfile && dataProfile.Doctor_Infor && language === languages.VI &&

                        <NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VNĐ'}
                        />
                    }

                    {dataProfile && dataProfile.Doctor_Infor && language === languages.EN &&
                        <NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        />
                    }
                </div>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
