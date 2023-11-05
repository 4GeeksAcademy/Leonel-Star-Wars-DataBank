import React, { useEffect, useContext } from 'react'
import '../../styles/characters.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Context } from "../store/appContext";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';



const Characters = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        const getCharacters = async () => {
            try {
                await actions.getTotalCharacters()
            }
            catch (e) {
                console.log(e, 'Error')
            }
        }

        getCharacters()
        console.log(store.characters)

    }, [])


    console.log(store.characters)
    return (
        < div className='container-fluid-body' >
            {/* pasarlo al navbar */}
            <div className='button-drop-down'>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButtonFavorite" data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {/* <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                        {/* mapeo */}
                    </ul>
                </div>
            </div>
            {/* pasarlo al navbar */}
            <div className='container-title'>
                <h1 className='characters-title'>
                    Characters
                </h1>
            </div>
            <div className='container-cards'>
                <i className='Navigate-Before-Icon'> <NavigateBeforeIcon /></i>
                <ul className='carousel-cards-wrapper'>
                    {
                        store.characters.map((elements, index) => {
                            return (
                                < li key={index} className='card-information'>
                                    <div className='cards-characters'>
                                        <div className="card" id='carousel-cards' style={{ width: '20rem' }}>
                                            <img src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`} className="card-img-top" alt="characters" />
                                            <div className="card-body">
                                                <h5 className="card-title"> {elements.name} </h5>
                                                <div className='allContentCard'>
                                                    <p className="card-text"> Gender: </p>
                                                    <p className="card-text"> Height: </p>
                                                    <div className='butonCards'>
                                                        <button className="learn-more">Learn More</button>
                                                        <button className='favorite-icon'><FavoriteIcon /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul >
                <i className='Navigate-Next-Icon'>  <NavigateNextIcon /> </i>
            </div >
        </div >


    )
}

export default Characters