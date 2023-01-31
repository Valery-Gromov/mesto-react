function Card(props) {
    const {image, title} = props;

    function handleClick() {
        props.onCardClick(props);

    }


  return (
    <li className="elements__item element" >
        <img src={image} alt={title} className="element__photo" onClick={handleClick} />
        <div className="element__content">
            <h2 className="element__discription">{title}</h2>
            <div className="element__like-container">
                <button type="button" className="element__like"></button>
                <span className="element__like-counter"></span>
            </div>
        </div>
        <button type="button" className="element__delete"></button>
    </li>
  );
}

export default Card;
