(() => {

  function addListenerToScroll() {
    const header = document.querySelector('.header')
    window.addEventListener('scroll', debounce(() => {
      const scrollPosY = window.pageYOffset | document.body.scrollTop;
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2;

      if(scrollPosY > vh) {
        header.classList.add('header--scrolled')
      } else {
        header.classList.remove('header--scrolled')
      }
    }, 250))
  }

  function addLinksListeners() {
    const links = document.querySelectorAll('[data-link]')

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()

        if (link.classList.contains('header__link')) {
          applyActiveLinkStyles(link)
        }

        navigateTo(link.dataset.link)
      }, false)
    })
  }

  function applyActiveLinkStyles(element) {
    const links = document.querySelectorAll('.header__link')
    links.forEach(link => {
      link.classList.remove('header__link--active')
    })

    element.classList.toggle('header__link--active')
  }

  function navigateTo(destination) {
    const element = document.getElementById(destination)
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function debounce(fn, wait, immediate) {
    let timeout;
    return () => {
      var context = this, args = arguments;
      var later = () => {
        timeout = null;
        if (!immediate) fn.apply(context, args);
      }

      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) fn.apply(context, args);
    }
  }

  addListenerToScroll()
  addLinksListeners()

})()
