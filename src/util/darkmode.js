const STORAGE_KEY = 'user-color-scheme';
const COLOR_MODE_KEY = '--color-mode';

const darkmodeBtn = document.querySelector('.darkmode-btn');

const getCSSCustomProp = (propKey) => {

    /* 
       getComputedStyle 인자로 전달받은 요소의 모든 css 속성값을 담은 객체를 회신
       ref : https://developer.mozilla.org/ko/docs/Web/API/Window/getComputedStyle
    */
    let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

    // Tidy up the string if there’s something to work with
    if (response.length) {
        response = response.replace(/\'|"/g, '').trim();
    }

    // Return the string response by default
    return response;
};

const applySetting = passedSetting => {
    let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

    if (currentSetting) {
        document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
        setButtonLabel(currentSetting);
    } else {
        setButtonLabel(getCSSCustomProp(COLOR_MODE_KEY));
    }
};

const toggleSetting = () => {
    let currentSetting = localStorage.getItem(STORAGE_KEY);

    switch (currentSetting) {
        case null:
            currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
            break;
        case 'light':
            currentSetting = 'dark';
            break;
        case 'dark':
            currentSetting = 'light';
            break;
    }

    localStorage.setItem(STORAGE_KEY, currentSetting);

    return currentSetting;
};

// 버튼 생성
const setButtonLabel = currentSetting => {
    darkmodeBtn.innerText = currentSetting === 'dark' ? '🌕' : '🌑';
};

darkmodeBtn.addEventListener('click', evt => {
    evt.preventDefault();

    applySetting(toggleSetting());
});

applySetting();