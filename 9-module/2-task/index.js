import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    document.querySelector('[data-carousel-holder]').appendChild(new Carousel(slides).elem);
    let ribbon = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').appendChild(ribbon.elem);
    let step_slider = new StepSlider({steps: 5, value: 3});
    document.querySelector('[data-slider-holder]').appendChild(step_slider.elem);
    let cart_icon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').appendChild(cart_icon.elem);
    let cart = new Cart(cart_icon);
    
    let response = await fetch('/9-module/2-task/products.json', {method: 'GET'});
    let products = await response.json();

    let products_grid = document.querySelector('[data-products-grid-holder]');
    products_grid.innerHTML = '';
    products_grid = new ProductsGrid(products);
    document.querySelector('[data-products-grid-holder]').appendChild(products_grid.elem);

    products_grid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: step_slider.position,
      category: ribbon.id
    });

    document.body.addEventListener('product-add', event => {
      let product = products.find(({id}) => id === event.detail);
      cart.addProduct(product);
      //console.log(`${product.id} added to chart`);
    });

    step_slider.elem.addEventListener('slider-change', event => {
      products_grid.updateFilter({
        maxSpiciness: event.detail
      });
      //console.log(`New spiciness: ${event.detail}`);
    });

    ribbon.elem.addEventListener('ribbon-select', event => {
      //console.log(`Category ${event.detail} selected`);
      products_grid.updateFilter({
        category: event.detail
      });
    });

    document.body.addEventListener('change', event => {
      if (event.target.closest('#nuts-checkbox')) {
        //console.log('Nuts checkbox');
        products_grid.updateFilter({
          noNuts: event.target.checked
        });
      }
      else if (event.target.closest('#vegeterian-checkbox')) {
        //console.log('Vegs checkbox');
        products_grid.updateFilter({
          vegeterianOnly: event.target.checked
        });
      }
    });
  }
}
