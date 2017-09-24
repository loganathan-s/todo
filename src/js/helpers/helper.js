/* Helper functions  */

export const extractNumber = (data)=> (parseInt(data.match(/\d+/)) ? parseInt(data.match(/\d+/)) : 0);

export const resetInput = (input)=> (input.value = '');

export const  displayBackendError = (error) => {
    let globalError = document.querySelector("#serverError");
    globalError.innerHTML = error;
    globalError.classList.remove("hide");
};

export const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const hasError = (inputElement) => {
     return ((inputElement.nextSibling && inputElement.nextSibling.classList && inputElement.nextSibling.classList.contains("errorText")) || false);
};

export const displayError = (inputElement) => {
    inputElement.classList.add("shakeIt", "inputError");
    return (!hasError(inputElement) ? inputElement.insertAdjacentHTML("afterend", "<span class='errorText'>can't be blank</span>") : false);
};

export const removeError = (inputElement) => {
    inputElement.classList.remove("shakeIt", "inputError");
    return (hasError(inputElement) ? inputElement.nextSibling.remove() : false);
};