// import React, { useEffect, useContext, useRef } from 'react'
// import '../../styles/characters.css'
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { Context } from "../store/appContext";

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";



// const CardComponent = () => {

//     const { store, actions } = useContext(Context)
//     //Variable for the render!
//     function nextArrow(props) {
//         const { className, style, onClick } = props
//         return (
//             <div
//                 className={className}
//                 style={{ ...style, display: "block", background: 'red' }}
//                 onClick={onClick}
//             />
//         )

//     }

//     function prevArrow(props) {
//         const { className, style, onClick } = props
//         return (
//             <div
//                 className={className}
//                 style={{ ...style, display: 'block', background: 'red' }}
//                 onClick={onClick}
//             />
//         )
//     }




//     var settings = {
//         dots: false,
//         infinite: false,
//         speed: 300,
//         slidesToShow: 4,
//         slidesToScroll: 4,
//         nextArrow: nextArrow,
//         prevArrow: prevArrow,

//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 3,
//                     infinite: true,
//                     dots: true
//                 }
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 2,
//                     initialSlide: 2
//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1
//                 }
//             }
//         ]
//     };


//     //

//     useEffect(() => {
//         const getCharacters = async () => {
//             try {
//                 await actions.getTotalCharacters()
//             }
//             catch (e) {
//                 console.log(e, 'Error')
//             }
//         }

//         getCharacters()
//         console.log(store.characters)

//     }, [])




//     console.log(store.characters)
//     return (
//         < div className='container-fluid-body' >
//             <div className='container-title'>
//                 <h1 className='characters-title'>
//                     Characters
//                 </h1>
//             </div>


//             <div className='container-cards' >
//                 <i className='Navigate-Before-Icon' id="left"> <NavigateBeforeIcon /></i>
//                 <ul className='carousel-cards-wrapper'>
//                     <Slider {...settings}>
//                         {
//                             store.characters.map((elements, index) => {
//                                 return (
//                                     < li key={index} className='card-information'>
//                                         <div className='cards-characters'>
//                                             <div className="card" id='carousel-cards' style={{ width: '20rem' }}>
//                                                 <img src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`} className="card-img-top" alt="characters" />
//                                                 <div className="card-body">
//                                                     <h5 className="card-title"> {elements.name} </h5>
//                                                     <div className='allContentCard'>
//                                                         <p className="card-text"> Gender: </p>
//                                                         <p className="card-text"> Height: </p>
//                                                         <div className='butonCards'>
//                                                             <button className="learn-more">Learn More</button>
//                                                             <button className='favorite-icon'><FavoriteIcon /></button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </li>
//                                 )
//                             })
//                         }
//                     </Slider>
//                 </ul >
//                 <i className='Navigate-Next-Icon' id="right" >  <NavigateNextIcon /> </i>
//             </div >

//         </div >
//     )
// }

// export default CardComponent