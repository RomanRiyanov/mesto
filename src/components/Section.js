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

    // constructor (data, containerSelector) {
    //     this._renderer = data.renderer;
    //     this._cardsContainer = document.querySelector(containerSelector);
    //  }

    //     renderAllPage (data) {
    //         data.forEach((item) => {
    //             this._renderer(item) ;
    //         });
    //     } 

    //     addItem (cardItem) {
    //         this._cardsContainer.prepend(cardItem);
    //     }
    // }