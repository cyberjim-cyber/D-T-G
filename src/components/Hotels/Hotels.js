import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React from 'react';
import { useParams } from 'react-router-dom';
import HotelData from '../../FakeData/Hotels.json';
import Gmap from '../Gmap/Gmap';
import HotelDetails from '../HotelDetails/HotelDetails';
import Place from '../../FakeData/Place.json';
import './Hotels.css'

const Hotels = () => {
    const { name } = useParams();
    console.log(name)
    const data = [...HotelData]
    const place = [...Place];
    const selectedPlace = place.find(each => each.name === name);
    
    const marker = {
        "lat":selectedPlace.lat,
        "lng":selectedPlace.lon
    }
    return (
        <div>
            <MDBContainer>
            <MDBRow style={{ backgroundColor: 'white' }}>
                <MDBCol className="col-7">
                    <div className="m-3">
                        <h4><strong>Stay in {name}</strong></h4> <br/> 
                    </div>
                    {
                        data.map(each => <HotelDetails key={each.id} data={each}></HotelDetails>)
                    }
                </MDBCol>
                <MDBCol className="col-5">
                    <div className="">
                        <Gmap marker={marker} />
                    </div>
                    
                </MDBCol>
            </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Hotels;