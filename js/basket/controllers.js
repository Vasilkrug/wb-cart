import {model} from './model.js';
import {view} from './view.js';
import {hideBlock} from './utils.js';

export const setupControllers = () => {
    const selectItemsCheckbox = document.querySelectorAll('[data-index]');
    const plusBtns = document.querySelectorAll('[data-direction="plus"]');
    const minusBtns = document.querySelectorAll('[data-direction="minus"]');
    const likeBtns = document.querySelectorAll('.like');
    const deleteBtns = document.querySelectorAll('.delete');

    likeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            const action = btn.dataset.action;
            console.log(action)
            model.addToFavouriteItem(id, action)
        })
    });

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const deleteId = Number(btn.dataset.id);
            const action = btn.dataset.action;
            model.deleteItem(deleteId, action)
        })
    })

    selectItemsCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            model.checkedItemToggle(checkbox.dataset.index);
            model.setTotalPrice();
            model.setTotalProduct();
            model.setNoDiscountPrice();
        })
    });

    plusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            model.increment(btn.dataset.counterId);
            model.setTotalPrice();
            model.setTotalProduct();
            model.setNoDiscountPrice();
        })
    });

    minusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            model.decrement(btn.dataset.counterId);
            model.setTotalPrice();
            model.setTotalProduct();
            model.setNoDiscountPrice();
        });
    });
};

const arrow = document.querySelector('.toggle-arrow');
const missingItemsArrow = document.querySelector('.missing-items-arrow');
const missingItemsList = document.querySelector('.missing-items-list');
const basketItemsWrapper = document.querySelector('.basket-items-wrapper');
const selectAllCheckbox = document.getElementById('select-all');
const payInput = document.getElementById('select-pay');
const confirmPayBtn = document.querySelector('.confirm-pay');

selectAllCheckbox.addEventListener('change', () => {
    model.checkedAllItemsToggle(selectAllCheckbox);
    model.setTotalPrice();
    model.setTotalProduct();
    model.setNoDiscountPrice();
});

window.addEventListener('load', () => {
    model.setTotalPrice();
    model.setTotalProduct();
    model.setNoDiscountPrice();
});

payInput.addEventListener('change', () => {
    if (payInput.checked) {
        confirmPayBtn.classList.add('active-btn');
    } else {
        confirmPayBtn.classList.remove('active-btn');
    }
    model.setTotalPrice();
});

arrow.addEventListener('click', () => {
    hideBlock(arrow, basketItemsWrapper, 'block');
    model.setTotalPrice();
    model.setTotalProduct();
});

missingItemsArrow.addEventListener('click', () => {
    hideBlock(missingItemsArrow, missingItemsList, 'flex');
});

const modalLinks = document.querySelectorAll('.modal-link');

modalLinks.forEach(link => {
    const action = link.dataset.action;
    link.addEventListener('click', (e) => {
        e.preventDefault();
        model.openModal(action);
    });
});

export const setupModalListeners = () => {
    const closeBtn = document.querySelector('.modal-close');
    const modalInputs = document.querySelectorAll('[data-radio-index]');
    const submitModalButton = document.querySelector('.modal-button');
    const modal = document.querySelector('.modal');
    const action = modal.dataset.active;
    const deliveryButtons = document.querySelectorAll('.delivery-button');


    closeBtn.addEventListener('click', () => {
        model.closeModal(action);
    });

    modalInputs.forEach(input => {
        input.addEventListener('change', () => {
            const id = input.dataset.radioIndex;
            model.changeActiveItem(+id, action);
            model.FindActiveItem(+id, action);
        });
    });

    submitModalButton.addEventListener('click', () => {
        model.getActiveItem(action);
        model.closeModal(action);
    });

    deliveryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const method = button.dataset.method;
            model.changeMethod(action, method);
        });
    });
};

const formInputs = document.querySelectorAll('.text-input');
const form = document.querySelector('.form-wrapper');

confirmPayBtn.addEventListener('click', () => {
    model.enableValidation();
    const hasErrors = Object.entries(model.inputFields)
        .some(([field, value]) => value.error !== '');
    const rect = form.getBoundingClientRect();
    if (hasErrors) {
        window.scrollTo({
            top: form.offsetTop,
            left: rect.x,
            behavior: 'smooth'
        });
    }
});

formInputs.forEach(input => {
    const name = input.name;
    input.addEventListener('input', () => {
        const value = input.value;
        model.setInputValue(name, value);
    });
});

view.init();