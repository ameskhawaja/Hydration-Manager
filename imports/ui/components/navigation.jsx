import React, {Component} from 'react'
import { NavLink, Link } from 'react-router-dom'

/* Side navigation bar for the application */

export default class Navigation extends Component {

    constructor () {
        super()
        this.state = {
            isHidden:true
        }
    }
    //Code sidebar appearance and disappearance
    toggleVisible() {

        var x = document.getElementById("pageNavigation");
        x.classList.toggle("hidden-sm");
        x.classList.toggle("hidden-xs");

    }

    render() {
        return (
            <div>
                <button type="button" className="col-xs-1 hidden-md hidden-lg hidden-xl btn btn-default
            btn-sm glyphicon glyphicon-menu-hamburger" onClick={this.toggleVisible}/>
                <ul id= "pageNavigation" className= "hidden-sm hidden-xs nav-sidebar col-xs-12 col-md-2 nav nav-pills nav-stacked">
                    <li><NavLink to = '/app'>Home</NavLink></li>
                    <li><NavLink to = '/app/weightEntry'>Weight Entry</NavLink></li>
                    <li><NavLink to = '/app/masterReport'>Master Report</NavLink></li>
                    <li><NavLink to = '/app/yourTeams'>Your Teams</NavLink></li>
                    <li><NavLink to = '/app/alerts'>Alerts</NavLink></li>
                    <li><Link to = '/app/logout'>Logout</Link></li>
                </ul>
            </div>
        )
    }
}