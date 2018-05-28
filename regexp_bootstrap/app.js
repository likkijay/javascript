// Collection of all input fields except for submit-type (in a form of nodelist)
const inputs = document.querySelectorAll('input:not([type="submit"])');

// Adds event listeners for every input ('blur' event)
inputs.forEach((input) => {
  input.addEventListener('blur', validate);
});

// Function for input value validation
function validate(event) {
  // Value of the input element
  const inputValue = event.target.value;

  // Depending on id of the event target executes corresponding code
  switch (event.target.id) {
    // Event handler for input#name
    case 'name':
      const nameRegExp = /^[a-zA-Z]{2,10}$/;
      regExpTest(nameRegExp, inputValue, event);
      break;

    // Event handler for input#zip
    case 'zip':
      const zipRegExp = /^[0-9]{5}(-[0-9]{4})?$/;
      regExpTest(zipRegExp, inputValue, event);
      break;

    // Event handler for input#email
    case 'email':
      const emailRegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      regExpTest(emailRegExp, inputValue, event);
      break;

    // Event handler for input#phone
    case 'phone':
      const phoneRegExp = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
      regExpTest(phoneRegExp, inputValue, event);
      break;
  }
}

// Function for testing value in a regular expression
function regExpTest(regExp, value, event) {
  if (!regExp.test(value)) {
    event.target.classList.add('is-invalid');
  } else {
    event.target.classList.remove('is-invalid');
  }
}