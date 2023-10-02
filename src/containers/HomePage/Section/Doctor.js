import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

import * as actions from '../../../store/actions'
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';


class Doctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }

    }
    render() {
        let allDoctors = this.state.arrDoctors;
        let language = this.props.language;
        return (
            <>
                <div className='section-share section-doctor'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="homepage.top-doctors" /></span>
                            <button className='btn-section'><FormattedMessage id="homepage.more-info" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>

                                {allDoctors && allDoctors.length > 0 &&
                                    allDoctors.map((item, index) => {
                                        let imageBase64 = ''
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                        }
                                        let nameVi = `${item.positionData.valueVi},${item.lastName} ${item.firstName}`
                                        let nameEn = `${item.positionData.valueEn},${item.firstName} ${item.lastName}`
                                        return (
                                            <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                                <div className='customize-border'>
                                                    <div className='outer-bg'>
                                                        <div className='bg-image section-doctor'
                                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                                        />
                                                    </div>
                                                    <div className='position text-center'>
                                                        <div>{language === languages.VI ? nameVi : nameEn}</div>
                                                        <div>Cơ Xương Khớp</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctors: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
