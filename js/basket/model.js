import {basketData, deliveryList, payMethodsList} from '../data.js';
import {view} from './view.js';

export const model = {
    state: basketData,
    totalPrice: 0,
    totalProduct: 0,
    noDiscountPrice: 0,
    isModalVisible: false,
    deliveryMethod: 'pick-up',
    infoState: {
        pay: {
            list: payMethodsList,
            activeItem: payMethodsList[0]
        },
        delivery: {
            list: deliveryList,
            activeItem: deliveryList[3]
        }
    },
    isValidationOn: false,
    inputFields: {
        name: {
            error: '',
            inputValue: '',
        },
        lastName: {
            error: '',
            inputValue: '',
        },
        email: {
            error: '',
            inputValue: '',
        },
        inn: {
            error: '',
            inputValue: '',
        },
        phone: {
            error: '',
            inputValue: '',
        }
    },

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
            this.state[index].count = this.state[index].count -= 1;
            view.render();
        }

    },
    checkedAllItemsToggle(target) {
        this.state = this.state.map(item => {
            item.checked = target.checked;
            return item;
        });
        view.render();
    },
    checkedItemToggle(index) {
        this.state[index].checked = !this.state[index].checked;
    },
    setTotalPrice() {
        this.totalPrice = this.state.reduce((acc, item) => {
            const totalPrice = Math.floor(item.count * item.price);
            const discountPrice = Math.floor(totalPrice - (item.price * item.sale / 100 * item.count));
            if (item.checked) {
                acc += discountPrice;
            }
            return acc;
        }, 0)
        view.renderPrice();
        view.renderPayBtn();
        view.renderHideInfo();
    },
    setTotalProduct() {
        this.totalProduct = this.state.reduce((acc, item) => {
            if (item.checked) {
                acc += item.count;
            }
            return acc;
        }, 0);
        view.renderPrice();
        view.renderHideInfo();
    },
    setNoDiscountPrice() {
        this.noDiscountPrice = this.state.reduce((acc, item) => {
            if (item.checked) {
                acc += Math.floor(item.price * item.count);
            }
            return acc;
        }, 0)
        view.renderPrice();
    },
    openModal(action) {
        this.isModalVisible = true;
        view.renderModal(action);
    },
    closeModal(action) {
        this.isModalVisible = false;
        this.infoState.pay.list.activeItem = payMethodsList[0];
        const pickUp = this.infoState.delivery.list.find(item => item.delivery === 'pick-up');
        const courier = this.infoState.delivery.list.find(item => item.delivery === 'courier');
        if (action === 'delivery') {
            this.infoState.delivery.list = this.infoState.delivery.list.map(item => {
                item.checked = item.id === pickUp.id || item.id === courier.id;
                return item;
            });
        }
        view.renderModal(action);
    },
    changeActiveItem(id, action) {
        this.infoState[action].list = this.infoState[action].list.map(item => {
            item.checked = id === item.id;
            return item;
        })
        view.renderModal(action);
    },
    FindActiveItem(id, action) {
        this.infoState[action].activeItem = this.infoState[action].list.find(item => item.id === id);
    },
    getActiveItem(action) {
        if (action === 'delivery') {
            view.renderActiveDeliveryItem(this.infoState[action].activeItem);
        } else {
            view.renderActivePayItem(this.infoState[action].activeItem);
        }
    },
    changeMethod(action, method) {
        this.deliveryMethod = method;
        if (this.deliveryMethod === 'pick-up') {
            this.infoState.delivery.activeItem = deliveryList[3];
        } else {
            this.infoState.delivery.activeItem = deliveryList[0];
        }
        view.renderModal(action);
    },
    enableValidation() {
        this.isValidationOn = true;
        this.validation();
        view.renderInputsErros();
    },
    setInputValue(field, value) {
        this.inputFields[field].inputValue = value;
        if (this.isValidationOn) {
            this.validation();
        }
    },
    validation() {
        const NameAndLastNamePattern = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/;
        const EmailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        const phonePattern = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        const innPattern = /^\d+$/;
        if (model.isValidationOn) {
            Object.entries(this.inputFields).forEach(([field, value]) => {
                switch (field) {
                    case 'name':
                        this.inputFields[field].error = NameAndLastNamePattern.test(value.inputValue) ? '' : 'Укажите имя';
                        return;
                    case 'lastName':
                        this.inputFields[field].error = NameAndLastNamePattern.test(value.inputValue) ? '' : 'Укажите фамилию';
                        return;
                    case 'email':
                        this.inputFields[field].error = EmailPattern.test(value.inputValue) ? '' : 'Укажите почту';
                        return;
                    case 'phone':
                        this.inputFields[field].error = phonePattern.test(value.inputValue) ? '' : 'Укажите номер телефона';
                        return;
                    case 'inn':
                        this.inputFields[field].error = innPattern.test(value.inputValue) && value.inputValue.length === 14 ? '' : 'Укажите ИНН';
                        return;
                }

            })
        }
        view.renderInputsErros();
    },
}