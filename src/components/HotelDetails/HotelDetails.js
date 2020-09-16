import { MDBCol, MDBRow } from 'mdbreact';
import React from 'react';
import star from '../../Images/icons/star_1_.png'

const HotelDetails = (props) => {
    const {title, feature, details, rating, price, image} = props.data

    return (
        <div>
            <MDBRow className="m-3">
                <MDBCol className="col-5">
                    <div>
                        <img src={image} height="160" alt="" />
                    </div>
                </MDBCol>
                <MDBCol className="col-7">
                    <b>{title}</b> <br/>
                    <small  className="text-muted">{feature}</small> <br/>
                    <small  className="text-muted">{details}</small> <br/>
                    <span>
                        <img src={star} height="10" alt="" />&nbsp;
                        <small>{rating}</small> 
                    </span> <br/>
                    <span><b>${price}/</b></span><span className="text-muted">night</span>
                    {/* <div className="d-flex justify-content-between">
                    <h4><b>${price}</b></h4> 
                    <p>
                    {rating} &nbsp;
                    <img src={star} height="20" alt="" />
                    <img src={star} height="20" alt="" />
                    <img src={star} height="20" alt="" />
                    <img src={star} height="20" alt="" />
                    <img src={star} height="20" alt="" />
                    
                    </p>
                    </div> */}
                    
                    
                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default HotelDetails;