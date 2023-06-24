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
    
    let slider_value = slider.querySelector('.slider__value');
    let slider_steps = slider.querySelector('.slider__steps');
    let slider_progress = slider.querySelector('.slider__progress');
    let slider_thumb = slider.querySelector('.slider__thumb');

    this._elem = slider;
    this.position = value;

    for (let i = 0; i < steps; i++)
      slider_steps.appendChild(createElement(`<span></span>`));
    slider_steps.children[this.position].classList.add('slider__step-active');
    slider_value.innerText = this.position;  
    let fill = 100 / (steps - 1) * this.position; 
    slider_progress.style.width = `${fill}%`;   
    slider_thumb.style.left = `${fill}%`;
 
    slider_thumb.ondragstart = () => false; 
    
    const s_fill = x => {
      let fill = (x - this._left_limit) / (this._right_limit - this._left_limit) * 100;
      slider_thumb.style.left = `${fill}%`;
      slider_progress.style.width = `${fill}%`;
    }

    const move_x = x => {
      let new_x = x - this._shiftX;
      if (slider_thumb.style.left != new_x) {
        new_x = new_x <= this._left_limit ? this._left_limit : new_x;
        new_x = new_x >= this._right_limit ? this._right_limit : new_x;
        s_fill(new_x);      
        //вычисляем новую дискретную позицию
        this._new_position = this.position;
        //console.log(`current position: ${this.position}`);
        for(;;)
        {
          if (this._new_position < steps - 1 && new_x > this._catch_x[this._new_position])
            this._new_position++;
          else if (this._new_position && new_x < this._catch_x[this._new_position - 1])
            this._new_position--;
          else
            break;
        }
        if (this._new_position != this.position)
        {
          slider_value.innerText = this._new_position;
          slider_steps.children[this.position].classList.remove('slider__step-active');
          slider_steps.children[this._new_position].classList.add('slider__step-active');
          //console.log(`new position: ${this._new_position}`);
        }
      }
    }

    const move_x_event = event => {
      event.preventDefault();
      move_x(event.pageX);
    }

    const move_x_prepare = event => {
      let slider_position = slider.getBoundingClientRect();
      let thumb_position = slider_thumb.getBoundingClientRect();
      this._left_limit = slider_position.left + window.pageXOffset;
      this._right_limit = this._left_limit + slider_position.width; 
      //минимизируем вычисления в  move_x
      this._delta_x = slider_position.width / (steps - 1);
      this._catch_x = [this._left_limit + this._delta_x / 2]; //первое значение пороговой кординаты Х
      for (let i = 1; i < steps; i++)
        this._catch_x[i] = this._catch_x[0] + i * this._delta_x; //массив значений пороговой координаты X
      if (event.target === slider_thumb && 
        //WA для ошибки в task.tes.js строка 168: прилетает pointerdown на thumb, 
        //c clientX = 0. Такого в реальности быть не может. 
        event.clientX >= thumb_position.left &&
        event.clientX <= thumb_position.left +  thumb_position.width &&
        event.clientY >= thumb_position.top &&
        event.clientY <= thumb_position.top +  thumb_position.height
        )
        this._shiftX = event.clientX - (thumb_position.left + thumb_position.width/2);
      else
        this._shiftX = 0;
    }

    const move_x_finalize = event => {
      let final_x = this._catch_x[this._new_position] - this._delta_x / 2;
      s_fill(final_x);
      if (event.type == 'pointerup')
        slider.classList.remove('slider_dragging');
      if (this.position != this._new_position) {
        slider.dispatchEvent(new CustomEvent('slider-change', {
          detail: this._new_position,
          bubbles: true
        }));
        this.position = this._new_position;
      }
    }
    
    slider_thumb.addEventListener('pointerdown', event => {
      //console.log(`pointerdown, taget: ${event.target.className}`);
      event.preventDefault();
      slider.classList.add('slider_dragging');
      move_x_prepare(event);
      document.addEventListener('pointermove', move_x_event);
      document.addEventListener('pointerup', event => {
        //console.log(`pointerup, taget: ${event.target.className}`);
        document.removeEventListener('pointermove', move_x_event);
        move_x_finalize(event);
    }, { once: true });
    });

    slider.addEventListener('click', event => {
      //console.log(`click, taget: ${event.target.className}`);
      move_x_prepare(event);
      move_x(event.pageX);
      move_x_finalize(event);
    });
  }
  get elem(){
    return this._elem;
  }
}