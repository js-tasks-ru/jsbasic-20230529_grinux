import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

//Кажется, фильтрацию можно сделать как-то более элегантно.
//Посоветуйте.

export default class ProductGrid {
  constructor(products) {
    if (!products)
      return;
    this.products = products;
    this.filters = {};
    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>`);
    for (let product of products)
      this.elem.children[0].appendChild(new ProductCard(product).elem);
  }
  updateFilter(filters) {

    const hide = index => {
      this.elem.children[0].children[index].style.display = 'none';
      this.elem.children[0].children[index].classList.remove('card');
    }

    const show = index => {
      this.elem.children[0].children[index].style.display = '';
      this.elem.children[0].children[index].classList.add('card');
    }

    if (Object.keys(filters).length === 0)
      this.filters = {};
    for (let filter in filters) {
      this.filters[filter] = filters[filter]; //add new and renew old members
    }
    for (let product = 0; product < this.products.length; product++) {
      hide(product);
      for (let filter in this.filters) {
        if (this.filters[filter] === this.products[product][filter]) {
          show(product);
        }
        else if (filter === 'noNuts' && this.filters[filter] === true && this.products[product]['nuts'] != true)
          show(product);
        else if (filter === 'maxSpiciness' && +this.filters[filter] >= +this.products[product]['spiciness'])
          show(product);
        else if (filter === 'vegeterianOnly' && this.filters[filter] === true && this.products[product]['vegeterian'] === true)
          show(product);
        else {
          hide(product);
          break;
        }
      }
    }
  }
}
