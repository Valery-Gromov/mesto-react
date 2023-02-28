import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

      props.handleLoginSubmit(userEmail, userPassword);

      setFormValue({
         userEmail: '',
         userPassword: ''
      });
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

