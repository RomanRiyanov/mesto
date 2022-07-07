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

    open(handlePopapSubmit) {
        this._popup.classList.add('popup_viewable');
        document.addEventListener('keydown', this._handleEscClose);
        this._handlePopapSubmit = handlePopapSubmit;
        console.log(handlePopapSubmit)
    }

    close() {
        this._popup.classList.remove('popup_viewable');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setLoading(value) {
        const submitButton = this._popup.querySelector('.submit-button');
        if (value) {
            submitButton.textContent = submitButton.textContent + '...';
        } else {
            submitButton.textContent = submitButton.textContent.slice(0, -3);
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.close();
        });
        this._popup.addEventListener('click', (event) => {
            this._closePopupByPressOnOverlay(event);
        });
        const confirmButton = this._popup.querySelector('.confirm-button');

        if (confirmButton) {
            confirmButton.addEventListener('click', () => {
                if (typeof this._handlePopapSubmit === 'function') {
                    this._handlePopapSubmit();
                }
            })
        }
    }
}
