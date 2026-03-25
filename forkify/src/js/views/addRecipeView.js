import icons from "url:../../img/icons.svg";

class AddRecipeView {
    #parentElement = document.querySelector('.upload');
    #window = document.querySelector(".add-recipe-window");
    #overlay = document.querySelector(".overlay");
    #btnOpen = document.querySelector(".nav__btn--add-recipe");
    #btnClose = document.querySelector(".btn--close-modal");

    constructor() {
        this.addHandlerShowWindow();
        this.addHandlerCloseWindow();
    }



    toggleWindow() {
        this.#overlay.classList.toggle("hidden");
        this.#window.classList.toggle("hidden");
    }

    addHandlerShowWindow() {
        this.#btnOpen.addEventListener("click", this.toggleWindow.bind(this));
    }

    addHandlerCloseWindow() {
        this.#btnClose.addEventListener("click", this.toggleWindow.bind(this));
        this.#overlay.addEventListener("click", this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler) {
        this.#parentElement.addEventListener("submit", function (event) {
            event.preventDefault();
            const dataArr = [...new FormData(this)];
            handler(dataArr);
        });
    }
    #clear() {
        this.#parentElement.innerHTML = '';
    }


    renderError(mensaje) {
        const markUp = `<div class="error">
                        <div>
                        <svg>
                            <use href="${icons}#icon-alert-triangle"></use>
                        </svg>
                        </div>
                        <p>${mensaje}</p>
                    </div>`;
        this.#clear();
        this.#parentElement.insertAdjacentHTML("afterbegin", markUp);
    }

    renderMessage(mensaje) {
        const markUp =
            `<div class="message">
                <div>
                    <svg>
                    <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${mensaje}</p>
            </div>`;
        this.#clear();
        this.#parentElement.insertAdjacentHTML("afterbegin", markUp);
    }

    renderSpinner() {
        const mark =
            `<div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>`;
        this.#parentElement.innerHTML = "";
        this.#parentElement.insertAdjacentHTML("afterbegin", mark);
    }
}


export default new AddRecipeView();