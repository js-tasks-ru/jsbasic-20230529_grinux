import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) 
  {
    if (!product)
      return; 
    let item = createElement(`
    <div class="card">
        <div class="card__top">
            <img src="/assets/images/products/" class="card__image" alt="product">
            <span class="card__price"></span>
        </div>
        <div class="card__body">
            <div class="card__title"></div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
    </div>  
    `);
    this._elem = item;
    this._id = product['id'];
    item.addEventListener('click', event => {
      if (event.target.closest('.card__button'))
      {
        item.dispatchEvent(new CustomEvent('product-add', {
          detail: this._id,
          bubbles: true
        }));
      }
    });
    item.querySelector('.card__image').src += product['image'];
    item.querySelector('.card__price').innerText = '€' + product['price'].toFixed(2);
    item.querySelector('.card__title').innerText = product['name'];
  }
  get elem() {
    return this._elem;
  }
}