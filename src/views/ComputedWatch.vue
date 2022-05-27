<template>
  <div>
    <button id="add">add</button>
    <div id="text"></div>
  </div>
</template>

<script>
export default {
  name: 'ComputedWatch',
  methods: {
    init() {

      let active;

      let effect = (fn, options = {}) => {
        let effect = (...args) => {
          try {
            active = effect;
            return fn(...args);
          } finally {
            active = null
          }
        }
        effect.options = options;
        effect.deps = [];
        return effect;
      }

      let cleanUpEffect = effect => {
        const { deps } = effect;
        if (deps.length) {
          for (let i = 0; i < deps.length; i++) {
            deps[i].delete(effect);
          }
        }
      }

      let watchEffect = cb => {
        let runer = effect(cb);
        runer();

        return () => {
          cleanUpEffect(runer);
        }
      };

      let queue = [];
      let nextTick = cb => Promise.resolve().then(cb);
      let queueJob = job => {
        if (!queue.includes(job)) {
          queue.push(job);
          nextTick(flushJobs);
        }
      }
      let flushJobs = () => {
        let job;
        while ((job = queue.shift())) {
          job();
        }
      }

      // 依赖收集
      class Dep {
        deps = new Set();
        depend() {
          if (active) {
            this.deps.add(active);
            active.deps.push(this.deps);
          }
        }
        notify() {
          this.deps.forEach(dep => {
            queueJob(dep);
            dep.options && dep.options.schedular && dep.options.schedular();
          })
        }
      }
      let ref = initValue => {
        let value = initValue;
        let dep = new Dep();
        return Object.defineProperty({}, 'value', {
          get() {
            dep.depend();
            return value;
          },
          set(newValue) {
            value = newValue;
            dep.notify()
          }
        })
      }

      // computed
      let computed = fn => {
        let value;
        let dirty = true;

        let runer = effect(fn, {
          schedular: () => {
            if(!dirty) {
              dirty = true;
            }
          }
        });

        return {
          get value() {
            if (dirty) {
              value = runer();
              dirty = false;
            }
            return value;
          }
        }
      }

      let watch = (source, cb, options = {}) => {
        const { immediate } = options;
        let getter = () => {
          return source();
        }
        let oldValue;
        const runner = effect(getter, {
          schedular: () => applyCb()
        })

        const applyCb = () => {
          let newValue = runner();
          if (newValue !== oldValue) {
            cb(newValue, oldValue);
            oldValue = newValue;
          }
        }

        if (immediate) {
          applyCb();
        } else {
          oldValue = runner();
        }
      }

      let count = ref(0);
      let computedValue = computed(() => count.value + 3);

      document.getElementById('add').addEventListener('click', function() {
        count.value++;
      })
      let str = '';
      let stop = watchEffect(() => {
        str = `hello ${count.value} ${computedValue.value}`;
        console.log(str); // 输出1次，说明页面只浸染了1次
        document.getElementById('text').innerText = str;
      });
      // 模拟清除watchEffect，3秒内点击按钮都可触发视力更新，3秒内就不更新了
      setTimeout(() => {
        stop();
      }, 3000);

      watch(
        () => count.value,
        (newValue, oldValue) => {
          console.log(newValue, oldValue);
        },
        { immediate: true }
      )
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style>
</style>