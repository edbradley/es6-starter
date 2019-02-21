/* static page element mappings */
export const pageElements = {
    weatherUpdateForm: document.querySelector('.weatherUpdateForm'),
    zipCodeInput: document.querySelector('.zipCode__field'),
    weatherTable: document.querySelector('.weatherTable'),
    weatherMap: document.querySelector('.map')
};

/* dynamic page element mappings */
export const pageElementStrings = {
    loader: 'loader'
};

/**
 * @name renderLoader
 * Display spinning loader icon (during an async process). 
 * @param {*} parent html parent element for rendered loader
 */
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

/**
 * @name clearLoader
 * Clear spinning loader icon (after an async process).
 */
export const clearLoader = () => {
    const loader = document.querySelector(`.${pageElementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};

/**
 * @name clearWeather
 * Clear Weather look-up results
 */
export const clearWeather = () => {
    const wt = document.querySelector(`.weatherTbl`);
    if (wt) wt.parentElement.removeChild(wt);
};

/**
 * @name showMap
 * show/hide Google map
 * @param {*} sw boolen yes/no, true/false value
 */
export const showMap = (sw) => {
    const mapClasses = document.querySelector(`.map`).classList;
    // * show/true *
    if (sw) {
        if (mapClasses.contains("hide_map")) {
            mapClasses.remove("hide_map");
        }
    // * hide/false *
    } else {
        if ((mapClasses.contains("hide_map") != true)) {
            mapClasses.add("hide_map");
        }
    }
};