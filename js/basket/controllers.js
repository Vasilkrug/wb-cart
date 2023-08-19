import {model} from "./model.js";
import {view} from "./view.js";

view.init()
const selectAllCheckbox = document.getElementById('select-all');
const selectItemsCheckbox = document.querySelectorAll('[data-index]');
const plusBtns = document.querySelectorAll('[data-direction="plus"]')
const minusBtns = document.querySelectorAll('[data-direction="minus"]')


selectAllCheckbox.addEventListener('change', () => {
    model.checkedAllItemsToggle(selectAllCheckbox)
})

selectItemsCheckbox.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        model.checkedItemToggle(checkbox.dataset.index)
    })
})


plusBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        model.increment(btn.dataset.counterId)
    })
})

minusBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        model.decrement(btn.dataset.counterId)
    })
})
