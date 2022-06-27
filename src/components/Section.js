export class Section {
    constructor (data, containerSelector) {
        this._renderer = data.renderer;
        this._cardsContainer = document.querySelector(containerSelector);
     }

        renderAllPage (data) {
            data.forEach((item) => {
                this._renderer(item, this._cardsContainer) ;
            });
        } 

        addItem (cardItem) {
            this._cardsContainer.prepend(cardItem);
        }
    }