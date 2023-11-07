import React, { useEffect, useContext, useRef, useState } from 'react'
import '../../styles/characters.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Context } from "../store/appContext";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Footer } from '../component/footer';
import CustomLeftArrow from '../component/CustomLeftArrow.jsx';
import CustomRightArrow from '../component/CustomRightArrow.jsx';
// import AddFavorites from '../component/AddFavorites';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



const Characters = () => {
    const [itemCharacters, setItemCharacters] = useState([])
    const { store, actions } = useContext(Context)
    let count = 0
    //
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            slidesToSlide: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1280 },
            items: 4,
            slidesToSlide: 4
        },
        smallDesktop: {
            breakpoint: { max: 1280, min: 770 },
            items: 3,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 768, min: 585 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 585, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    }
    //
    useEffect(() => {
        const getCharacters = async () => {
            try {
                await actions.getTotalCharacters()
                // console.log(store.totalRecordsCharacters)
                console.log(`Conseguimos efectivamente los characters ${store.totalRecordsCharacters}`)
            }
            catch (e) {
                console.log(e, 'Error')
            }
        }
        getCharacters()
    }, [])



    return (
        < div className='container-fluid-body' >
            <div className='container-title'>
                <h1 className='characters-title'>
                    Characters
                </h1>
            </div>
            <div className='container-cards' >

                <ul className='carousel-cards-wrapper'>
                    <Carousel
                        // customLeftArrow={customLeftArrowFunction}
                        // customRightArrow={<NavigateNextIcon />}
                        swipeable={false}
                        draggable={false}
                        showDots={false}
                        infinite={false}
                        // autoPlay={this.props.deviceType != "mobile" ? true : false}
                        // autoPlaySpeed={1000}
                        // customTransition='all 10'
                        // transitionDuration={700}
                        containerClass='carousel-container'
                        itemClass="carousel-item-padding-40-px"
                        responsive={responsive}>
                        {
                            store.characters.map((elements, index) => {
                                count += 1
                                if (count === 17) {
                                    count += 1
                                    console.log('solo quiero entrar aqui cuando index sea 17')
                                }
                                console.log(count)
                                return (
                                    < li key={index} className='card-information'>
                                        <div className='cards-characters'>
                                            <div className="card" id='carousel-cards' style={{ width: '22rem' }}>
                                                <img src={`https://starwars-visualguide.com/assets/img/characters/${count}.jpg`} className="card-img-top" alt="characters" />
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
                    </Carousel>
                </ul >

            </div >

        </div >


    )
}

export default Characters