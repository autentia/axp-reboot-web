(() => {

  function handleActiveSection() {
    const controller = new ScrollMagic.Controller()

    const sections = [
      'hero',
      'info',
      'call-for-papers',
      'venue',
      'organizers'
    ]

    sections.forEach(section => {
      console.log(section, document.querySelector(`.${section}`).clientHeight)
      new ScrollMagic.Scene({ triggerElement: `.${section}` , duration: document.querySelector(`.${section}`).clientHeight})
        .setClassToggle(`.header__link[data-link="${section}"]`, 'header__link--active')
        .addIndicators()
        .addTo(controller)
    })
  }

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
    }, 100))
  }

  function addLinksListeners() {
    const links = document.querySelectorAll('[data-link]')

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()

        if (link.classList.contains('header__link')) {
          applyActiveLinkStyles(link)
        }

        if (areWeOnMobile()) {
          toggleMenu()
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

  function addHeaderListener() {
    const hamburger = document.querySelector('#menu-btn')
    const header = document.querySelector('.header')

    hamburger.addEventListener('click', () => {
      header.classList.toggle('header--clicked')
      toggleMenu()
    })
  }

  function toggleMenu() {
    const menuButton = document.querySelector('#menu-btn')
    menuButton.click()
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

  function areWeOnMobile() {
    return window.matchMedia("(min-width: 600px)")

  }

  addListenerToScroll()
  addLinksListeners()
  addHeaderListener()
  handleActiveSection()

})()
