/*
    localStorage와 sessionStorage는 브라우저 내에 키-값 쌍을 저장할 수 있게해준다.
    이 둘을 사용하면 페이지를 새로 고침하고(sessionStorage의 경우) 
    심지어 브라우저를 다시 실행해도(localStorage의 경우) 데이터가 사라지지 않고 남아있다.
*/
function getItem(key) {
    const value = sessionStorage.getItem(key);

    if (key === 'data') return value === null ? null : JSON.parse(value);
    else return value === null ? [] : JSON.parse(value);
}

function setItem(key, value) {
    if (value === null || value === undefined) return;

    const toJson = JSON.stringify(value);

    sessionStorage.setItem(key, toJson);
}

export { getItem, setItem };