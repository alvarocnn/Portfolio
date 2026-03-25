import icons from "url:../../img/icons.svg";

class ResultView {
    #parentElement = document.querySelector(".search-results");
    #data;
    render(data) {
        this.#data = data;
        this.#parentElement.innerHTML = "";
        console.log(data);
        const markup = data.map(result =>
            `<li class="preview">
                <a class="preview__link preview__link--active" href="#${result.id}">
                <figure class="preview__fig">
                    <img src="${result.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                    <div class="preview__user-generated ${result.key ? '' : 'hidden'}">
                        <svg>
                            <use href="${icons}#icon-user"></use>
                        </svg>
                    </div>
                </div>
                </a>
            </li>`).join("");

        this.#parentElement.insertAdjacentHTML("afterbegin", markup);
    }
}
export default new ResultView();