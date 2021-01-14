function Slider(slider) {
  if(!(slider instanceof Element)) {
    throw new Error('No slider found')
  }

  // vars 
  let prev
  let current
  let next
  // select elements needed
  const slides = slider.querySelector('.slides')
  const prevButton = slider.querySelector('.goToPrev')
  const nextButton = slider.querySelector('.goToNext')

  function startSlider(){
    current = slider.querySelector('.current') || slides.firstElementChild
    prev = current.previousElementSibling || slides.lastElementChild
    next = current.nextElementSibling || slides.firstElementChild
    //console.log({current, prev, next})
  }

  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }
  function move(direction) {
    // first strip all the classes off the current slide
    const classesToRemove = ['prev', 'current', 'next']
    //['prev', 'current', 'next'].array.forEach(el => el.classList.remove(...classesToRemove)
    prev.classList.remove(...classesToRemove)
    current.classList.remove(...classesToRemove)
    next.classList.remove(...classesToRemove)
    if (direction ==='back') {
      // make a new array of the new values, and destructure them over and into the prev, curr and next vars
      [prev, current, next] = [
       // Get the prev slide, if there is none, get the last slide from the entire slider for wrapping 
        prev.previousElementSibling || slides.lastElementChild,
        prev, 
        current]
    } else {
      [prev, current, next] = [
        current,
        next, 
        // get the next slide, or of it's the end, loop around and grab the first slide
        next.nextElementSibling || slides.firstElementChild
      ] 
    }
    applyClasses()
  }

  // When this slider is created, run the start slider function
  startSlider()
  applyClasses()
  // Event listeners
  prevButton.addEventListener('click', () => move('back'));
  nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'))
const dogSlider = Slider(document.querySelector('.dog-slider'))