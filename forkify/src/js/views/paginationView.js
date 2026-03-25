import icons from "url:../../img/icons.svg";

class PaginationView {
    #parentElement = document.querySelector(".search-results");
    #data;


    render(data) {
        this.#data = data;
        const markup = this.#generateMarkUp();
        //this.#clear();
        this.#parentElement.insertAdjacentHTML("beforeend", markup);

    }

    addhandlerClick(handler) {
        this.#parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;

            const goToPage = + btn.dataset.goto;
            handler(goToPage);
        });
    }

    #generateMarkUp() {
        const numPages = Math.ceil(this.#data.results.length / this.#data.resultsPerPage);
        const currentPage = this.#data.page;
        if (currentPage === 1 && numPages > 1) {
            return this.#generateButtonNext(currentPage);
        }

        if (currentPage === numPages && numPages > 1) {
            return this.#generateButtonPrev(currentPage);
        }

        if (currentPage < numPages) {
            return (this.#generateButtonPrev(currentPage) + this.#generateButtonNext(currentPage));

        }
        return "";
    }

    #clear() {
        this.#parentElement.innerHTML = '';
    }

    #generateButtonPrev(currentPage) {
        return `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${currentPage - 1}</span>
                    </button>`;
    }

    #generateButtonNext(currentPage) {
        return `<button data-goto="${currentPage + 1}"class="btn--inline pagination__btn--next">
                        <span>Page ${currentPage + 1}</span>
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                    </button>`;
    }
}

export default new PaginationView();