import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product)
      return;
    let item = this.cartItems.find(item => item.product.id === product.id);
    if (item)
      item.count++;
    else {
      item = {};
      item.product = product;
      item.count = 1;
      this.cartItems.push(item);
    }
    this.onProductUpdate(item);
  }

  updateProductCount(productId, amount) {
    if (!productId || !amount)
      return;  
    let item = this.cartItems.find(item => item.product.id == productId);
    if (item && amount === 1)
      item.count++;
    else if (item && amount === -1)  
    {
      item.count--;
      if (item.count === 0)
        this.cartItems.splice(this.cartItems.indexOf(item), 1);
    }
    else
      return; //item is undefined or amount is mailformed
    this.onProductUpdate(item);  
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((amount, item) => amount += item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total += item.count * item.product.price, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.modal_body = createElement(`<div></div>`);
    for (let item of this.cartItems)
      this.modal_body.appendChild(this.renderProduct(item.product, item.count));
    this.modal_body.appendChild(this.renderOrderForm());
    this.modal.setBody(this.modal_body);
    this.modal.open();
    this.modal_body.addEventListener('click', event => {
      let button = event.target.closest('button')
      if (button) {
        if (event.target.closest('.cart-form'))
          this.onSubmit(event);
        else {
          let productId = event.target.closest('.cart-product');
          if (productId) {
            productId = productId.getAttribute("data-product-id");
            if (productId) {
              if (button.classList.contains('cart-counter__button_minus'))
                this.updateProductCount(productId, -1);
              else if (button.classList.contains('cart-counter__button_plus'))
                this.updateProductCount(productId, 1);
              else
                console.log(`click: unknown button class for product ${this.cartItems[productId]}`);
            }
          }
        }
      }
    });
    this.modal_body.querySelector('.cart-form').addEventListener('submit', event => {
      this.onSubmit(event); //возможно можно короче
    });
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (document.body.classList.contains('is-modal-open')) {
      let product = this.modal_body.querySelector(`[data-product-id="${cartItem.product.id}"]`);
      let count = this.modal_body.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);
      let total = this.modal_body.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
      let grand_total = this.modal_body.querySelector(`.cart-buttons__info-price`);
      let new_grand_total = parseFloat(grand_total.innerText.substring(1)) + 
                            cartItem.count * cartItem.product.price - 
                            parseFloat(total.innerText.substring(1)); 
      if (new_grand_total <= 0)
        this.modal.close();
      else {
        if (!cartItem.count)
          product.remove();
        else
          count.innerText = cartItem.count;
        total.innerText = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
        grand_total.innerText = `€${new_grand_total.toFixed(2)}`;
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.modal_body.querySelector(`button[type="submit"]`).classList.add('is-loading');
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(this.modal_body.querySelector('.cart-form'))
    }).then(() => {
      this.modal.setTitle('Success!');
      this.cartItems.length = 0;
      this.modal_body = createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`);
      this.modal.setBody(this.modal_body);
    })
      .catch(error => {
        console.log(`POST response not ok: ${error}`);
      });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

