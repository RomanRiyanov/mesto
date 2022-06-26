export class Section {
    constructor (data, containerSelector) {
        this._renderer = data.renderer;
        this._cardsContainer = document.querySelector(containerSelector);
    }

        renderAllPage (data) {
            data.forEach((item) => {
                this._cardsContainer.prepend( this._renderer(item) );
            });
        }

        addItem (cardItem) {
            this._cardsContainer.prepend(cardItem);
        }
    }