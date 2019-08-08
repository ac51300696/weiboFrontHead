<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="博主名">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="300px" align="center" label="微博文案">
        <template slot-scope="scope">
          <span>{{ scope.row.cleanCommodityDescribe }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column> -->

      <!-- <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column> -->

      <el-table-column min-width="300px" label="图片">
        <template slot-scope="{row}">
          <el-image
            :src="'data:image/jpeg;base64,' + row.pic_base64_list[0]"
            :preview-src-list="row.pic_base64_list | imageMap"
          />
          <!-- <div class="imageList">
            <img v-for="(item, index) in row.pic_base64_list" :key="index" :src="'data:image/jpeg;base64,' + item">
          </div> -->
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="微博的时间">
        <template slot-scope="{row}">
          <span>{{ row.edit_time }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="80">
        <template slot-scope="{row}">
          <el-tag :type="row.release_num | statusFilter" @click="changeStatus(row)">
            {{ row.release_num | statusTextFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'/example/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, updateArticle } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'info',
        2: 'danger'
      }
      return statusMap[status]
    },
    statusTextFilter(status) {
      const statusMap = {
        0: '未读',
        1: '已读',
        2: '废弃'
      }
      return statusMap[status]
    },
    imageMap(list) {
      return list.map(e => { return `data:image/jpeg;base64,${e}` })
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        isPaging: true
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    changeStatus(row) {
      const release_num = row.release_num ? 0 : 1
      const params = { release_num }
      updateArticle(row._id, params).then(response => {
        row.release_num = release_num
      })
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        console.log('response', response)
        this.list = response.data.list
        this.total = response.data.count
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.imageList{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  img{
    width: 90px;
    height: auto;
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>
