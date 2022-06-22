export class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
    }
    
    _handleEscClose () {
        if (event.key === 'Escape') {
          this.close();
        }
    }

    _closePopapByPressOnOverlay (popup) {
        if (event.target === event.currentTarget) {
          this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_viewable');
        document.addEventListener('keydown', () => {this._handleEscClose()});
    }

    close() {
        this._popup.classList.remove('popup_viewable');
        document.removeEventListener('keydown', () => {this._handleEscClose()});
    }

    setEventSisteners() {
        const closeButton = document.querySelector('#close-button' + this._popupSelector.slice(6));
        closeButton.addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('click', () => {
            this._closePopapByPressOnOverlay();
        });
    }
}