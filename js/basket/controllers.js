import {model} from "./model.js";
import {view} from "./view.js";

view.init()
const selectAllCheckbox = document.getElementById('select-all');
const selectItemsCheckbox = document.querySelectorAll('[data-index]');

    selectAllCheckbox.addEventListener('change', () => {
    let selected = false;
    if (selectAllCheckbox.checked) {
        selected = true
    }
    model.state = model.state.map(item => {
        item.checked = selected
        return item
    })
    view.render()
})

selectItemsCheckbox.forEach(checkbox => {
    checkbox.addEventListener('change',() => {
        const index = checkbox.dataset.index;
        model.state[index].checked = !model.state[index].checked;
    })
})

