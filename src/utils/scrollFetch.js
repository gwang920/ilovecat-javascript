import { throttling } from './throttle.js';

/*
    마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것
*/

const throttler = throttling();

function scrollFetch(fetchData) {
    window.addEventListener('scroll', () => {
        throttler.throttle(() => {
            console.log("Activate Scroll Event");
            if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
            fetchData();
        }, 700);
    });
}

function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function getDocumentHeight() {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
}

export { scrollFetch };