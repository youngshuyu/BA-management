<template>
  <div class="CaseClassification">
    <el-card class="box-card" shadow="hover">
      <div class="userSearch">
        Search User:
        <el-input
          size="small"
          v-model="keyword"
          placeholder="Please enter keywords"
          class="search"
          style="width:300px;margin-right:30px;"
        ></el-input>
        <el-button size="small" type="primary" @click="onSearchUser">Search</el-button>
        <el-button size="small" type="primary" @click="addUserDialog">Add user</el-button>
        <!-- 新增弹窗 -->
        <el-dialog title="Add user" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="form" :rules="rules" ref="addForm">
            <el-form-item label="userName" prop="username" :label-width="formLabelWidth">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="realName" prop="realName" :label-width="formLabelWidth">
              <el-input v-model="form.realName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="password" prop="password" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="organization" prop="organization" :label-width="formLabelWidth">
              <el-cascader v-model="form.organizationId" :options="addOptions" :props="addProps"></el-cascader>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onAddUser('addForm')">Confirm</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>

    <el-card shadow="hover" style="margin-top:10px;">
      <el-table :data="tableData" style="width: 100%;">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column type="index" width="120" label="Number"></el-table-column>
        <!-- <el-table-column prop="userAccount" label="userAccount" width="180"></el-table-column> -->
        <el-table-column prop="realName" label="UserName" width="180"></el-table-column>
        <!-- <el-table-column prop="role" label="role" width="180"></el-table-column> -->
        <el-table-column prop="route" label="Organization" width="400"></el-table-column>
        <el-table-column prop="operation" label="Operation">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="lookOver(scope.row)">
              <span :style="{paddingLeft:'10px'}"></span>
              Look over
            </el-button>
            <el-button type="text" size="small" @click="deleteUser(scope.row)">
              <span :style="{paddingLeft:'10px'}"></span>
              Delete
            </el-button>
            <el-button type="text" size="small" @click="setRole">Role setting</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 查看用户信息弹窗 -->
      <el-dialog title="User information" :visible.sync="userInfo" width="500px">
        <el-form :model="userInfoForm">
          <el-form-item label="realName" :label-width="formLabelWidth">
            <el-input v-model="userInfoForm.realName" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="userName" :label-width="formLabelWidth">
            <el-input v-model="userInfoForm.username" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="createTime" :label-width="formLabelWidth">
            <el-input v-model="userInfoForm.createTime" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Route" :label-width="formLabelWidth">
            <el-input v-model="userInfoForm.route" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 角色修改 -->
      <el-dialog title="Role select" :visible.sync="showRoleSetting" width="500px">
        <el-select v-model="selectedRoles" multiple placeholder="请选择">
          <el-option v-for="item in roleOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showRoleSetting = false">Cancel</el-button>
          <el-button type="primary" @click="onSetRole">Confirm</el-button>
        </div>
      </el-dialog>
      <el-pagination background layout="prev, pager, next" :current-page.sync="page" :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CaseClassification",
  data() {
    var checkName = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        return callback(new Error("The user name cannot be empty."));
      } else {
        callback();
      }
    };
    var checkOrganization = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("The organizatione cannot be empty."));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input a password."));
      } else if (String(value).length < 6) {
        callback(new Error("Password length is not less than 6 digits!"));
      } else {
        callback();
      }
    };
    return {
      selectedRoles: [],
      roleOptions: [],
      addProps: {
        expandTrigger: "hover",
        children: "sons",
        value: "id",
        label: "name",
        emitPath: false
      },
      addOptions: [],
      tableData: [],
      userCategory: "",
      keyword: "",
      organizationalStructure: "",
      options: [
        {
          value: "all",
          label: "all"
        },
        {
          value: "Activated",
          label: "Activated"
        },
        {
          value: "Nonactivated",
          label: "Nonactivated"
        }
      ],
      userSearch: "",
      dialogFormVisible: false,
      form: {
        organizationId: "",
        username: "",
        realName: "",
        password: ""
      },
      userInfoForm: {},
      rules: {
        username: [
          {
            required: true,
            validator: checkName,
            message: "Please enter the userName",
            trigger: "blur"
          }
        ],
        realName: [
          {
            required: true,
            validator: checkName,
            message: "Please enter the realName",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            message: "Please enter the password",
            trigger: "blur"
          }
        ],
        organization: [
          {
            required: true,
            validator: checkOrganization,
            message: "Please chose the organization",
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "120px",
      userInfo: false,
      total: 10,
      page: 1,
      showRoleSetting: false
    };
  },
  methods: {
    // 展示新增用户弹窗
    async addUserDialog() {
      this.dialogFormVisible = true;
      let res = await this.$axios({
        url: "/auth/system/organization/tree",
        method: "get"
      });
      if (res.code === "0") {
        this.addOptions = res.data;
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    async getRoleList() {
      const res = await this.$axios({
        url: "auth/system/role/list",
        method: "POST",
        data: {
          c: 100,
          keyword: "",
          p: 1
        }
      });
      if (res.code === "0") {
        this.roleOptions = res.data.list;
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    async getUserList() {
      let res = await this.$axios({
        url: "/auth/user/user/list",
        method: "POST",
        data: {
          c: 10,
          keyword: this.keyword,
          p: this.page
        }
      });
      if (res.code === "0") {
        this.tableData = res.data.list;
        this.total = res.data.count;
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    // 增加用户
    onAddUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addSubnit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // this.dialogFormVisible = false;
    },
    // 提交
    async addSubnit() {
      let res = await this.$axios({
        url: "/auth/system/user/register",
        method: "post",
        data: this.form
      });
      if (res.code == "0") {
        this.dialogFormVisible = false;
        this.$message({
          message: "operate successfully",
          type: "success"
        });
        this.getUserList();
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    // 角色设置
    onSetRole() {
      console.log(this.selectedRoles);
    },
    async lookOver(e) {
      this.userInfo = true;
      let res = await this.$axios({
        url: `auth/system/user/info/${e.id}`,
        method: "get"
      });
      this.userInfoForm = res.data;
    },
    setRole() {
      this.showRoleSetting = true;
      this.getRoleList();
    },
    onSaveUserInfo() {
      this.userInfo = false;
    },
    onSearchUser() {
      this.getUserList();
    },
    async deleteUser(e) {
      let res = await this.$axios({
        url: `/auth/system/user/${e.id}`,
        method: "DELETE"
      });
      if (res.code == 0) {
        this.getUserList();
        this.$message({
          message: "operate successfully",
          type: "success"
        });
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    }
  },
  created() {
    this.getUserList();
  }
};
</script>

<style lang="less" scoped>
.CaseClassification {
  padding: 20px;
}
/deep/.el-table {
  th {
    text-align: center;
  }
  td {
    text-align: center;
  }
}
</style>
