export class Section {
    constructor (renderer, containerSelector) {
        this._renderer = renderer;
        this._cardsContainer = document.querySelector(containerSelector);
     }

        renderAllPage (data) {
            data.forEach((item) => {
                this._renderer(item) ;
            });
        } 

        addItem (cardItem) {
            this._cardsContainer.prepend(cardItem);
        }
    }