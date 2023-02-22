import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as mestoAuth from '../mestoAuth.js';
import imgFail from '../images/img-fail.svg';

function Login(props) {
   const [formValue, setFormValue] = useState({
      userEmail: '',
      userPassword: ''
   });

   const navigate = useNavigate();

   const handleChange = (e) => {
      const { name, value } = e.target;

      setFormValue({
         ...formValue,
         [name]: value
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const { userEmail, userPassword } = formValue;

      if (!userEmail || !userPassword) {
         return
      }

      mestoAuth.authorize(userEmail, userPassword)
         .then((res) => {
            if (res.token) {
               console.log(res);
               localStorage.setItem('token', res.token);
               setFormValue({
                  userEmail: '',
                  userPassword: ''
               })
               props.handleLogin();
               navigate('/main', { replace: true });

            } else {
               return;
            }

         })
         .catch((err) => {
            console.log(err);
            props.setInfoTooltipData({
               image: imgFail,
               text: `Что-то пошло не так! ${err}. Попробуйте ещё раз.`
            });
            props.handleInfoTooltipIsOpen();
         })
   }

   return (
      <section className="sign-up">
         <form className="sign-up__form" onSubmit={handleSubmit}>
            <h2 className="sign-up__title">
               Вход
            </h2>
            <input id="sign-up-email-input" name="userEmail" type="email" placeholder="Email" className="sign-up__input" required value={formValue.userEmail || ''} onChange={handleChange} />
            <input id="sign-up-password-input" name="userPassword" type="password" placeholder="Пароль" className="sign-up__input sign-up__input_password" value={formValue.userPassword || ''} required onChange={handleChange} />
            <button type="submit" className="sign-up__submit" >Войти</button>
         </form>
      </section>
   );
}

export default Login;

