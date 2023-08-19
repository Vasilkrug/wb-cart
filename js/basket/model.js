import {basketData} from "../data.js";
import {view} from "./view.js";

export const model = {
    state: basketData,
    increment(index) {
        const count = this.state[index].count;
        const remains = this.state[index].remains;
        if (count <= remains) {
            this.state[index].count = this.state[index].count += 1
            view.render()
        }
    },
    decrement(index) {
        const count = this.state[index].count;
        if (count >= 2) {
            this.state[index].count = this.state[index].count -= 1
        }
        view.render()
    },
    checkedAllItemsToggle(target) {
        this.state = this.state.map(item => {
            item.checked = target.checked
            return item
        })
        view.render()
    },
    checkedItemToggle(index) {
        this.state[index].checked = !this.state[index].checked;

    }
}