import React from "react";
import './Button.css'

// Componentes com estados são mais trabalhosos para se manter, pois tem estados que variam com o tempo
// e acabam, por essa variação, gerando alguns bugs,
// por isso deve ser de preferência criar componentes sem estado pois recebem parâmetros de entrada,
// apartir desses parâmetros o componente é renderizado de uma forma muito mais fácil por que ele não tem
// um estado para gerenciar, não fica mudando com o tempo, então os parâmetros passados geram determinados renderes.

// export default props =>
//     <button 
//         className={`
//         button
//         ${props.operation ? 'operation' : ''}
//         ${props.double ? 'double' : ''}
//         ${props.triple ? 'triple' : ''}
// `}>    
//         {props.label}
// </button>

export default props => {
    let classes = 'button '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''

    return (
        <button
            onClick={e => props.click && props.click(e.target.innerHTML)}
            // onClick={e => props.click && props.click(props.label)} (Não funcionou)
            // onClick={e => props.click && props.click(e.target.innerHTML)}
            className={classes}>    
            {props.label}
    </button>
    )
}