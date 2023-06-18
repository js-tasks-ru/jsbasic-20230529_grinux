import createElement from '../../assets/lib/create-element.js';

class RibbonItem {
  constructor(item) {
    if (!item)
      return;  
    this._id = item['id'];
    this._elem = createElement(`
      <a href="#" class="ribbon__item" data-id="${item['id']}">${item['name']}</a>`);
  }
  get elem() {
    return this._elem;
  }
}

export default class RibbonMenu {
  constructor(categories) {
    if (!categories.length)
      return;
    this._categories = categories;
    let ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
        </nav>
      </div>`);
    this._elem = ribbon;  
    let ribbon_inner = ribbon.querySelector('.ribbon__inner');

    for(let category of categories)
      ribbon_inner.appendChild(new RibbonItem(category).elem);
    this._active_item = ribbon_inner.querySelector('a[data-id=""]');
    this._active_item.classList.add("ribbon__item_active");//All active by default
                                    
    ribbon.appendChild(createElement(`
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`));

      let back_btn = ribbon.querySelector(".ribbon__arrow_left");
      let fwd_btn = ribbon.querySelector(".ribbon__arrow_right");
      back_btn.classList.remove('ribbon__arrow_visible');
      fwd_btn.classList.add('ribbon__arrow_visible');

      ribbon.addEventListener('click', event => {
        let click_src = event.target.closest('button');
        if (click_src)
        {
          if (click_src.classList.contains("ribbon__arrow_left"))
            ribbon_inner.scrollBy(-350, 0); //back button)
          else if (click_src.classList.contains("ribbon__arrow_right"))
            ribbon_inner.scrollBy(350, 0); //forward button)
        }
        else
        {
          click_src = event.target.closest('a');
          if (click_src) 
          {
            let id = click_src.getAttribute('data-id');
            if (id) 
            { 
              event.preventDefault();
              console.log('Click source: ', id); 
              this._active_item.classList.remove('ribbon__item_active');
              click_src.classList.add('ribbon__item_active');
              this._active_item = click_src;
              ribbon.dispatchEvent(new CustomEvent('ribbon-select', {
                detail: id,
                bubbles: true
              }));
            }
          }
        }
      });

      ribbon_inner.addEventListener('scroll', event => {
        if (!ribbon_inner.scrollLeft)
          back_btn.classList.remove('ribbon__arrow_visible');
        else if (ribbon_inner.scrollWidth - ribbon_inner.scrollLeft - ribbon_inner.clientWidth < 1)
          fwd_btn.classList.remove('ribbon__arrow_visible');
        else
        {
          back_btn.classList.add('ribbon__arrow_visible');
          fwd_btn.classList.add('ribbon__arrow_visible');
        }
      });
  }
  get elem() {
    return this._elem;
  }
}
