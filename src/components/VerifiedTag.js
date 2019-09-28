import React, { Component } from 'react';
import Confetti from 'react-confetti';
import "../css/components/tag_verification.css"
import verified_1 from "../assets/gifs/verified_1-min.gif";
import verified_2 from "../assets/gifs/verified_2-min.gif";
import verified_3 from "../assets/gifs/verified_3-min.gif";
import verified_4 from "../assets/gifs/verified_4-min.gif";
import verified_5 from "../assets/gifs/verified_5-min.gif";

/*
    This component appears when a discovered tag has been verified
*/

export default class VerifiedTag extends Component {
    constructor(props){
        super(props);

        // list of success gifs
        this.gifs = [
            verified_1,
            verified_2,
            verified_3,
            verified_4,
            verified_5
        ];

        this.state = {
            // the gif being shown
            current_gif: ""
        }
    }

    // show the gif once the img tag finishes loading
    show_gif = (event) => {
        let image = event.target;
        image.classList.add("loaded");
    }


    componentDidMount = () => {
        this.setState({
            current_gif : this.gifs[Math.floor(Math.random()*this.gifs.length)]
        });
    }


    // calculate how many points the user will be awarded
    calculate_points = () => {
        // get the tag worth
        let worth = this.props.data.tag_data.worth;
        
        // get the tag rarity
        let rarity = this.props.data.tag_data.rarity;

        // return the rounded rarity
        return(Math.round(worth + (1/rarity)));
    }

    render() {
        return(
            <div className="tag_verification-wrapper wrapper">
                <img className="success-gif" alt="sucess-gif" onLoad={(e) => this.show_gif(e)} src={this.state.current_gif}/>
                <header>
                    <span className="discovery-name color">{this.props.data.tag_data.name}</span>
                </header>

                <div className="discovery-info">
                    <div className="points-info">
                        <span>Rarity: {this.props.data.tag_data.rarity.toFixed(2)}</span>
                        <span>Worth: {this.props.data.tag_data.worth}</span>
                    </div>
                    <span className="discovery-reward color">+{this.calculate_points()} Points!</span>
                </div>
                <div className="discovery-button-wrapper">
                    <button onClick={() => this.props.history.push("/user/me")}>Okay</button>
                </div>
                <Confetti tweenDuration={9000} opacity={.3} numberOfPieces={150} gravity={.5} friction={1} recycle={false} />
            </div>
        );
    }
}