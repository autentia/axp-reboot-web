(() => {
  const header = document.querySelector('.header')

  function addListenerToScroll() {
    window.onscroll = () => {
      const scrollPosY = window.pageYOffset | document.body.scrollTop;
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

      if(scrollPosY > vh) {
        header.classList.add('header--scrolled')
      } else {
        header.classList.remove('header--scrolled')
      }
    }
  }

  function addLinksListeners() {
    const links = [
      'home',
      'organizers',
      'call-for-papers',
      'code-of-conduct',
      'info',
      'venue'
    ]

    const targets = links.map(link => document.querySelector(`[data-link="${link}"]`))

    targets.forEach(target => {
      target.addEventListener('click', (e) => {
        e.preventDefault()
        applyActiveLinkStyles(target)
        navigateTo(target.dataset.link)
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

  addListenerToScroll()
  addLinksListeners()

})()
