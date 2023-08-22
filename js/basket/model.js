import {basketData, payMethodslist} from "../data.js";
import {view} from "./view.js";

export const model = {
    state: basketData,
    payList:payMethodslist,
    totalPrice:0,
    totalProduct:0,
    noDiscountPrice:0,

    increment(index) {
        const count = this.state[index].count;
        const remains = this.state[index].remains;
        if (count < remains) {
            this.state[index].count = this.state[index].count += 1
            view.render()
        }
    },
    decrement(index) {
        const count = this.state[index].count;
        if (count >= 2) {
            this.state[index].count = this.state[index].count -= 1
            view.render()
        }

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
    },
    setTotalPrice(){
        this.totalPrice = this.state.reduce((acc,item) => {
            const totalPrice = Math.floor(item.count * item.price);
            const discountPrice = Math.floor(totalPrice - (item.price * item.sale / 100 * item.count));
            if (item.checked){
                acc += discountPrice
            }
            return acc
        },0)
        view.renderPrice()
        view.renderPayBtn()
        view.renderHideInfo()
    },
    setTotalProduct(){
        this.totalProduct = this.state.reduce((acc,item) => {
            if (item.checked){
                acc += item.count
            }
            return acc
        },0);
        view.renderPrice()
        view.renderHideInfo()
    },
    setNoDiscountPrice(){
        this.noDiscountPrice = this.state.reduce((acc,item) => {
            if (item.checked){
                acc += Math.floor(item.price * item.count)
            }
            return acc
        },0)
        view.renderPrice()
    },
    getPayList(){
      view.renderAddressModal(this.payList)
    },
}