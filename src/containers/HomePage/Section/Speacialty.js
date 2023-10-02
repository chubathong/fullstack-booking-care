import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
class Speacialty extends Component {
    render() {
        return (
            <>
                <div className='section-share section-speacialty'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>Chuyên khoa phổ biến</span>
                            <button className='btn-section'>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='bg-image section-speacialty' />
                                    <div>Cơ Xương Khớp</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-speacialty' />
                                    <div>Cơ Xương Khớp 2</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-speacialty' />
                                    <div>Cơ Xương Khớp 3</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-speacialty' />
                                    <div>Cơ Xương Khớp 4</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-speacialty' />
                                    <div>Cơ Xương Khớp 5</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-speacialty' />
                                    <div>Cơ Xương Khớp 6</div>
                                </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Speacialty);
