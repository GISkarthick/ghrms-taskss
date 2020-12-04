import React, {useState} from "react";
import { authenticationService } from "../services";
import logo from '../assets/images/hrm_logo.png';
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import qhrm from '../assets/images/hrm_login_image.png';
import { isRequired } from '../utils/Validations'
import {Footer} from '../components'
import { history } from "../utils/history";
import {isEmpty, cloneDeep} from 'lodash'

import {CONSTANTS} from '../config/Constants';

const initialValue = {
    email: null,
    password: null
  }
  
  const validations = {
    email: (input) => {
      const validate = isRequired(input)
      if (validate !== true) return validate
      return true
    },
    password: (input) => {
      const validate = isRequired(input)
      if (validate !== true) return validate
      return true
    }
  }
  

  export const Login = () => {
  
    const [formValue, setFormValue] = useState(initialValue)
    const [errors, setErrors] = useState({})

    const [isForgotPass, setForgotPass] = useState(false)


    console.log(errors, 'errors')
    const onSubmit = data => {
        authenticationService.login(data).then(
            user => {
            history.push("/dashboard");
            window.location.reload(true);
            },
            error => {
           
            if(Array.isArray(error)){
                error = error[0].msg;
            }
                const respErr = (error) ? error.toString(): "No response from Server";
                alert(respErr)
            }
        );
    };

  const handleChangeValue = (name, value) => {
    // console.log(name, value);
    const temp = cloneDeep(formValue)
    // console.log(temp);

    temp[name] = value
    setFormValue(temp)
  }

  const handleChange = name => event => {
    const input = event.target.value
    handleChangeValue(name, input)
  }

  const validateFormData = () => {
    const temp = cloneDeep(errors)
    Object.keys(validations).forEach(key => {
      const validate = validations[key](formValue[key])
      if (validate !== true) {
        temp[key] = validate
      } else {
        delete temp[key]
      }
    })

    setErrors(temp)
    return isEmpty(temp)
  }

  const handleSubmit = event => {
      event.preventDefault()
    if (validateFormData()) {
      const data = cloneDeep(formValue)

      onSubmit(data)
    }
  }

  const openOffice = () =>{
      alert("open 0ffice 365 login")
  }

  const handleSend = () =>{
      alert("Email will be Sent with reset password Link")
      setForgotPass(false)
  }


    return (
      <div className="row login_block">
        <div className="login_left col-md-5">
          <h3>{CONSTANTS.LOGIN.title}</h3>
          <p>
            {CONSTANTS.LOGIN.SUB_TITLE}
          </p>
          <span className="Qhrm_image">
            <img src={qhrm} alt="hrmimage" />
          </span>
        </div>
        <div className="login_right col-md-7">
          <Form className="login_form">
            <img src={logo} className="mb-3" alt="logo" />

            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fa fa-user" aria-hidden="true"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                id="emailFormInputGroup" 
                placeholder={CONSTANTS.LOGIN.EMAIL} 
                value={formValue.email} 
                onChange={handleChange('email')}
                />
                {errors.email && (
                  <p
                    className="error"
                  >
                    {errors.email}
                  </p>
                )}
            </InputGroup>

            {!isForgotPass && <><InputGroup className="mb-3 mt-4">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fa fa-unlock" aria-hidden="true"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="passwordFormInputGroup"
                placeholder={CONSTANTS.LOGIN.PASSWORD}
                className="input_password"
                value={formValue.password}
                onChange={handleChange('password')}
              />
              <i className="fa fa-eye eye-icon" aria-hidden="true"></i>

              {errors.password && (
                  <p
                    className="error"
                  >
                    {errors.password}
                  </p>
                )}
            </InputGroup> 

            <div className="keep_login">
              <Form.Check
                type="checkbox"
                id="customControlAutosizing"
                label="Keep me logged in"
                custom
              />
              <span onClick={() => setForgotPass(true)}>{CONSTANTS.LOGIN.FORGOT}</span>
            </div>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                {CONSTANTS.LOGIN.LOGIN}
            </Button>
            
            <Button variant="primary" type="submit" onClick={openOffice}>
                 {CONSTANTS.LOGIN.OFFICE365}
            </Button> </>}
            
            {isForgotPass &&
              <>
              <Button variant="primary" type="submit" onClick={handleSend}>
                {CONSTANTS.LOGIN.SEND}
              </Button>
              <p onClick={() => setForgotPass(false)}>Back to Login</p>
              </>
            }
            
            <Footer />
          </Form>
        </div>
      </div>
    );
}
