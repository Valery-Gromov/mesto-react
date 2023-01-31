import closePopupButtonImage from '../images/button__cross.svg'
import { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
    const [isEditPopupIsOpen, setIsEditPopupIsOpen] = useState(false);
    const [isEditAvatarIsOpen, setIsEditAvatarIsOpen] = useState(false);
    const [isAddPlaceIsOpen, setIsAddPlaceIsOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});


    function handleEditProfileClick() {
        setIsEditPopupIsOpen(true);
    };

    function handleEditAvatarClick() {
        setIsEditAvatarIsOpen(true);
    };
    function handleAddPlaceClick() {
        setIsAddPlaceIsOpen(true);
    };
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditPopupIsOpen(false);
        setIsEditAvatarIsOpen(false);
        setIsAddPlaceIsOpen(false);
        setSelectedCard({});
    };


  return (
      <>
        <Header/>
        <Main onCardClick={handleCardClick} handleEditAvatarClick={handleEditAvatarClick} handleEditProfileClick={handleEditProfileClick} handleAddPlaceClick={handleAddPlaceClick}/>
        <Footer/>

        {
            <PopupWithForm isOpen={isEditAvatarIsOpen && 'popup_opened'} onClose={closeAllPopups} title='Обновить аватар' name='upload' 
            children={(
                <>
                <label className="popup__label popup__label_type_place-link">
                      <input id="place-avatar-link-input" name="popup-place-link" type="url" placeholder="Ссылка на картинку"
                          className="popup__field popup__field_type_place-link" required />
                      <span id="place-avatar-link-input-error" className="popup__field-error"></span>
                  </label>
                  <button type="submit" className="popup__save popup__save_place_add">Сохранить</button>
                  </>
                  )}
                />
        }

        {
            <PopupWithForm onClose={closeAllPopups} title='Редактировать профиль' name='edit' 
            children={(
                <>
                <label className="popup__label popup__label_type_name">
                      <input id="name-input" name="name" type="text" placeholder="Имя"
                          className="popup__field popup__field_type_name" required minLength="2" maxLength="40" />
                      <span id="name-input-error" className="popup__field-error"></span>
                  </label>
                  <label className="popup__label popup__label_type_discription">
                      <input id="discription-input" name="discription" type="text" placeholder="Вид деятельности"
                        className="popup__field popup__field_type_discription" required minLength="2" maxLength="200" />
                      <span id="discription-input-error" className="popup__field-error"></span>
                  </label>
                  <button type="submit" className="popup__save">Сохранить</button>
                  </>
                  )}
                />
        }

        {
            <PopupWithForm isOpen={isAddPlaceIsOpen && 'popup_opened'} onClose={closeAllPopups} title='Новое место' name='add' 
            children={(
                <>
                <label className="popup__label popup__label_type_place-name">
                      <input id="place-name-input" name="popup-place-name" type="text" placeholder="Название"
                          className="popup__field popup__field_type_place-name" required minLength="2" maxLength="30" />
                      <span id="place-name-input-error" className="popup__field-error"></span>
                  </label>
                  <label className="popup__label popup__label_type_place-link">
                      <input id="place-link-input" name="popup-place-link" type="url" placeholder="Ссылка на картинку"
                          className="popup__field popup__field_type_place-link" required />
                      <span id="place-link-input-error" className="popup__field-error"></span>
                  </label>
                  <button type="submit" className="popup__save popup__save_place_add">Сохранить</button>
                  </>
                  )}
                />
        }

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        

        <div className="popup popup_type_confirm">
          <div className="popup__container">
              <h2 className="popup__header">Вы уверены?</h2>
              <form name="popup-confirm" className="popup__form popup__form_type_confirm" noValidate>
                  <button type="submit" className="popup__save popup__save_place_confirm">Да</button>
              </form>
              <button className="popup__close popup__close_place_add item-animation"><img src={closePopupButtonImage}
                      alt="закрыть" className="popup__close-cross" /></button>
          </div>
        </div>  
      </>
  );
}

export default App;
