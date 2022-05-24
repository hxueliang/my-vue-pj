import ValidateHoc from './ValidateHoc';
import CustomInput from './CustomInput';

// 通过 ValidateHoc 装饰 CustomInput
// 得到高阶组件 ValidateInput
const ValidateInput = ValidateHoc(CustomInput);

export default {
  name: 'ValidateInput',
  render() {
    return <ValidateInput />
  }
}