<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div  class="clearfix">
        <el-select v-model="value" placeholder="案件类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button style="float: right; padding: 3px 0" type="text">添加类型</el-button>
      </div>
    </el-card>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "CaseClassification",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  }
};
</script>

<style>
</style>