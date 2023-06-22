import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
    this.scroll_mode = false;
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    let window_width = parseInt(document.documentElement.clientWidth, 10);
    if (this.elem.classList.contains('cart-icon_visible') && window_width > 767)
    {
      if (document.documentElement.scrollTop || document.body.scrollTop >= 50)
      {
        let cart_position = this.elem.getBoundingClientRect();
        let cart_new_left = document.querySelector('.container').getBoundingClientRect().right + 20;
        if (window_width - (cart_new_left + cart_position.width) < 10)
          cart_new_left = window_width - cart_position.width - 10;
        this.elem.style.position = 'fixed';
        this.elem.style.zIndex = 1000;
        this.elem.style.left = cart_new_left + 'px';
        this.scroll_mode = true;
        //console.log(`scroll mode applied`);
      }
      else if (this.elem.style.position === 'fixed' && this.scroll_mode == true)
      {
        this.elem.style.position = 'absolute';
        this.elem.style.left = '';
        this.elem.style.zIndex = '';
        this.scroll_mode = false;
        //console.log(`scroll mode disabled`);
      }
    }
  }
}
