import React, { Component } from 'react';
import { connect } from 'react-redux';
class HomeFooter extends Component {
    render() {
        return (
            <>
                <div className='home-footer'>
                    <p>&copy; 2023 Phat Booking care More information,please visit my channel <a target='_blank' rel="noreferrer" href='https://www.youtube.com/watch?v=GspDybPhOeY&list=RDGspDybPhOeY&start_radio=1&ab_channel=HawkNelsonVEVO'>&#8594; Click here &#8592;</a></p>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
