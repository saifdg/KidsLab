import React, { useState } from 'react'
import Alert from '../layout/Alert';
import './Contact.css';
import { validate } from 'email-validator';
import { setAlert } from '../../action/alert';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { Contact } from '../../action/auth';
import { Button } from '@material-ui/core';

const ContactUs = () => {
  const dispatch = useDispatch()
  const handleChangeUser = (event) => {
    const { value, name } = event.target;

    const newUser = { ...formData };
    newUser[name] = value;

    setFormData({ ...newUser })
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    txt: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate(formData.email)) {
      dispatch(setAlert("E-mail invalide", "danger"))
    } else {
      dispatch(Contact(formData))
    }
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      txt: ''
    })
  }

  return (
    <div className="container contact">
      <div className="row">
        <div className="col-md-3">
          <div className="contact-info">
            <img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image" />
            <h2 style={{ fontWeight: 'bold' }}>Contactez nous</h2>
            <h4>Nous serions ravis de vous entendre !</h4>
          </div>
        </div>
        <div className="col-md-9">
          <div className="contact-form">
            <div className="form-group">
              <label className="control-label col-sm-2" for="fname">Nom:</label>
              <div className="col-sm-10">
                <input type="text" value={formData.firstName} onChange={handleChangeUser} className="form-control" id="fname" placeholder="Entrer Nom" name="firstName" />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="lname">Prénom:</label>
              <div className="col-sm-10">
                <input type="text" value={formData.lastName} onChange={handleChangeUser} className="form-control" id="lname" placeholder="Entrer Prénom" name="lastName" />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="email">Email:</label>
              <div className="col-sm-10">
                <input type="email" value={formData.email} onChange={handleChangeUser} className="form-control" id="email" placeholder="Entrer email" name="email" />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="comment">Message:</label>
              <div className="col-sm-10">
                <textarea className="form-control" value={formData.txt} onChange={handleChangeUser} rows="5" id="comment" name='txt'></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <Alert />
                <button type="submit" onClick={handleSubmit} className="btn btn-default">Envoyer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
