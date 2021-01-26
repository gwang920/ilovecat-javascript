export default class Loading {
    constructor({ $target }) {
        this.spinnerWrapper = document.createElement('div');
        this.spinnerWrapper.className = 'spinner-wrapper';
        this.spinnerWrapper.classList.add('hidden');

        $target.appendChild(this.spinnerWrapper);

        this.render();
    }

    /*
        toggle 현 생태 = > 반대 상태
    */
    toggleSpinner() {
        const spinner = document.querySelector('.spinner-wrapper');
        spinner.classList.toggle('hidden');
    }

    render() {
        const spinnerImage = document.createElement('img');
        spinnerImage.className = 'spinner-image';
        spinnerImage.src = 'src/img/loading.gif';

        this.spinnerWrapper.appendChild(spinnerImage);
    }
}