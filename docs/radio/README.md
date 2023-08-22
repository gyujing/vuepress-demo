# Audio


<template>
 <!-- <el-radio v-model="radio" label="1">备选项</el-radio> -->
  <ClientOnly>
    <el-radio v-model="radio" label="1">备选项</el-radio>
     <el-radio v-model="radio" label="2">备选项</el-radio>
  </ClientOnly>

 </template>


 <script>
  export default{
    data(){
      return {
        radio: "1"
      }

    }

  }


</script>


```
<el-radio v-model="radio" label="1">备选项</el-radio>
<el-radio v-model="radio" label="2">备选项</el-radio>
```


## Radio Attributes 


| 参数        | 说明           | 类型  |   可选值   |  默认值    |
| :------------- |:-------------| :-----| :-----| :-----   |
| value / v-model   绑定值   | `string / number / boolean` | -    |  -   |
| label      | Radio 的 `value`   |   string / number / boolean |-    |  -   |
| disabled | 是否禁用     |  boolean |  - |  false  |
