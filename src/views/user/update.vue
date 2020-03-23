<template>
  <div class="app-container" >
    <el-form ref="form" :model="form" label-width="120px" style="width:50%;margin-top:20px" >
      <el-form-item label="账号">
        <el-input v-model="form.name" :disabled="true"/>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:8888/avatar/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="form.introduction" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {updateUserInfo} from '@/api/user'
export default {
  data() {
    return {
      imageUrl: '',
      form: {
        name: '',
        avatar: '',
        introduction: ''
      }
    }},
    methods: {
    onSubmit() {
      if(null === this.form.introduction || "" === this.form.introduction){
        this.$message.error("请填写完整的信息")
        return
      }
      var data = {
        id: this.$store.getters.id,
        introduction : this.form.introduction
      }

      updateUserInfo(data).then(
        response=>{
            this.$message.success(response.message)
        }
      )
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isJPG && isLt2M;
    }
  },
  mounted: function() {
    this.form.name = this.$store.getters.name
    this.form.introduction = this.$store.getters.introduction
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
