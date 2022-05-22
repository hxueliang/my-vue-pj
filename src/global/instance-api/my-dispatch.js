export function dispatch(componentName, eventName, params) {
  let parent = this.$parent || this.$root;
  let name = parent.$options.componentName;


  while (parent && (!name || name !== componentName)) {

    parent = parent.$parent;

    if (parent) {
      name = parent.$options.name;
    }
  }
  console.log(parent, '===parent');

  // if (parent) { parent.$emit.apply(parent, [eventName].concat(params)); }
  if (parent) {
    parent.$emit.apply(parent, [eventName].concat(params));
  }
}
// 出处：element/src/mixins/emitter.js
