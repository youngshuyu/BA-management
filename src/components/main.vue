<template>
  <div style="height:100vh;">
    <el-container>
      <el-header>
        <v-header></v-header>
      </el-header>
    </el-container>
    <el-container class="middle">
      <el-aside>
        <v-aside></v-aside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import header from './header/index'
import aside from './aside/index'
export default {
  name: 'main',
  data () {
    return {}
  },
  components: {
    'v-header': header,
    'v-aside': aside
  }
}
</script>

<style>
@import '../../node_modules/normalize.css/normalize.css'

</style>
