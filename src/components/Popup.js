export class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    
    _handleEscClose (event) {
        if (event.key === 'Escape') {
          this.close();
        }
    }

    _closePopupByPressOnOverlay (event) {
        if (event.target === event.currentTarget) {
          this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_viewable');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_viewable');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('click', (event) => {
            this._closePopupByPressOnOverlay(event);
        });
    }
}