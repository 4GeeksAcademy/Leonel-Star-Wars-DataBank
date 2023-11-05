import React from 'react'
import '../../styles/navbar.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="breadcrumbs">
                <ul className="breadcrumbs-logos">
                    <li className='starwars-tv'><a href="https://www.tiktok.com/@starwars"><img src="https://lumiere-a.akamaihd.net/v1/images/tiktok-logo-white_dd1a4867.svg?region=0%2C0%2C100%2C100" className="tikTokIcon" /></a></li>
                    <li className='starwars-tv'><a href="https://www.instagram.com/starwars/"><InstagramIcon className="instagramIcon" /></a> </li>
                    <li className='starwars-tv'><a href="https://twitter.com/starwars"><TwitterIcon className="twitterIcon" /></a></li>
                    <li className='starwars-tv'><a href="https://www.facebook.com/starwarsla/?brand_redir=169299103121699"><FacebookIcon className="facebookIcon" /></a></li>
                    <li className='starwars-tv'><a href="https://www.youtube.com/user/starwars"><YouTubeIcon className="youtubeIcon" /></a></li>
                    <li className='starwars-tv-kids'><a href="https://www.starwarskids.com/"><img src="https://lumiere-a.akamaihd.net/v1/images/sw_nav_kids_937ed58b.svg?region=0%2C0%2C40%2C15" className="kidsIcon" /></a></li>
                </ul>
            </div>
            <div className="logoStarWars">
                <a href="https://www.starwars.com/" ><img className="imageLogoStarwars" src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254" alt="starwars-logo" /></a>
            </div>
            <div className="container-search-login">
                <div className="search-container">
                    <SearchIcon className="search-icon" /> <p> SEARCH</p>
                </div>
                <div className="login-container">
                    <LoginIcon className="login-icon" /><p>SIGN</p>&nbsp;<p>IN</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar