import { MDBBtn, MDBCol,MDBIcon,MDBRow  } from 'mdbreact';
import React, { useState } from 'react';
import './Home.css'
import coxsbazar1 from '../../Images/coxsbazar1.jpg';
import sajek from '../../Images/sajek.png';
import sundorbon from '../../Images/sundorbon.png';
import sreemongol from '../../Images/sreemongol.png'
import Place from '../../FakeData/Place.json';

const Home = () => {
    const place = [...Place]
    console.log(place)
    const [value, setValue] = useState(place[0]);
    const placeClick = (id) => {
        setValue(place[id]);
    };

    return (
        <div>
            <MDBRow>
                <MDBCol className="col-md-4 p-4">
                    <div style={{color:'white', height:'250px'}} className="ml-5 mt-5">
                        <h1><strong>{value.name}</strong></h1>
                        <p>{value.details}</p>
                    </div>
                    <MDBBtn className="ml-5" color="amber">Booking <MDBIcon icon="arrow-right" /></MDBBtn>
                </MDBCol>
                <MDBCol className="col-md-8">
                    <div className="d-flex flex-nowrap m-5 place-div">
                        <button onClick={()=>placeClick(0)} className="place-btn"><img src={sundorbon} className="place-card" alt="" /></button>
                        <button onClick={()=>placeClick(1)} className="place-btn"><img src={sajek} className="place-card" alt="" /></button>
                        <button onClick={()=>placeClick(2)} className="place-btn"><img src={sreemongol} className="place-card" alt="" /></button>
                        <button onClick={()=>placeClick(3)} className="place-btn"><img src={coxsbazar1} className="place-card" alt="" /></button>
                    </div>
                    
                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default Home;