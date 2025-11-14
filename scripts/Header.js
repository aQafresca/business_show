class Header {
  selectors = {
    header: '[data-js-header]',
    headerOverlay: '[data-js-header-overlay]',
    burgerButton: '[data-js-burger-button]'
  }

  stateClasses = {
    isActive: 'is-active',
    isLock: 'is-lock'
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.header);
    this.overlayElement = this.rootElement.querySelector(this.selectors.headerOverlay);
    this.burgerElement = this.rootElement.querySelector(this.selectors.burgerButton);
    this.documentElement = document.documentElement;

    this.isOpen = false;

    this.bindEvents();
  }

  handleOpenMenu = () => {
    if (this.isOpen) return;
    this.isOpen = true;
    this.overlayElement.classList.add(this.stateClasses.isActive);
    this.burgerElement.classList.add((this.stateClasses.isActive));
    this.documentElement.classList.add(this.stateClasses.isLock);
  }

  handleCloseMenu = () => {
    if(!this.isOpen) return;
    this.isOpen = false
    this.overlayElement.classList.remove(this.stateClasses.isActive);
    this.burgerElement.classList.remove((this.stateClasses.isActive));
    this.documentElement.classList.remove(this.stateClasses.isLock);
  }

  handleToggleMenu = () => {
    this.isOpen ? this.handleCloseMenu() : this.handleOpenMenu();
  }

  handleResize = () => {
    const desktopWidth = 768;

    if (window.innerWidth >= desktopWidth && this.isOpen) {
      this.handleCloseMenu()
    }
  }

  bindEvents() {
    this.burgerElement.addEventListener('click', this.handleToggleMenu);

    this.overlayElement.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) this.handleCloseMenu();
    });

    window.addEventListener('resize', this.handleResize.bind(this))
  }

}

export default Header