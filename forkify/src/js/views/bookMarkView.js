import icons from "url:../../img/icons.svg";

class BookMarkView {
    #parentElement = document.querySelector('.bookmarks');
    #data;

    render(data) {
        this.#data = data || [];

        const markup = this.#generateMarkUp();

        this.#clear();
        this.#parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    #clear() {
        this.#parentElement.innerHTML = '';
    }

    noBookmarks() {
        this.#clear();
        this.#parentElement.innerHTML =
            `<div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                      </svg>
                </div>
                <p>
                    No bookmarks yet. Find a nice recipe and bookmark it :)
                </p>
            </div>`;
    }

    #generateMarkUp() {
        return this.#data.reverse().map(bookmark => `
            <li class="preview">
                <a class="preview__link" href="#${bookmark.id}">
                <figure class="preview__fig">
                    <img src="${bookmark.image}" alt="${bookmark.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__name">${bookmark.title}</h4>
                    <p class="preview__publisher">${bookmark.publisher}</p>
                </div>
                </a>
            </li>
            `).join('');
    }

    addHandlerBookmark(handler) {
        document.querySelector(".container").addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--round');
            if (!btn) return;

            handler();
        });
    }
}

export default new BookMarkView();