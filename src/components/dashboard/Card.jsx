/* eslint-disable react/prop-types */


function Card({props}) {
    const {title, content} = props;

    return(

        <div>
            <h3>{title}</h3>
            <div>
                <section>{content}</section>
            </div>
        </div>
     )
}

export default Card;
