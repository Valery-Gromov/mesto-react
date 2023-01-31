import { useEffect, useState } from 'react';

import profileEditButton from '../images/profile__edit-button.svg';
import profileAddButton from '../images/button__add.svg';
import { api } from '../utils/Api';
import Card from './Card';

function Main(props) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getProfile(), api.getInitialCards()])
            .then(([userData, cardsList]) => {

                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);

                setCards(cardsList);
            })
            .catch(err => {
                // тут ловим ошибку
                console.log(err)
            });
    }, [])

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.handleEditAvatarClick}>
                    <img src={userAvatar} alt="аватар пользователя" className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <div className="profile__name-container">
                        <h1 className="profile__name">{userName}</h1>
                        <button type="button" className="profile__edit-button item-animation" onClick={props.handleEditProfileClick}>
                            <img className="profile__edit-button-icon" src={profileEditButton}
                                alt="Кнопка изменить профиль" />
                        </button>
                    </div>
                    <p className="profile__discription">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button item-animation" onClick={props.handleAddPlaceClick}>
                    <img className="profile__add-button-icon" src={profileAddButton} alt="кнопка добавить пост" />
                </button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {
                        cards.map(card => {
                           return (<Card key={card._id} image={card.link} title={card.name} onCardClick={props.onCardClick} />)
                        })
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;
