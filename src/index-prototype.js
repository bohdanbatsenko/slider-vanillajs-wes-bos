function Slider(slider) {
  if(!(slider instanceof Element)) {
    throw new Error('No slider found')
  }

  // vars - no need in prototype version
  // this.prev
  // this.current
  // this.next


  // select elements needed
  this.slides = slider.querySelector('.slides')
  this.slider = slider 
  const prevButton = slider.querySelector('.goToPrev')
  const nextButton = slider.querySelector('.goToNext')



  // When this slider is created, run the start slider function
  this.startSlider()
  this.applyClasses()

  // Event listeners
  prevButton.addEventListener('click', () => this.move('back'));
  nextButton.addEventListener('click', ()  => this.move());
}

Slider.prototype.startSlider = function(){
  this.current = this.slider.querySelector('.current') || this.slides.firstElementChild
  this.prev = this.current.previousElementSibling || this.slides.lastElementChild
  this.next = this.current.nextElementSibling || this.slides.firstElementChild
  //console.log({current, prev, next})
}

Slider.prototype.applyClasses = function() {
  this.current.classList.add('current');
  this.prev.classList.add('prev');
  this.next.classList.add('next');
}
Slider.prototype.move = function(direction) {
  console.log(this)
  // first strip all the classes off the current slide
  const classesToRemove = ['prev', 'current', 'next']
  //['prev', 'current', 'next'].array.forEach(el => el.classList.remove(...classesToRemove)
  this.prev.classList.remove(...classesToRemove)
  this.current.classList.remove(...classesToRemove)
  this.next.classList.remove(...classesToRemove)
  if (direction ==='back') {
    // make a new array of the new values, and destructure them over and into the prev, curr and next vars
    [this.prev, this.current, this.next] = [
     // Get the prev slide, if there is none, get the last slide from the entire slider for wrapping 
      this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev, 
      this.current]
  } else {
    [this.prev, this.current, this.next] = [
      this.current,
      this.next, 
      // get the next slide, or of it's the end, loop around and grab the first slide
      this.next.nextElementSibling || this.slides.firstElementChild
    ] 
  }
  this.applyClasses()
}

const mySlider = new Slider(document.querySelector('.slider'))
const dogSlider = new Slider(document.querySelector('.dog-slider'))
