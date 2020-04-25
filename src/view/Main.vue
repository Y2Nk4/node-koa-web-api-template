<template>
  <div class="main" id="main">
      <el-container class="main-container">
          <el-row :gutter="24" class="main-row">
              <el-col :span="24">
                  <div class="main-title">
                      Title
                  </div>
              </el-col>
          </el-row>
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
