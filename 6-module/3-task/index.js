import createElement from '../../assets/lib/create-element.js';

class ProductCard {
  constructor(slide) 
  {
    if (!slide)
      return;

    this._id = slide['id'];
    let product = (createElement(`
      <div class="carousel__slide">
       <img src="/assets/images/carousel/" class="carousel__img" alt="slide">
       <div class="carousel__caption">
        <span class="carousel__price"></span>
        <div class="carousel__title"></div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
       </div>
      </div>`));
    this._elem = product;

    product.setAttribute('data-id', `${slide['name']}`);
    product.querySelector('.carousel__img').src += slide['image'];
    product.querySelector('.carousel__price').innerText = '€' + slide['price'].toFixed(2);
    product.querySelector('.carousel__title').innerText = slide['name'];
  }
  get elem() {
    return this._elem;
  }
  get id(){
    return this._id;
  }
}

export default class Carousel {
  constructor(slides) 
  {
    if (!slides.length)
      return;
    
    let carousel = createElement(`<div class="carousel"></div>`);
    this._elem = carousel;
    this._slides = slides;
    this._position = 0;

    carousel.appendChild(createElement(`
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>`));
    carousel.appendChild(createElement(`
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>`)); 
    let back_btn = carousel.querySelector(".carousel__arrow_left");
    let fwd_btn = carousel.querySelector(".carousel__arrow_right");
    back_btn.style.display = 'none';
    let carousel_inner = carousel.appendChild(createElement(`
    <div class="carousel__inner"></div>`));
    
    for (let slide of slides) 
      carousel_inner.appendChild(new ProductCard(slide).elem);

    carousel.addEventListener('click', event => {
      let btn = event.target.closest('div');
      if (btn.classList.contains("carousel__arrow_left")) {//back button
        let transform_val = carousel_inner.offsetWidth * --this._position;
        carousel_inner.style.transform = `translateX(-${transform_val}px)`;
        if (this._position == 0)
          back_btn.style.display = 'none';
        else if (this._position < this._slides.length - 1)
          fwd_btn.style.display = '';
        //console.log(this._position, this._slides[this._position].id);  
      }
      else if (btn.classList.contains("carousel__arrow_right")) {//forward button
        let transform_val = carousel_inner.offsetWidth * ++this._position;
        carousel_inner.style.transform = `translateX(-${transform_val}px)`;
        if (this._position == this._slides.length - 1)
          fwd_btn.style.display = 'none';
        else if (this._position > 0)
          back_btn.style.display = '';
        //console.log(this._position, this._slides[this._position].id);  
      }
      else if (event.target.closest('.carousel__button')) 
      {
        //console.log('product-add: ', this._slides[this._position].id);
        carousel.dispatchEvent(new CustomEvent('product-add', {
          detail: this._slides[this._position].id,
          bubbles: true
        }));
      }
    });
  }
  get elem(){
    return this._elem;
  }
}
