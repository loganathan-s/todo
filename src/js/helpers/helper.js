/* Helper functions  */

export const extractNumber = (data)=> (parseInt(data.match(/\d+/)) ? parseInt(data.match(/\d+/)) : 0);

export const resetInput = (input)=> (input.value = '');

export const formatDate = (seconds)=> (new Date(parseInt(seconds)).toLocaleString('en-US', {hour: 'numeric',minute:'numeric', hour12: true, day: 'numeric', month: 'short', year: 'numeric' }));

export const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

export const displayInputError = (inputElement) => {
    inputElement.classList.add("tiltHorizontally", "inputError");
    sleep(3100).then(() => {
        removeInputError(inputElement);
    });
};

export const removeInputError = (inputElement) => {
    inputElement.classList.remove("tiltHorizontally", "inputError");
};

export const formatTaskNote = (note) => {
  return note
    .split(' ')
    .map(word => word.length > 30 ? word.substring(0, 30) : word)
    .join(' ')
    .replace(/\s{2,}/g, " ");
};


export const inValidNote = (note) => {
  let errors = false;
  if (note && !note.match(/^[1-9a-zA-Z\s]+$/)) {
    errors = 'Only 1-9, a-z, A-Z are allowed'
  }

  if (note && note.length > 140) {
    errors = 'Only 140 alphanumeric characters are allowed'
  }
  return errors;
}

export const displayGlobalError = (error) => {
      let globalError = document.querySelector("#serverError").querySelector(':scope > ul');
      globalError.innerHTML = `<li>${error}</li>`;
      document.querySelector("#serverError").classList.remove("hide");
      sleep(3100).then(() => {
        clearGlobalError();
    });
  }

export const clearGlobalError = () => {
      document.querySelector("#serverError").classList.add("hide");
      let globalError = document.querySelector("#serverError").querySelector(':scope > ul');
      globalError.innerHTML = "";
  }