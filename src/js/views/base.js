// de-couple internal element names from html class names
/* static page elements */
export const pageElements = {
    weatherUpdateForm: document.querySelector('.weatherUpdateForm'),
    zipCodeInput: document.querySelector('.zipCode__field'),
    weatherTable: document.querySelector('.weatherTable')
};
/* dynamic page elements */
export const pageElementStrings = {
    loader: 'loader'
};

// display spinning loader icon
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

// clear spinning loader icon
export const clearLoader = () => {
    const loader = document.querySelector(`.${pageElementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};

// clear weather look-up results
export const clearWeather = () => {
    const wt = document.querySelector(`.weatherTbl`);
    if (wt) wt.parentElement.removeChild(wt);
};