import closePopupButtonImage from '../images/button__cross.svg'
import { useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/Api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
    const [isEditPopupIsOpen, setIsEditPopupIsOpen] = useState(false);
    const [isEditAvatarIsOpen, setIsEditAvatarIsOpen] = useState(false);
    const [isAddPlaceIsOpen, setIsAddPlaceIsOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    // Запрос данных профиля с сервера
    useEffect(() => {
        api.getProfile()
        .then(userData => {
            setCurrentUser(userData)
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    // Запрос карточек с сервера
    useEffect(() => {
        api.getInitialCards()
            .then(cardsList => {

                setCards(cardsList);
            })
            .catch(err => {
                // тут ловим ошибку
                console.log(err)
            });
    }, []);


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

    function handleUpdateUser(data) {
        api.editProfile(data.name, data.about)
            .then(userData => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            }) 
    };

    function handleUpdateAvatar(data) {
        api.uploadAvatar(data.avatar)
            .then(userData => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })
    };

    function handleAddPlaceSubmit(data) {
        api.addCard(data.name, data.link)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })
    };

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        if (!isLiked) {
            api.addLike(card._id)
            .then(newCard => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            api.deleteLike(card._id)
            .then(newCard => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(err);
            })
        }

    };

    function handleCardDelete(card) {

        api.deleteCard(card._id)
        .then(res => {
            setCards((state) => state.filter((c) => c._id !== card._id))
        })
        .catch(err => {
            console.log(err);
        })

    }



    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} handleEditAvatarClick={handleEditAvatarClick} handleEditProfileClick={handleEditProfileClick} handleAddPlaceClick={handleAddPlaceClick} />
            <Footer />

            <EditAvatarPopup isOpen={isEditAvatarIsOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <EditProfilePopup isOpen={isEditPopupIsOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlaceIsOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
            

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
        </CurrentUserContext.Provider>
    );
}

export default App;
