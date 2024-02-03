import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    // criando um clone do objeto initialState e atribuindo à state usando o operador SPRAD.
    state = { ...initialState }

    // constructor(props) {
    //     super(props)
    //     this.clearMemory = this.clearMemory.bind(this)
    //     this.setOperation = this.setOperation.bind(this)
    //     this.addDigit = this.addDigit.bind(this)
    // }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        //se o valor current [posição do ARRAY] for === 0, então seta-se o current para 1, ou seja,
        //a segunda posição do ARRAY e seta TRUE para limpar o display.
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else { // processando caso o current seja a segunda posição do ARRAY.
            const equals = operation === '='
            //pegando a operação que estava armazenada caso o usuário queria fazer uma segunda operação.
            const currentOperation = this.state.operation

            //sempre que uma operação for executada, ela será armazenada no values[0] deixando o values[1]
            //zerado para ser usado para armazenar um novo valor para ser operado.
            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                    return
                }
            } catch(e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({ //colocando as operações no estado.
                //o resultado da operação será armaenado no display para que seja exibido.
                displayValue: values[0],
                //se a operação for um equals será setada como nula e se outra operação o sinal será
                //atualizado como novo operador.
                operation: equals ? null : operation,
                //setando em qual operador o usuário está mexendo, se o usuário colocou equals continuará
                //mexendo no índice 0, caso contrário, o usuário estará mexendo no índice 1.
                current: equals ? 0 : 1, 
                //se for diferente de equals o display será limpo.
                clearDisplay: !equals,
                //passando os valores para serem substituidos no estado.
                values
             })
        }
    }

    addDigit(n) {
        // criando uma regra para ignorar colocar dois pontos, ou seja, diz para a função que se já houver
        // um ponto no display, por favor saia da função e não faça mais nada.
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        //setando para o display limpar mesmo quando o valor estiver em 0 evitando ter zeros à esquerda.
        const clearDisplay = this.state.displayValue === '0'
        || this.state.clearDisplay
        //criando a variável "valor corrente", se limpar display for true, então seta valor vazio,
        //mas se não for limpo então deverá pegar o state.displayValue.
        const currentValue = clearDisplay ? '' : this.state.displayValue
        //adicionando ao valor corrente o valor que sencontra no display.
        const displayValue = currentValue + n
        //setando para os valores aparecerem no display.
        this.setState({ displayValue, clearDisplay: false })
        
        //armzenando dentro do ARRAY criado no estado inicial os valores gerados acima por índices 0 e 1,
        //valores diferentes de ponto ".".
        if (n !== '.') {
            const i = this.state.current
            //parseFloat analisa um argumento string, e retorna um numero de ponto flutuante. Fazemos isso pois
            //no nosso display estão sendo gedos STRINGS e precisamos transdormar em números par operamos.
            const newValue = parseFloat(displayValue)
            //clonando meu ARRAY criado e passando seus valores pa "values".
            const values = [...this.state.values]
            //se eu estiver mexendo no valor de índice 0, então índice 0 recebe novo valor, mas
            //se eu estiver mexendo no valor de índice 1, então índice 1 recebe novo valor.
            values[i] = newValue
            //adicionando o novo ARRAY ao estado do meu objeto.
            this.setState({ values })
        }
    }

    render() {
        const addDigit = n => this.addDigit(n)
        const setOperation = op => this.setOperation(op)
        return (
            <div className='calculator'>
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={e => this.clearMemory()} triple  />
                <Button label="/" click={setOperation} operation />
                <Button label="7" click={addDigit} />
                <Button label="8" click={addDigit} />
                <Button label="9" click={addDigit} />
                <Button label="*" click={setOperation} operation />
                <Button label="4" click={addDigit} />
                <Button label="5" click={addDigit} />
                <Button label="6" click={addDigit} />
                <Button label="-" click={setOperation} operation />
                <Button label="1" click={addDigit} />
                <Button label="2" click={addDigit} />
                <Button label="3" click={addDigit} />
                <Button label="+" click={setOperation} operation />
                <Button label="0" click={addDigit} double />
                <Button label="." click={addDigit} />
                <Button label="=" click={setOperation} operation />
            </div>
        )
    }
}