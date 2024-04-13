let running_nums = 0; /*промежуточный результат*/
let data = "0"; /*введенное число*/
let operator;
const screen = document.querySelector('.screen'); /*отображение результата на экране калькулятора*/


function button_click(value){ /*вызов при нажатии на любую кнопку калькулятора*/
    if(isNaN(value)){
        symbols(value); /*если это не число - вызов операции*/        
    }
    else{
        numbers(value); /*ввод цифр*/
    }
    screen.innerText = data; /*обновление экрана калькулятора*/
}


function symbols(symbol){
    switch(symbol){
        case 'C': /*очистка экрана*/
            data = "0";
            running_nums = 0;
            break;
        case '=':
            if(operator === null){ /*если оператора не было - возвращаем введенное число*/
                return;
            }
            operation(parseInt(data)); 
            data = running_nums;
            /*running_nums = 0*/
            break;
        case '←':
            if(data.length === 1){
                data = '0';
            }
            else{
                data = data.slice(0, data.length - 1); /*удаление, начиная с последнего символа*/
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
        case '%':
        case 'x²':
        case 'xⁿ':
        case '√x':
        case '!x':
            math(symbol);
            break;
    }
}


function math(symbol){
    if(data === '0'){
        return;
    }

    const intdata = parseInt(data); /*преобразование данных в число*/

    if(running_nums === 0){ /*если еще не выполнена операция*/
        running_nums = intdata;
    }
    else{
        operation(intdata);
    }
    operator = symbol;
    data = '0';
}


function operation(intdata){
    if(operator === '+'){
        running_nums += intdata;
    }
    else if(operator === '−'){
        running_nums -= intdata;
    }
    else if(operator === '×'){
        running_nums *= intdata;
    }
    else if(operator === '÷'){
        running_nums /= intdata;
    }
    else if(operator === '%'){
        running_nums = running_nums / 100 * intdata;
    }
    else if(operator === 'x²'){
        running_nums **= 2;
    }
    else if(operator === 'xⁿ'){
        running_nums **= intdata;
    }
    else if(operator === '√x'){
        running_nums **= 1/2;
    }
    else if(operator === '!x'){
        running_nums = factorial(running_nums);
    }
}


function factorial(num){
    if (num === 0 || num === 1){
        return 1;
    } 
    else{
        return num * factorial(num - 1);
    }
}

function numbers(num){ /*ввод цифр*/
    if(data === "0"){
        data = num;
    }
    else{
        data += num; 
    }
}


function bclick(){
    document.querySelector('.buttons').addEventListener('click', function(event){
    button_click(event.target.innerText);})
}

bclick();