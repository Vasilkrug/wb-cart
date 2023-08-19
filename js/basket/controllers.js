import {model} from "./model.js";
import {view} from "./view.js";

export const setupControllers = () =>{
    const selectAllCheckbox = document.getElementById('select-all');
    const selectItemsCheckbox = document.querySelectorAll('[data-index]');
    const plusBtns = document.querySelectorAll('[data-direction="plus"]')
    const minusBtns = document.querySelectorAll('[data-direction="minus"]')


    selectAllCheckbox.addEventListener('change', () => {
        model.checkedAllItemsToggle(selectAllCheckbox)
        model.getTotalPrice()
        model.getTotalProduct()
        model.getNoDiscountPrice()
    })

    selectItemsCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            model.checkedItemToggle(checkbox.dataset.index)
            model.getTotalPrice()
            model.getTotalProduct()
            model.getNoDiscountPrice()
        })
    })


    plusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            model.increment(btn.dataset.counterId)
            model.getTotalPrice()
            model.getTotalProduct()
            model.getNoDiscountPrice()
        })
    })

    minusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            model.decrement(btn.dataset.counterId)
            model.getTotalPrice()
            model.getTotalProduct()
            model.getNoDiscountPrice()
        })
    })

    window.addEventListener('load',() => {
        model.getTotalPrice()
        model.getTotalProduct()
        model.getNoDiscountPrice()
    })
}
view.init()

