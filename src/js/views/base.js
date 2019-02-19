export const pageElements = {
    zipCodeForm: document.querySelector('.zipCodeForm'),
    zipCodeInput: document.querySelector('.zipCode__field'),
    weatherTable: document.querySelector('.weatherTable')
};

export const pageElementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="row justify-content-center ${pageElementStrings.loader}">
            <svg>
                <use href="/fonts/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('beforeend', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${pageElementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};

export const clearWeather = () => {
    const wt = document.querySelector(`.weatherTbl`);
    if (wt) wt.parentElement.removeChild(wt);
};