import Vue from 'vue';

Vue.directive('resize', {
  inserted(el, binding) {
    const {
      value: cb,
      arg,
      modifiers
    } = binding;

    // 设置‘宽度’or‘高度’
    const result = () => {
      return arg === 'vertical' ? window.innerHeight : window.innerWidth;
    }

    window.addEventListener('resize', () => cb(result()));

    // 静默执行
    modifiers && modifiers.quiet && cb(result())

    el._onResize = cb;
  },
  unbind(el) {
    if (!el._onResize) return;
    window.removeEventListener('resize', el._onResize);
    delete el._onResize;
  }
});