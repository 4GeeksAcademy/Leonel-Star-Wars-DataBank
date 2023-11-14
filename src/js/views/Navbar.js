import React, { useContext } from 'react'
import '../../styles/navbar.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoginIcon from '@mui/icons-material/Login';
import { Context } from '../store/appContext';

const Navbar = () => {
    const { store, actions } = useContext(Context)

    const handleDeleteFavorites = (index) => {
        store.favoritesCharacters.splice(index, 1)
        store.isDisabledFavorite.splice(index, 1)
        actions.shownFavoriteCharacters()
    }

    const handleDeleteFavoritesPlanets = (index) => {
        store.favoritePlanets.splice(index, 1)
        store.isDisabledFavoritePlanets.splice(index, 1)
        actions.shownFavoritePlanets()
    }

    const handleDeleteFavoritesVehicles = (index) => {
        store.favoriteVehicles.splice(index, 1)
        store.isDisabledFavoriteVehicles.splice(index, 1)
        actions.shownFavoriteVehicles()
    }

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
            <div className='button-drop-down'>
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                    Favorites
                </button>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuClickableInside" id='containerFavoritesCharacters'>
                    <li id='titleCharacters'> Characters</li>
                    {store.favoritesCharacters.map((elements, index) => {
                        return (
                            <li key={index} className='containerFavoritesCharacters'>
                                <p className='namesProperties'>{elements.properties.name}</p>
                                <button className='buttonDeleteFavorites'
                                    onClick={() => { handleDeleteFavorites(index) }}
                                >
                                    <DeleteOutlineIcon className='deleteIcon' />
                                </button>
                            </li>
                        )
                    }
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li id='titleCharacters'> Planets</li>
                    {
                        store.favoritePlanets.map((elements, index) => {
                            return (
                                <li key={index} className='containerFavoritesCharacters'>
                                    <p className='namesProperties'> {elements.properties.name} </p>
                                    <button className='buttonDeleteFavorites'
                                        onClick={() => handleDeleteFavoritesPlanets(index)}
                                    >
                                        <DeleteOutlineIcon className='deleteIcon' />
                                    </button>
                                </li>

                            )
                        })
                    }
                    <li><hr className="dropdown-divider" /></li>
                    <li id='titleCharacters'> Vehicles </li>
                    {store.favoriteVehicles.map((elements, index) => {
                        return (
                            <li key={index} className='containerFavoritesCharacters'>
                                <p className='namesProperties'> {elements.name}</p>
                                <button className='buttonDeleteFavorites'
                                    onClick={() => handleDeleteFavoritesVehicles(index)}
                                >
                                    <DeleteOutlineIcon className='deleteIcon' />
                                </button>

                            </li>

                        )
                    })}


                </ul>
            </div>
        </div >



    )
}

export default Navbar