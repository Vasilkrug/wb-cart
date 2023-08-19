import {model} from "./model.js";
import {setupControllers} from "./controllers.js";

export const view = {
    render() {
        const basketItemsList = document.querySelector('.basket-items-list');
        const html = model.state.map((item, index) => {
            return `<li class="basket-item">
                            <div class="basket-item-info-wrapper">
                                <label class="checkbox-label" for=${'item-' + item.id}>
                                    <input class="checkbox-input" id=${'item-' + item.id} type="checkbox" ${item.checked ? 'checked' : ''} data-index=${index}>
                                    <span class="checkbox"></span>
                                    <img src=${item.img} alt="t-shirt">
                                </label>
                                <div class="basket-item-text">
                                    <p>${item.name}</p>
                                    <div class=${item.characters.length ? "basket-item-characters" : "basket-item-characters-hide"}>
                                    ${item.characters.map(character => {
                return `<span>${character}</span>`
            }).join('')}
                                    </div>
                                    <div class="basket-item-location">
                                        <div class="address">${item.location}</div>
                                        <div class="company">
                                            ${item.company}
                                            <span class="tooltip"><img src="../../assets/icons/info.png" alt="info"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="basket-item-controls-wrapper">
                                <div class="basket-item-controls">
                                    <div class="counter">
                                        <button class="counter-button" data-counter-id=${index} data-direction="minus">−</button>
                                        <div class="counter-value">${item.count}</div>
                                        <button class="counter-button" data-counter-id=${index} data-direction="plus">+</button>
                                    </div>
                                    <div class="max-products">Осталось 2 шт.</div>
                                    <div class="controls">
                                        <img src="../../assets/icons/like.svg" alt="like">
                                        <img src="../../assets/icons/delete.svg" alt="delete">
                                    </div>
                                </div>
                                <div class="basket-item-price">
                                    <div class="item-price">522 сом</div>
                                    <div class="item-discount">1051 сом</div>
                                </div>
                            </div>
                        </li>`
        }).join('');
        basketItemsList.innerHTML = html;
        setupControllers()
    },
    init() {
        this.render()
    },
}