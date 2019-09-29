const domElements = {
    'timeEl': document.getElementById('time'),
    'nameEl': document.getElementById('name'),
    'greetingEl': document.getElementById('greeting'),
    'focusEl': document.getElementById('focus'),
    'coverEl': document.querySelector('.cover'),
};

function showTime() {
    const time = new Date().toTimeString().split(' ')[0];
    const hour = time.split(':')[0];

    domElements.timeEl.textContent = time;

    if (hour < 12) {
        domElements.coverEl.classList = 'cover morning';
        domElements.greetingEl.textContent = 'Good morning';
    } else if (hour < 18) {
        domElements.coverEl.classList = 'cover afternoon';
        domElements.greetingEl.textContent = 'Good afternoon';
        document.body.style.color = '#000';
    } else {
        domElements.coverEl.classList = 'cover evening';
        domElements.greetingEl.textContent = 'Good evening';
    }
    
    setTimeout(showTime, 1000);
}

function changeName(event) {
    if (event.type === 'keypress') {
        if (event.keyCode === 13) {
            const name = event.target.textContent;
            localStorage.setItem('name', name);
            domElements.nameEl.blur();
        }
    } else {
        const name = event.srcElement.textContent;
        localStorage.setItem('name', name);
    }
}

function changeFocus(event) {
    if (event.type === 'keypress') {
        if (event.keyCode === 13) {
            const focus = event.target.textContent;
            localStorage.setItem('focus', focus);
            domElements.focusEl.blur();
        }
    } else {
        const focus = event.srcElement.textContent;
        localStorage.setItem('focus', focus);
    }
}

domElements.nameEl.addEventListener('blur', changeName);
domElements.focusEl.addEventListener('blur', changeFocus);
domElements.nameEl.addEventListener('keypress', changeName);
domElements.focusEl.addEventListener('keypress', changeFocus);

document.addEventListener('DOMContentLoaded', () => {
    domElements.nameEl.textContent = localStorage.getItem('name') || 'Anya';
    domElements.focusEl.textContent = localStorage.getItem('focus') || 'Choose a focus';
});

showTime();
