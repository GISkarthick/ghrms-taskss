
import React from "react";
import {CONSTANTS} from '../config/Constants';
import qhrm from '../assets/images/hrm_login_image.png';
export const LeftLayout = () => {

    return (
        <div className="login_left col-md-5">
        <h3>{CONSTANTS.LOGIN.TITLE}</h3>
        <p>
          {CONSTANTS.LOGIN.SUB_TITLE}
        </p>
        <span className="Qhrm_image">
          <img src={qhrm} alt="hrmimage" />
        </span>
      </div>
    )
}
