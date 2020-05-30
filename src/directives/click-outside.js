export default {
  bind(el, binding) {
    el.__ClickOutsideHandler__ = event => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el.__ClickOutsideHandler__);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.__ClickOutsideHandler__);
  }
};
