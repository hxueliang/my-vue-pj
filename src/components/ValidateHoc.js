import Vue from 'vue';
const ValidateHoc = Component => { // Component: 接收的是 CustomInput子组件
  // 创建一个新组件（在render返回）
  return Vue.component(`hoc-${Component.name}`, {
    data() { return { errMsg: '' } },
    methods: {
      validate(data) {
        console.log(data, 'validate');
        if (data.length !== 11) {
          this.errMsg = '请输入11位手机号';
          return false;
        }
        this.errMsg = '';
        return true;
      }
    },
    render() {
      return (<div>
        {/* 在父组件监听 CustomInput子组件 blur事件，然后调用validate方法效验 */}
        <Component on-blur={this.validate} />
        {this.errMsg}
      </div>);
    }
  });
};

export default ValidateHoc;
