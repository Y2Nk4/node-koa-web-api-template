<template>
  <div class="main" id="main">
      <el-container class="main-container">
          <el-popconfirm
              confirmButtonText='好的'
              cancelButtonText='不用了'
              icon="el-icon-info"
              iconColor="red"
              title="这是一段内容确定删除吗？"
          >
              <el-button slot="reference">删除</el-button>
          </el-popconfirm>
      </el-container>
  </div>
</template>

<script>
    import '../assets/less/main.less'

    export default {
        name: 'Main',

        data () {
            return {
                CurrentTab: 'Glance'
            }
        },

        methods: {
            changeTab () {

            }
        }
    }
</script>

<style scoped>

</style>
