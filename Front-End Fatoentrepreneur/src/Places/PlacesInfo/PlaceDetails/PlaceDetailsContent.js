import React, { useState, usestate } from 'react';
import './PlaceDetailsContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from 'react-bootstrap/Accordion';
import { PlacesCards, NearbyCard } from '../../../assets/Components/Cards/Cards';
import PlaceDetailsReviews from './PlaceDetailsReviews';
import { NavLink, Link, useHistory } from 'react-router-dom';
import Comments from '../../../assets/Components/comments/Comments';

function PlaceDetailsContent({ place, comments, placeID, setPlaceComments }) {
    const [likes, setLikes] = useState(false);

    const history = useHistory();
    const userLoginData = JSON.parse(sessionStorage.getItem('userLoginData'));

    const addLikes = () => {
      setLikes(!likes);
        const data = {
            placeId: placeID,
            like: !likes,
            type: 'place',
        };
        console.log(data);
        async function postData(url = '', data = {}) {
            console.log(data);
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    accessToken: userLoginData.accessToken,
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data),
            });
            return response.json();
        }


        postData('https://fatoentrepreneur.herokuapp.com/likes', data).then((res) => {
            console.log('Response Message', res);
        });
    };

    return (
        <div className="container placeDetailsContent">
            <nav className="miniNav">
                <ul className="d-flex my-4">
                    <li className="mx-2">{place.city.city}</li>
                    <li className="mx-2">{place.subCategory}</li>
                </ul>
            </nav>
            <p className="mx-2 placeName">
                {place.category}{' '}
                <span>
                    <i class="fa-regular fa-circle-check verified mx-3"></i>
                    <i
                        class={`fa-${likes ? 'solid' : 'regular'} fa-heart redHeart mx-3`}
                        onClick={addLikes}
                    ></i>
                </span>
            </p>
            <div className="d-flex place-info-details">
                <p className="mx-2 star-review">
                    5.0{' '}
                    <span>
                        <i className="fa fa-star mx-1"></i>
                    </span>
                </p>
                <p className="mx-2">(2 reviews)</p>
                <p className="mx-4">Free</p>
                <p className="mx-4">Coffee Shop</p>
            </div>
            <hr />
            <div className="placeServices d-flex">
                <li className="d-flex flex-column justify-content-center align-items-center mx-4">
                    <i class="fa-solid fa-car my-2"></i>
                    <p className="my-2"> Car Parking</p>
                </li>
                <li className="d-flex flex-column justify-content-center align-items-center mx-4">
                    <i class="fa-brands fa-cc-mastercard my-2"></i>
                    <p className="my-2">Credit Cards</p>
                </li>
                <li className="d-flex flex-column justify-content-center align-items-center mx-4">
                    <i class="fa-solid fa-calendar-days my-2"></i>
                    <p className="my-2">Reservations</p>
                </li>
                <li className="d-flex flex-column justify-content-center align-items-center mx-4">
                    <i class="fa-solid fa-wifi my-2"></i>
                    <p className="my-2"> Wifi</p>
                </li>
            </div>
            <hr />
            <div className="showHideText">
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque quisquam,
                    consectetur, fugit, quae eos odit asperiores fugiat nostrum numquam distinctio
                    enim debitis cumque temporibus animi dolores autem consequatur maiores neque
                    aliquid tenetur. Consectetur, quasi cum.
                </p>
                .
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque quisquam,
                    consectetur, fugit, quae eos odit asperiores fugiat nostrum numquam distinctio
                    enim debitis cumque temporibus animi dolores autem consequatur maiores neque
                    aliquid tenetur. Consectetur, quasi cum.
                </p>
                .<p className="star-review">Show more</p>
            </div>

            <hr />
            <div className="accordion">
                <h5>FAQ's</h5>
                <Accordion>
                    <Accordion.Item eventKey="0" className="my-4">
                        <Accordion.Header>
                            What it is like to have your first date in this place?
                        </Accordion.Header>
                        <Accordion.Body>
                            It is a long established fact that a reader will be distracted by the
                            readable content of a page when looking at its layout.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className="my-4">
                        <Accordion.Header>
                            How is this business operating during COVID-19?
                        </Accordion.Header>
                        <Accordion.Body>
                            It is a long established fact that a reader will be distracted by the
                            readable content of a page when looking at its layout.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <div className="nearBy">
                <h5 className="my-4">What is Nearby?</h5>
                <span className="my-4" style={{ fontWeight: '500' }}>
                    Hotels
                </span>
                <hr />
            </div>

            <div className="similarPlaces">
                <NearbyCard
                    img="https://s3-media4.fl.yelpcdn.com/bphoto/BAr1--zGAVjT4v3LTFNd8Q/o.jpg"
                    title="Renaissance Paris Republique Hotel"
                    subTitle="40 rue René Boulanger, 75010 Paris, France"
                    stars="4"
                    reviews="3"
                />

                <NearbyCard
                    img="https://s3-media1.fl.yelpcdn.com/bphoto/HoM2aDLShXSnrVNBjhTaHw/o.jpg"
                    title="Hôtel Fabric"
                    subTitle="31 rue de la Folie Méricourt, 75011 Paris, France"
                    stars="3"
                    reviews="8"
                />

                <NearbyCard
                    img="https://s3-media3.fl.yelpcdn.com/bphoto/K6HtmxuBGXG_ZMkqBIwcJw/o.jpg"
                    title="Caron de Beaumarchais"
                    subTitle="12 rue Vieille du Temple, 75004 Paris, France"
                    stars="5"
                    reviews="6"
                />
            </div>

            <div className="nearBy my-4 pt-4 d-flex">
                <h4 className="m-0   mx-2">Reviews</h4>
                <p className="m-0 my-1 mx-2 star-review">
                    5.0{' '}
                    <span>
                        <i className="fa fa-star mx-1"></i>
                    </span>
                </p>
            </div>
            <div className="placeReviews">
                {/* <PlaceDetailsReviews /> */}
                <Comments
                    currentUserId="1"
                    userLoginData={userLoginData}
                    comment={comments}
                    placeID={placeID}
                    place={place}
                    setPlaceComments={setPlaceComments}
                />

                {userLoginData && userLoginData.isLoginSuccess ? null : (
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#474545' }}>
                        {' '}
                        <span
                            onClick={() => history.push('/login')}
                            style={{ color: '#23d3d3', cursor: 'pointer' }}
                        >
                            Login
                        </span>{' '}
                        to review
                    </p>
                )}
            </div>
        </div>
    );
}

export default PlaceDetailsContent;
