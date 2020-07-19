<template>
  <div class="pushLog">
    <el-card shadow="hover">
      <div class="searchTop">
        <div class="searchTopBox">
          <div class="title">headline:</div>&nbsp;&nbsp;
          <el-input
            size="small"
            v-model="headline"
            placeholder="Please enter the title"
            class="case-search"
          ></el-input>
        </div>
        <div class="searchTopBox">
          <div class="title" style="width:150px;margin-left:5px;">Push people:</div>
          <el-input
            size="small"
            v-model="pushPeople"
            placeholder="Please enter the title"
            class="case-search"
          ></el-input>
        </div>
        <div class="searchTopBox">
          <div class="title" style="margin-left:5px">select time:</div>
          <el-date-picker
          style="width:255px;"
            size="small"
            v-model="choseTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="-"
            start-placeholder="startTime"
            end-placeholder="endTime"
            align="right"
            class="date-picker"
          ></el-date-picker>
        </div>
      </div>
      <div class="searchBottom">
        <div class="searchBottomBox">
          <div class="title">type:</div>
          <el-select size="small" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="searchBottomBox">
          <div class="title">status:</div>
          <el-select size="small" v-model="status" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-button size="small" type="primary">search</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'pushLog',
  data () {
    return {
      headline: '', // 标题
      pushPeople: '', // 推送人
      choseTime: '', // 选择的时间
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      options: [
        {
          value: '选项1',
          label: 'article '
        },
        {
          value: '选项2',
          label: 'file'
        }
      ],
      value: '',
      status: '',
      statusOptions: [
        {
          value: '选项1',
          label: 'success'
        },
        {
          value: '选项2',
          label: 'fail'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.searchTop {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .searchTopBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      width: 100px;
    }
  }
}
.searchBottom {
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  .searchBottomBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      width: 70px;
      text-align: right;
      margin-right: 9px;
    }
  }
}
</style>
