import React, { Component } from 'react';
import { connect } from 'react-redux';
class About extends Component {
    render() {
        return (
            <>
                <div className='section-share section-about'>
                    <div className='section-about-header'>
                        Truyền thông nói về Phát
                    </div>
                    <div className='section-about-content'>
                        <div className='content-left'>
                            <iframe width="100%" height="400px"
                                src="https://www.youtube.com/embed/ueD1ZMZvucg"
                                title="MANCHESTER UNITED - TOTTENHAM | RONALDO - HATTRICK KINH ĐIỂN TẠI OLD TRAFFORD | NGOẠI HẠNG ANH 21/22"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className='content-right'>
                            <p>Cristiano Ronaldo scored a spectacular hat-trick to take Manchester United up to fourth with a 3-2 win over Tottenham at Old Trafford.

                                On his return to the team after missing the Manchester derby, Ronaldo gave United the lead on three separate occasions in scoring his first hat-trick since his return to the club.

                                Tottenham did well for much of the game, twice equalising thanks to Harry Kane's penalty and, in the second half, through Harry Maguire's own goal, but Ronaldo was the difference.

                                The result lifts Ralf Rangnick's side up into the top four above Arsenal, while Antonio Conte's Spurs are now five points behind them - albeit with two games in hand.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
