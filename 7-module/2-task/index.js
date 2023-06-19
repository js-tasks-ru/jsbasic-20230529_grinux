import createElement from '../../assets/lib/create-element.js';

// как сделать так, чтобы тело обработчика редактировалось в одном месте?
// этот ↓ прием не работает, т.к. this в рантайме не определено
//
// const esc_event_handler = event => {
//   if (event.code === 'Escape')
//    this.close();
// }

export default class Modal {
  constructor() {
    this._modal = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
          </h3>
        </div>
        <div class="modal__body">
        </div>
      </div>
    </div>`);
  }
  open(){
    document.body.classList.add('is-modal-open');
    let modal = document.body.appendChild(this._modal);
    
    let btn = modal.querySelector('.modal__close');
    btn.addEventListener('click', () => {
      this.close();
    });

    document.addEventListener('keydown', event => {
      if (event.code === 'Escape')
        this.close();
    });
  }
  setTitle(title) {
    if (title)
     this._modal.querySelector('.modal__title').innerText = title;
  }
  setBody(node) {
    if (node)
    {
      this._modal.querySelector('.modal__body').innerHTML = '';
      this._modal.querySelector('.modal__body').appendChild(node);
    }
  }
  close() {
    this._modal.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', event => {
      if (event.code === 'Escape')
        this.close()
    });
  }
}
