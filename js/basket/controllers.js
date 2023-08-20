import {model} from "./model.js";
import {view} from "./view.js";

export const setupControllers = () => {
    const selectItemsCheckbox = document.querySelectorAll('[data-index]');
    const plusBtns = document.querySelectorAll('[data-direction="plus"]');
    const minusBtns = document.querySelectorAll('[data-direction="minus"]');

    selectItemsCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            model.checkedItemToggle(checkbox.dataset.index)
            model.setTotalPrice()
            model.setTotalProduct()
            model.setNoDiscountPrice()
        })
    })


    plusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            model.increment(btn.dataset.counterId)
            model.setTotalPrice()
            model.setTotalProduct()
            model.setNoDiscountPrice()
        })
    })

    minusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            model.decrement(btn.dataset.counterId)
            model.setTotalPrice()
            model.setTotalProduct()
            model.setNoDiscountPrice()
        })
    })
}
const arrow = document.querySelector('.toggle-arrow');
const basketItemsWrapper = document.querySelector('.basket-items-wrapper')
const selectAllCheckbox = document.getElementById('select-all');
const payInput = document.getElementById('select-pay');
const confirmPayBtn = document.querySelector('.confirm-pay');

selectAllCheckbox.addEventListener('change', () => {
    model.checkedAllItemsToggle(selectAllCheckbox)
    model.setTotalPrice()
    model.setTotalProduct()
    model.setNoDiscountPrice()
})

window.addEventListener('load', () => {
    model.setTotalPrice()
    model.setTotalProduct()
    model.setNoDiscountPrice()
})

payInput.addEventListener('change', () => {
    if (payInput.checked) {
        confirmPayBtn.classList.add('active-btn')
    } else {
        confirmPayBtn.classList.remove('active-btn')
    }
    model.setTotalPrice()
})

arrow.addEventListener('click', () => {
    arrow.classList.toggle('arrow-hidden')
    if (arrow.classList.contains('arrow-hidden')) {
        arrow.style.transform = 'rotate(180deg)'
        basketItemsWrapper.style.display = 'none'
    } else {
        arrow.style.transform = 'rotate(0)'
        basketItemsWrapper.style.display = 'block'
    }
    model.setTotalPrice()
    model.setTotalProduct()
})
view.init()

