<template>
  <el-form ref="form" :model="form" label-width="80px" style="width:50%;margin-top:20px" >
    <el-form-item label="姓名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="form.age"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.sex">
        <el-radio label="1" value="1">男</el-radio>
        <el-radio label="0" value="0">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="工号">
      <el-input v-model="form.num"></el-input>
    </el-form-item>
    <el-form-item label="科目">
      <el-input v-model="form.course"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">添加</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {addTeacher} from '@/api/teacher'
  export default {
    data() {
      return {
        classVisible:false,
        grade: '',
        form: {
          name: '',
          age: '',
          sex: '',
          num: '',
          course: ''
        }
      }
    },
    methods: {
      onSubmit() {
        var name = this.form.name;
        var age = this.form.age;
        var sex = this.form.sex;
        var num = this.form .num;
        var course = this.form.course;
        var data = {
          name: name,
          age: age,
          sex: sex,
          num: num,
          course: course
        }

        addTeacher(data).then(
          response => {
            this.$message({
              message: response.message,
              type: "success"
            })
          }
        )

      }
    },
    // watch:{
    //   grade: {
    //     handler: function(newVal, oldVal){
    //       if(newVal != oldVal){
    //         this.classVisible = true
    //       }
    //     },
    //     deep: true
    //   }
    // }
  }
</script>
