import React, { Component } from 'react';

import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Speacialty from './Section/Speacialty';

import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MedicalFacility from './Section/MedicalFacility';
import Doctor from './Section/Doctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
class HomePage extends Component {

    handleAfterChange = () => {

    }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            //afterChange: this.handleAfterChange()
        };
        let settingsHandbook = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Speacialty settings={settings} />
                <MedicalFacility settings={settings} />
                <Doctor settings={settings} />
                <Handbook settings={settingsHandbook} />
                <About />
                <HomeFooter />
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
