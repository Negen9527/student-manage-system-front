<template>
<div class="">
  <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="序号"
        width=""
        align="center">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
      </el-table-column>
      <el-table-column
        label="工号"
        width=""
        align="center">
          <template slot-scope="scope">
            {{ scope.row.num }}
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width=""
        align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="年龄"
        width=""
        align="center">
          <template slot-scope="scope">
            {{ scope.row.age }}
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
        width=""
        align="center">
          <template slot-scope="scope">
            {{ scope.row.sex | convertSex}}
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="科目"
        width=""
        align="center">
          <template slot-scope="scope">
            {{ scope.row.course }}
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="编辑学生信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-input v-model="form.index" autocomplete="off" v-show="false"></el-input>
        <el-input v-model="form.id" autocomplete="off" v-show="false"></el-input>
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="form.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="formsex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        </el-form-item>
        <el-form-item label="科目" :label-width="formLabelWidth">
          <el-input v-model="form.course" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateStudent()">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>




<script type="text/javascript">
import {listTeacher, updateTeacher, deleteTeacher} from '@/api/teacher'
export default {
  data () {
    return {
      formLabelWidth:'',
      sexRadio: '',
      tableData: [],
      dialogFormVisible: false,
      formsex: 0,
      form: {
        index: '',
        id: '',
        num: '',
        name: '',
        age: '',
        course: ''
      }

    }
  },
    methods: {
      handleEdit(index, row) {
        this.form.index = index;
        this.form.id = row.id
        this.form.age = row.age
        this.formsex = row.sex
        this.form.num = row.num
        this.form.name = row.name
        this.form.course = row.course
        this.dialogFormVisible = true;
      },
      handleDelete(index, row) {
        //删除记录
        var id = row.id;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          deleteTeacher(id).then(
            response => {
              this.tableData.splice(index, 1);
              this.$message({
                  message: response.message,
                  type: 'success'
                });
            }
          )
         }).catch((response) => {
           console.log(response);
           this.$message({
             type: 'info',
             message: '已取消删除'
           });
         });
      },
      loadData(){
        listTeacher().then(
          response => {
            this.tableData = response.data;
          }
        )
      },
      handleUpdateStudent(){
        var id = this.form.id;
        var age = this.form.age;
        var sex = this.formsex;
        var num = this.form.num;
        var name = this.form.name;
        var course = this.form.course;
        var data = {
          id: id,
          age: age,
          sex: sex,
          num: num,
          name: name,
          course: course
        }

        updateTeacher(data).then(
          //更新页面数据

          response => {
            // var i = this.form.index;
            // this.tableData[i].age = age;
            // this.tableData[i].sex = sex;
            // this.tableData[i].num = num;
            // this.tableData[i].name = name;
            // this.tableData[i].grade = grade;
            // this.tableData[i].clazz = clazz;
            // this.tableData[i].address = address;
            // this.dialogFormVisible = false;
            this.dialogFormVisible = false;
            this.loadData()
            this.$message({
              message: response.message,
              type: "success"
            })
          }
        )

      }
    },
  mounted: function(){
    this.loadData();
  },
  filters:{
    convertSex(sex){
      switch(sex){
        case 1:
          return "男"
          break
        case 0:
          return "女"
          break
      }
    }
  }
}
</script>
