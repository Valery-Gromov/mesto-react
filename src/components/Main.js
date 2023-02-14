import { useContext, useEffect, useState } from 'react';

import profileEditButton from '../images/profile__edit-button.svg';
import profileAddButton from '../images/button__add.svg';
import { api } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    // const [cards, setCards] = useState([]);

    // подписка на контекст CurrentUserContext
    const currentUser = useContext(CurrentUserContext);

    // function handleCardLike(card) {
    //     // Снова проверяем, есть ли уже лайк на этой карточке
    //     const isLiked = card.likes.some(i => i._id === currentUser._id);
        
    //     if (!isLiked) {
    //         api.addLike(card._id)
    //         .then(newCard => {
    //             setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     } else {
    //         api.deleteLike(card._id)
    //         .then(newCard => {
    //             setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     }

    // }

    // function handleCardDelete(card) {

    //     api.deleteCard(card._id)
    //     .then(res => {
    //         setCards((state) => state.filter((c) => c._id !== card._id))
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })

    // }

    // useEffect(() => {
    //     api.getInitialCards()
    //         .then(cardsList => {

    //             setCards(cardsList);
    //         })
    //         .catch(err => {
    //             // тут ловим ошибку
    //             console.log(err)
    //         });
    // }, []);

    // console.log(cards);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.handleEditAvatarClick}>
                    <img src={currentUser.avatar} alt="аватар пользователя" className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <div className="profile__name-container">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button item-animation" onClick={props.handleEditProfileClick}>
                            <img className="profile__edit-button-icon" src={profileEditButton}
                                alt="Кнопка изменить профиль" />
                        </button>
                    </div>
                    <p className="profile__discription">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button item-animation" onClick={props.handleAddPlaceClick}>
                    <img className="profile__add-button-icon" src={profileAddButton} alt="кнопка добавить пост" />
                </button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {
                        props.cards.map(card => {
                           return (<Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)
                        })
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;
