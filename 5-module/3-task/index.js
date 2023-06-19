//two event listeners
function initCarousel2() 
{
  let back_btn = document.querySelector(".carousel__arrow_left");
  let fwd_btn = document.querySelector(".carousel__arrow_right");
  let carousel = document.querySelector(".carousel__inner");

  carousel.position = 0;
  back_btn.style.display = 'none';

  back_btn.addEventListener('click', () => {
    let transform_val = carousel.offsetWidth * --carousel.position;
    carousel.style.transform = `translateX(-${transform_val}px)`;
    if (carousel.position == 0)
      back_btn.style.display = 'none';
    else if (carousel.position < 3)
      fwd_btn.style.display = '';
  });
  fwd_btn.addEventListener('click', () => {
    let transform_val = carousel.offsetWidth * ++carousel.position;
    carousel.style.transform = `translateX(-${transform_val}px)`;
    if (carousel.position == 3)
      fwd_btn.style.display = 'none';
    else if (carousel.position > 0)
      back_btn.style.display = '';
  });
}

//one event listener and any number of slides support
function initCarousel() 
{
  let back_btn = document.querySelector(".carousel__arrow_left");
  let fwd_btn = document.querySelector(".carousel__arrow_right");
  let carousel = document.querySelector(".carousel__inner");
  let slides_num = document.getElementsByClassName('carousel__slide').length;

  back_btn.style.display = 'none';
  carousel.position = 0;
  
  document.querySelector(".carousel").addEventListener('click', event => 
  {
    let btn = event.target.closest('div');

    if (btn.classList.contains("carousel__arrow_left")) 
    {//back button
      let transform_val = carousel.offsetWidth * --carousel.position;
      carousel.style.transform = `translateX(-${transform_val}px)`;
      if (carousel.position == 0)
        back_btn.style.display = 'none';
      else if (carousel.position < slides_num - 1)
        fwd_btn.style.display = '';
    }
    else if (btn.classList.contains("carousel__arrow_right")) 
    {//forward button
      let transform_val = carousel.offsetWidth * ++carousel.position;
      carousel.style.transform = `translateX(-${transform_val}px)`;
      if (carousel.position == slides_num - 1)
        fwd_btn.style.display = 'none';
      else if (carousel.position > 0)
        back_btn.style.display = '';
    }
  });
}