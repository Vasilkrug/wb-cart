import {model} from './model.js';
import {setupControllers, setupModalListeners} from './controllers.js';

export const view = {
    render() {
        const basketItemsList = document.querySelector('.basket-items-list');
        const html = model.state.map((item, index) => {
            const totalPrice = Math.floor(item.count * item.price);
            const discountPrice = Math.floor(totalPrice - (item.price * item.sale / 100 * item.count));
            const remains = item.remains - item.count;
            return `<li class="basket-item">
                            <div class="basket-item-info-wrapper">
                                <label class="checkbox-label" for=${'item-' + item.id}>
                                    <input class="checkbox-input" id=${'item-' + item.id} type="checkbox" ${item.checked ? 'checked' : ''} data-index=${index}>
                                    <span class="checkbox checkbox-item"></span>
                                    <img class="basket-item-img" src=${item.img} alt="t-shirt">
                                </label>
                                <div class="basket-item-text">
                                <div class="basket-item-price mobile-price">
                                    <div class="item-price">${discountPrice.toLocaleString("ru-RU")} сом</div>
                                    <div class="item-discount"> ${totalPrice.toLocaleString("ru-RU")} сом
                                    </div>
                                </div>
                                    <p class="item-name">${item.name}</p>
                                    <div class=${item.characters.length ? "basket-item-characters" : "basket-item-characters-hide"}>
                                    ${item.characters.map(character => {
                return `<span>${character}</span>`
            }).join('')}
                                    </div>
                                    <div class="basket-item-location">
                                        <div class="address-name">${item.location}</div>
                                        <div class="company">
                                            ${item.company}
                                            <span>
                                            <img class="tooltip" src="../../assets/icons/info.png" alt="info">
                                            <div class="tooltip-container info-tooltip">
                                            <div class="tooltip-title">OOO «МЕГАПРОФСТИЛЬ»</div>
                                            <div class="tooltip-text">ОГРН: 5167746237148</div>
                                            <div class="tooltip-text">129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34</div>
                                            </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="basket-item-controls-wrapper">
                                <div class="basket-item-controls">
                                    <div class="counter">
                                        <button class="counter-button ${item.count < 2 ? 'disabled' : ''}" data-counter-id=${index} data-direction="minus">−</button>
                                        <div class="counter-value">${item.count}</div>
                                        <button class="counter-button ${item.count === item.remains ? 'disabled' : ''}" data-counter-id=${index} data-direction="plus">+</button>
                                    </div>
                                    <div class="max-products" data-hidden=${remains <= 2 ? 'false' : 'true'}>Осталось ${remains} шт.</div>
                                    <div class="controls">
                                        <svg class="like-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03396 4.05857C2.26589 4.75224 1.76684 5.83284 1.99493 7.42928C2.22332 9.02783 3.26494 10.6852 4.80436 12.3478C6.25865 13.9184 8.10962 15.4437 9.99996 16.874C11.8903 15.4437 13.7413 13.9184 15.1956 12.3478C16.735 10.6852 17.7766 9.02783 18.005 7.4293C18.233 5.83285 17.734 4.75224 16.9659 4.05856C16.1766 3.34572 15.055 3 14 3C12.1319 3 11.0923 4.08479 10.5177 4.68443C10.4581 4.7466 10.4035 4.80356 10.3535 4.85355C10.1582 5.04882 9.84166 5.04882 9.6464 4.85355C9.59641 4.80356 9.54182 4.7466 9.48224 4.68443C8.90757 4.08479 7.86797 3 5.99995 3C4.94495 3 3.82325 3.34573 3.03396 4.05857ZM2.36371 3.31643C3.37369 2.40427 4.75202 2 5.99995 2C8.07123 2 9.34539 3.11257 9.99996 3.77862C10.6545 3.11257 11.9287 2 14 2C15.2479 2 16.6262 2.40428 17.6362 3.31644C18.6674 4.24776 19.2668 5.66715 18.9949 7.5707C18.7233 9.47217 17.5149 11.3148 15.9294 13.0272C14.3355 14.7486 12.3064 16.3952 10.3 17.9C10.1222 18.0333 9.87773 18.0333 9.69995 17.9C7.69353 16.3952 5.66443 14.7485 4.0706 13.0272C2.48503 11.3148 1.27665 9.47217 1.00498 7.57072C0.733012 5.66716 1.33249 4.24776 2.36371 3.31643Z" fill="black"/> 
                                    </svg> 
                                        <svg class="delete-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/> 
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/> 
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/> 
                                        </svg>
                                    </div>
                                </div>
                                <div class="basket-item-price">
                                    <div class="item-price">${discountPrice.toLocaleString("ru-RU")} <span class="currency">сом</span></div>
                                    <div class="item-discount">
                                                <span class="item-discount tooltip">${totalPrice.toLocaleString("ru-RU")} сом</span>
                                                <div class="tooltip-container price-tooltip">
                                                <div class="price-tooltip-text">
                                                <span>Скидка ${Math.floor(item.sale)}%</span>
                                                <span>${Math.floor(discountPrice - totalPrice).toLocaleString("ru-RU")} сом</span>
                                                </div>
                                                <div class="price-tooltip-text">
                                                <span>Скидка покупателя 10%</span>
                                                <span>−30 сом</span>
                                                </div>
                                                </div>
                                                       </div>
                                </div>
                            </div>
                        </li>`
        }).join('');
        basketItemsList.innerHTML = html;
        setupControllers();
    },
    renderPrice() {
        const totalPrice = document.querySelector('.total-price');
        const totalProduct = document.querySelector('.total-product');
        const noDiscountPrice = document.querySelector('.no-discount');
        const discount = document.querySelector('.discount');
        const cartCounter = document.querySelector('.cart-counter');

        totalPrice.innerHTML = `${model.totalPrice.toLocaleString("ru-RU")} сом`;
        totalProduct.innerHTML = `${model.totalProduct} товаров`;
        noDiscountPrice.innerHTML = `${model.noDiscountPrice.toLocaleString("ru-RU")} сом`;
        discount.innerHTML = `${model.totalPrice - model.noDiscountPrice}`;
        cartCounter.innerHTML = `${model.totalProduct}`;
    },
    renderPayBtn() {
        const confirmPayBtn = document.querySelector('.confirm-pay');
        if (confirmPayBtn.classList.contains('active-btn')) {
            confirmPayBtn.innerHTML = `Оплатить ${model.totalPrice} сом`;
        } else {
            confirmPayBtn.innerHTML = `Заказать`;
        }
    },
    renderHideInfo() {
        const arrow = document.querySelector('.toggle-arrow');
        const selectAllLabel = document.querySelector('.select-all-label');
        const hideInfo = document.querySelector('.hide-info');
        const basketItemsSelection = document.querySelector('.basket-items-selection');

        if (arrow.classList.contains('arrow-hidden')) {
            selectAllLabel.style.display = 'none';
            hideInfo.style.display = 'block';
            basketItemsSelection.style.marginBottom = '16px'
            hideInfo.innerHTML = `${model.totalProduct} товаров · ${model.totalPrice.toLocaleString('ru-RU')} сом`;
        } else {
            hideInfo.style.display = 'none';
            basketItemsSelection.style.marginBottom = '0px';
            selectAllLabel.style.display = 'flex';
        }
    },
    renderMissingItems() {
        const missingItemsList = document.querySelector('.missing-items-list');
        const html = model.state.map((item) => {
            return `<li class="basket-item missing-item">
                            <div class="basket-item-info-wrapper">
                                    <img class="basket-item-img" src=${item.missingImg} alt="t-shirt">
                                <div class="basket-item-text missing-item-text">
                                    <p class="item-name">${item.name}</p>
                                    <div class=${item.characters.length ? "basket-item-characters" : "basket-item-characters-hide"}>
                                    ${item.characters.map(character => {
                return `<span>${character}</span>`
            }).join('')}
                                    </div>
                                </div>
                            </div>
                            <div class="basket-item-controls-wrapper">
                                <div class="basket-item-controls missing-controls">
                                    <div class="controls">
                                        <svg class="like-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03396 4.05857C2.26589 4.75224 1.76684 5.83284 1.99493 7.42928C2.22332 9.02783 3.26494 10.6852 4.80436 12.3478C6.25865 13.9184 8.10962 15.4437 9.99996 16.874C11.8903 15.4437 13.7413 13.9184 15.1956 12.3478C16.735 10.6852 17.7766 9.02783 18.005 7.4293C18.233 5.83285 17.734 4.75224 16.9659 4.05856C16.1766 3.34572 15.055 3 14 3C12.1319 3 11.0923 4.08479 10.5177 4.68443C10.4581 4.7466 10.4035 4.80356 10.3535 4.85355C10.1582 5.04882 9.84166 5.04882 9.6464 4.85355C9.59641 4.80356 9.54182 4.7466 9.48224 4.68443C8.90757 4.08479 7.86797 3 5.99995 3C4.94495 3 3.82325 3.34573 3.03396 4.05857ZM2.36371 3.31643C3.37369 2.40427 4.75202 2 5.99995 2C8.07123 2 9.34539 3.11257 9.99996 3.77862C10.6545 3.11257 11.9287 2 14 2C15.2479 2 16.6262 2.40428 17.6362 3.31644C18.6674 4.24776 19.2668 5.66715 18.9949 7.5707C18.7233 9.47217 17.5149 11.3148 15.9294 13.0272C14.3355 14.7486 12.3064 16.3952 10.3 17.9C10.1222 18.0333 9.87773 18.0333 9.69995 17.9C7.69353 16.3952 5.66443 14.7485 4.0706 13.0272C2.48503 11.3148 1.27665 9.47217 1.00498 7.57072C0.733012 5.66716 1.33249 4.24776 2.36371 3.31643Z" fill="black"/> 
                                    </svg> 
                                        <svg class="delete-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/> 
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/> 
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/> 
                                        </svg>
                                    </div>
                                </div>
                                <div class="basket-item-price hidden">
                                    <div class="item-price">${0} <span class="currency">сом</span></div>
                                    <div class="item-discount">
                                                <span class="item-discount tooltip">${0} сом</span>
                                                </div>
                                </div>
                            </div>
                        </li>`
        }).join('');
        missingItemsList.innerHTML = html;
    },
    renderPayList() {
        return `<div class="pay-list">
        ${model.infoState.pay.list.map(item => {
            return `<label class="radio-label" for=radio-${item.id}>
            <input class="radio-input" type=radio id=radio-${item.id} data-radio-index=${item.id} ${item.checked ? "checked" : ''}>
            <span class="radio-checkbox"></span>
            <div class="pay-card">
                <img src=${item.img} alt="pay-card">
                <span>${item.cardNumber}</span>
            </div>
        </label>`
        }).join('')}
    </div>`
    },
    renderDelivery() {
        let delivery = ''
        let pickUprateHtml = ''
        model.infoState.delivery.list.forEach(item => {
            if (item.delivery === model.deliveryMethod) {
                if (item.delivery === 'pick-up') {
                    pickUprateHtml = `<div class="point-of-issue-info">
                                    <img src="assets/icons/star.svg" alt="star">
                                     <span class="rate">${item.rate}</span>
                                     <span class="gray">Пункт выдачи</span>
                                   </div>`
                }
                delivery += `
                <div class="delivery-item-wrapper">
                <div class="delivery-item">
                <label class="radio-label" for=radio-${item.id}>
                <input class="radio-input" type=radio id=radio-${item.id} data-radio-index=${item.id} ${item.checked ? "checked" : ''}>
                <span class="radio-checkbox"></span>
                <div class="adress-item">
                <span>${item.address}</span>
                ${pickUprateHtml}
                </div>
                </label>
                <svg class="delete-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/> 
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/> 
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/> 
                </svg>
                </div>
                </div>
                `
            }
        })
        return `<div class="delivery-list-wrapper">
        <div class="delivery-buttons">
        <button class="delivery-button ${'pick-up' === model.deliveryMethod ? 'button-active' : ''}" data-method="pick-up">В пункт выдачи</button>
        <button class="delivery-button ${'courier' === model.deliveryMethod ? 'button-active' : ''}" data-method="courier">Курьером</button>
        </div>
        <h3 class="delivery-title">Мои адреса</h3>
        <div class="delivery-list">
        ${delivery}
        </div>
       </div>`
    },
    renderActiveDeliveryItem(item) {
        const addressText = document.querySelector('.address-text');
        const rate = document.querySelector('.rate');
        const pointOfIssueAddress = document.querySelector('.point-of-issue-address');
        const basketInfoDelivery = document.querySelector('.basket-info-delivery');
        const deliveryMethod = document.querySelector('.delivery-method');

        addressText.innerHTML = item.address
        pointOfIssueAddress.innerHTML = item.address

        if (item.delivery === 'pick-up') {
            rate.innerHTML = item.rate;
            basketInfoDelivery.innerHTML = `Доставка в пункт выдачи`;
            deliveryMethod.innerHTML = `Пункт выдачи`;
        } else {
            rate.innerHTML = 'Доставка курьером';
            basketInfoDelivery.innerHTML = `Доставка курьером`;
            deliveryMethod.innerHTML = `Курьером`;
        }
    },
    renderModal(action) {
        const container = document.querySelector('.modal-wrapper');
        const modal = `<div class="modal ${action}-modal" data-active=${action}>
            <div class="modal-title">
                <h2>${action === 'pay-modal' ? 'Способ оплаты' : 'Способ доставки'}</h2>
                <svg class="modal-close" width="15" height="15" fill="#AAAAAE" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                </svg>
            </div>
            <div class="modal-content">
                    ${action === 'pay' ? this.renderPayList() : this.renderDelivery()}
            </div>
            <div class="modal-footer">
                <button class="button modal-button">Выбрать</button>
            </div>
        </div>
        <div class="overlay"></div>`
        if (model.isModalVisible) {
            container.innerHTML = modal;
            setupModalListeners();
        } else {
            container.innerHTML = '';
        }
    },
    renderActivePayItem(item) {
        const payBlocks = document.querySelectorAll('.pay')
        const html = `<img src=${item.img} src='pay-card' alt="card"/>
        <span class="card-number">${item.cardNumber}</span>
        `
        payBlocks.forEach(block => {
            block.innerHTML = html;
        })
    },
    renderInputsErros() {
        const inn = document.querySelector('.inn');

        inn.innerHTML = model.inputFields.inn.error ? '' : 'Для таможенного оформления';
        Object.entries(model.inputFields).forEach(([field, value]) => {
            const error = document.querySelector(`.${field}-error`);
            error.innerHTML = value.error;

        })
    },
    init() {
        this.render();
        this.renderPrice();
        this.renderPayBtn();
        this.renderHideInfo();
        this.renderMissingItems();
    },
}