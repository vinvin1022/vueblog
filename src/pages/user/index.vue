<template>
  <el-container>
    <el-main>
      <el-table v-loading="globalState.loading" element-loading-background="rgba(0, 0, 0, 0)"
        :data="tableData && tableData.userList"
        stripe border
        style="width: 100%">
        <el-table-column
          prop="_id"
          label="_id"
          width="300">
        </el-table-column>
        <el-table-column
        label="头像"
        width="120">
          <template slot-scope="scope">
            <img :src="scope.row.avatarSrc" style="width:100px; height:auto">
          </template>
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
      <el-button style="margin-top:20px; float:right" @click="cancle">取消</el-button>
    </el-main>
  </el-container>
</template>

<script>
import userService from './userService.js'
import { sources } from '@/service/request'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      tableData: {},
      pageSizes: [10, 15, 30, 50],
      pageSize: 10,
      pageNum: 1
    }
  },
  computed: {
    ...mapGetters({
      globalState: 'globalState'
    })
  },
  created () {
    // this.loadingEnd()
    this.getUserList()
  },
  methods: {
    getUserList () {
      this.loadingStart()
      userService.getUserList(this.pageSize, this.pageNum)
        .then(result => {
          this.tableData = result
        })
    },
    handleCurrentChange (val) {
      this.cancle()
      console.time('start')
      this.pageNum = val
      this.getUserList()
    },
    handleSizeChange (val) {
      this.cancle()
      this.pageSize = val
      this.getUserList()
    },
    cancle () {
      let cancleApi = sources.get('/api/getUserList')
      cancleApi && cancleApi()
      this.loadingEnd()
    },
    ...mapActions({
      loadingStart: 'loadingStart',
      loadingEnd: 'loadingEnd'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.pagination{ text-align: right; margin-top:20px;}
</style>
