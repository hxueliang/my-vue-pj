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
      let watchEffect = cb => {
        active = cb;
        active();
        active = null
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
          }
        }
        notify() {
          this.deps.forEach(dep => queueJob(dep));
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
        return {
          get value() {
            value = fn();
            return value;
          }
        }
      }

      let count = ref(0);
      let computedValue = computed(() => count.value + 3);

      document.getElementById('add').addEventListener('click', function() {
        count.value++;
      })
      let str = '';
      watchEffect(() => {
        str = `hello ${count.value} ${computedValue.value}`;
        console.log(str); // 输出1次，说明页面只浸染了1次
        document.getElementById('text').innerText = str;
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style>
</style>