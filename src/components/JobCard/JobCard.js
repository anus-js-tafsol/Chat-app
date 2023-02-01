import React from "react";
import style from "./JobCard.module.css";
import loc from '../../assets/Svgs/geo-alt-fill.svg'
const JobCard = () => {
  return (
    <div className={`mx-4 my-4 ${style.card}`}>
      <div className={`${style.image} py-4`}>
        <div className={`${style.location} px-1 d-flex`}>
          <img className="m-auto" height='15px' src={loc} alt="" />
         <span className="mx-1">Location</span> 
          </div>
      </div>
      <div className="mx-2 my-2">
        <h4>job title</h4>
        <p className={style.description}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt,
          accusantium nisi aliquid error quidem quaerat ratione eveniet officiis
          illo blanditiis.
        </p>
      </div>
      <div className="mx-2 my-1 d-flex justify-content-center border-top py-1">
        <div className={`${style.bottombox} border-end  px-1`}><span className={style.bottomboxContent}>permanent</span> </div>
        <div className={`${style.bottombox} border-end px-1`} > <span className={style.bottomboxContent}>FullTime</span> </div>
        <div className={`${style.bottombox}  px-1`} ><span className={style.bottomboxContent}>$20000</span></div>

      </div>
    </div>
  );
};

export default JobCard;
