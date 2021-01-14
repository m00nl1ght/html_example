(function() {
    /* touch detection */
    window.addEventListener('touchstart', function touched() {
      document.body.classList.add('touch')
      window.removeEventListener('touchstart', touched, false)
    }, false)
  
    /* lazy loading and button controls */
    const gallery = document.querySelector('[aria-label="gallery"]')
    const slides = gallery.querySelectorAll('li')
    const instructions = document.getElementById('instructions')
  
    const observerSettings = {
      root: gallery,
      rootMargin: '-10px'
    }
  
    if ('IntersectionObserver' in window) {
      const callback = (slides, observer) => {
        Array.prototype.forEach.call(slides, function(entry) {
          entry.target.classList.remove('visible')
          if (!entry.intersectionRatio > 0) {
            return
          }
          let img = entry.target.querySelector('img')
          if (img.dataset.src)  {
            img.setAttribute('src', img.dataset.src)
            img.removeAttribute('data-src')
          }
          entry.target.classList.add('visible')
        })
      }
  
      const observer = new IntersectionObserver(callback, observerSettings)
      Array.prototype.forEach.call(slides, t => observer.observe(t))
  
      const controls = document.createElement('ul')
      controls.setAttribute('aria-label', 'gallery controls')
      controls.innerHTML = `
      <li>
        <button id="previous" aria-label="previous">
          <svg aria-hidden="true" focusable="false"><use xlink:href="#arrow-left"></use></svg>
        </button>
      </li>
      <li>
        <button id="next" aria-label="next">
          <svg aria-hidden="true" focusable="false"><use xlink:href="#arrow-right"/></svg>
        </button> 
      </li>
      `
  
      instructions.parentNode.insertBefore(controls, instructions.nextElementSibling)
      instructions.parentNode.style.padding = '0 3rem'
  
      function scrollIt (slideToShow) {
        let scrollPos = Array.prototype.indexOf.call(slides, slideToShow) * (gallery.scrollWidth / slides.length)
        gallery.scrollLeft = scrollPos
      }
  
      function showSlide (dir, slides) {
        let visible = document.querySelectorAll('[aria-label="gallery"] .visible')
        let i = dir === 'previous' ? 0 : 1
  
        if (visible.length > 1) {
          scrollIt(visible[i])
        } else {
          let newSlide = i === 0 ? visible[0].previousElementSibling : visible[0].nextElementSibling
          if (newSlide) {
            scrollIt(newSlide)
          }
        }
      }
  
      controls.addEventListener('click', function (e) {
        showSlide(e.target.closest('button').id, slides)
      })
      
    } else {
      Array.prototype.forEach.call(slides, function (s) {
        let img = s.querySelector('img')
        img.setAttribute('src', img.getAttribute('data-src'))
      })
    }
  })()