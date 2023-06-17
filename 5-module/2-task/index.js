function toggleText() {
  document.querySelector(".toggle-text-button")
    .addEventListener('click', () => {
      let text = document.querySelector('#text');
      text.hidden = !text.hidden;
    });
  }
