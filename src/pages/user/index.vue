<template>
  <el-container>
    <el-main>
      <el-table
        :data="tableData && tableData.userList"
        stripe border
        style="width: 100%">
        <el-table-column
          prop="_id"
          label="_id"
          width="300">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="memberCellphone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
         <el-table-column
          prop="regIp"
          label="注册IP">
        </el-table-column>
        <el-table-column
          prop="loginIp"
          label="登陆IP">
        </el-table-column>
      </el-table>
      <div v-if="tableData && tableData.userList && tableData.userList.length > 0" class="pagination">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.totalResult">
      </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import userService from './userService.js'
export default {
  data () {
    return {
      tableData: {},
      pageSizes: [10, 15, 30, 50],
      pageSize: 10,
      pageNum: 1
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      userService.getUserList(this.pageSize, this.pageNum).then(result => {
        this.tableData = result
      })
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.getUserList()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getUserList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.pagination{ text-align: right; margin-top:20px;}
</style>
