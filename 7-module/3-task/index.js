import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    if (steps < 2)
      return;
    let slider = createElement(`
      <div class="slider">
        <div class="slider__thumb" style="s_fill: 50%;">
          <span class="slider__value">2</span>
        </div>
        <div class="slider__progress" style="width: 50%;"></div>
        <div class="slider__steps"></div>
      </div>
    `);
    this._elem = slider;
    this._position = value;
    let slider_steps = slider.querySelector('.slider__steps');
    for (let i = 0; i < steps; i++)
      slider_steps.appendChild(createElement(`<span></span>`));
    slider_steps.children[this._position].classList.add('slider__step-active');
    slider.querySelector('.slider__value').innerText = this._position;  
    let s_fill = 100 / (steps - 1) * this._position;   
    slider.querySelector('.slider__thumb').style.left = `${s_fill}%`;
    slider.querySelector('.slider__progress').style.width = `${s_fill}%`; 

    slider.addEventListener('click', event => {
      let slider_position = slider.getBoundingClientRect();
      let delta_x = slider_position.width/(steps - 1);
      let catch_x = slider_position.x + delta_x/2; 
      //catch_x - граница принадлежности к дискретной позиции
      //delta_x - шаг увеличения catch_x для проверки принадлежности
      //к следующей дискретной позиции
      let new_position = steps - 1;
      for (let i = 0; i < steps - 1; i++)
      { 
        if (event.pageX < catch_x + i * delta_x)
        {
          new_position = i;
          break;
        }
      }
      slider.querySelector('.slider__value').innerText = new_position;
      slider.querySelector('.slider__steps')
            .children[this._position]
            .classList.remove('slider__step-active');  
      slider.querySelector('.slider__steps')
            .children[new_position]
            .classList.add('slider__step-active');
      s_fill = 100 / (steps - 1) * new_position;      
      slider.querySelector('.slider__thumb').style.left = `${s_fill}%`;
      slider.querySelector('.slider__progress').style.width = `${s_fill}%`;      
      this._position = new_position;

      slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: this._position,
        bubbles: true
      }));
    });
  }
  get elem(){
    return this._elem;
  }
}
