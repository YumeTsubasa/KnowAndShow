/**
 * @typedef CarouselProps
 * @property {HTMLElement} root
 * @property {HTMLElement} [navigationControls]
 */

export default class Carousel {
  /** @type {HTMLElement} */
  #root;
  /** @type {HTMLElement} */
  #scrollContainer;
  /** @type {HTMLElement[]} */
  #scrollSnapTargets;
  /** @type {HTMLElement} */
  #navControlPrevious;
  /** @type {HTMLElement} */
  #navControlNext;

  /**
   * @type {CarouselProps} props
   */
  constructor(props) {
    this.#root = props.root;
    this.#scrollContainer = this.#root.querySelector('[role="region"][tabindex="0"]');
    this.#scrollSnapTargets = Array.from(this.#scrollContainer.querySelectorAll('[role="list"] > *'));
    this.#insertNavigationControls(props.navigationControls);
  }

  /**
   * @param {HTMLElement} controls
   */
  #insertNavigationControls(controls) {
    if (!controls) return;

    const [previous, next] = controls.querySelectorAll('button[data-direction]');
    this.#navControlPrevious = previous;
    this.#navControlNext = next;

    const handleNavigation = (e) => {
      const button = e.target;
      const direction = button.dataset.direction;
      this.navigateToNextItem(direction);
    };

    this.#navControlPrevious.addEventListener('click', handleNavigation);
    this.#navControlNext.addEventListener('click', handleNavigation);
    this.#root.appendChild(controls);
  }

  /**
   * @param {'start'|'end'} direction
   */
  navigateToNextItem(direction) {
    // we'll fill this in later
  }
}