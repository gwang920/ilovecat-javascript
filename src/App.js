import SearchInput from "./components/SearchInput.js";
import SearchResult from "./components/SearchResult.js";
import Loading from "./components/Loading.js";
import Error from "./components/Error.js";
import DetailModal from './components/DetailModal.js';

import { api } from "./api/api.js";
import { getItem, setItem } from './utils/sessionStorage.js';

export default class App {

    constructor($target) {
        const keywords = getItem('keywords');
        const data = getItem('data');
        console.log(data);
        const searchInput = new SearchInput({
            $target,
            keywords,
            onSearch: async keyword => {
                loading.toggleSpinner();
                const response = await api.fetchCats(keyword);

                if (!response.isError) {
                    setItem('data', response.data);
                    searchResult.setState(response.data);
                    loading.toggleSpinner();
                } else {
                    error.setState(response.data);
                }
            }
        });

        const searchResult = new SearchResult({
            $target,
            initialData: data,
            onClick: async id => {
                loading.toggleSpinner();
                const response = await api.fetchDetailcat(id);
                if (!response.isError) {
                    detailModal.setState(response);
                    loading.toggleSpinner();
                } else {
                    error.setState(response.data);
                }
            },
            onScroll: async () => {
                loading.toggleSpinner();

                const response = await api.fetchRandomCats();
                if (!response.isError) {
                    const beforeData = getItem('data');
                    const nextData = beforeData.concat(response.data);

                    setItem('data', nextData);
                    searchResult.setState(nextData);
                    loading.toggleSpinner();
                } else {
                    error.setState(response.data);
                }
            }
        });

        const loading = new Loading({
            $target
        });

        const error = new Error({
            $target
        });

        const detailModal = new DetailModal({
            $target
        });

        const darkmodeBtn = document.createElement('span');
        darkmodeBtn.className = 'darkmode-btn';
        darkmodeBtn.innerText = '🌕';

        $target.appendChild(darkmodeBtn);
    }
}
