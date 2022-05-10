//专门来创建store的实例对象 引入observable方法
import{observable,action} from 'mobx-miniprogram'
//导出实例对象供外部使用
export const store= observable({
  numA:1,
  numB:2,
  //计算属性
  get sum(){
    return this.numA+this.numB
  },
  //actions函数，用来修改store中的数据 step外部传的值
  updateNum1:action(function(step){ 
    this.numA+=step
  }),
  //未使用
  updateNum2:action(function(step){ 
    this.numB-=step
  })
})