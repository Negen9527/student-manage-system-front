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
          label="年级"
          width=""
          align="center">
            <template slot-scope="scope">
              {{ scope.row.grade }}
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="班级"
          width=""
          align="center">
            <template slot-scope="scope">
              {{ scope.row.clazz }}
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="班主任"
          width=""
          align="center">
            <template slot-scope="scope">
              {{ scope.row.headTeacher }}
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="限定人数"
          width=""
          align="center">
            <template slot-scope="scope">
              {{ scope.row.totalStudent }}
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="当前人数"
          width=""
          align="center">
            <template slot-scope="scope">
              {{ scope.row.currentTotalStudent }}
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

    <el-dialog title="编辑班级信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-input v-model="form.id" autocomplete="off" v-show="false"></el-input>
        <el-form-item label="年级" :label-width="formLabelWidth">
          <el-input v-model="form.grade" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-input v-model="form.clazz" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班主任" :label-width="formLabelWidth">
          <el-input v-model="form.headTeacher" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="限定人数" :label-width="formLabelWidth">
          <el-input v-model="form.totalStudent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateClazz()">确 定</el-button>
      </div>
    </el-dialog>
  </div>


</template>




<script type="text/javascript">
import { listClazz,updateClazz,deleteClazz } from '@/api/clazz'
export default {
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth:'100px',
      tableData: [],
      form: {
        index: '',
        id: '',
        grade: '',
        clazz: '',
        headTeacher: '',
        totalStudent: ''
      }
    }
  },
  methods: {
      loadData(){
        var response = listClazz().then(
          response => {
            this.tableData = response.data
          }
        )

      },
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.form.index = index;
        var id = row.id;
        var grade = row.grade;
        var clazz = row.clazz;
        var headTeacher = row.headTeacher
        var totalStudent = row.totalStudent
        this.form.id = id;
        this.form.grade = grade;
        this.form.clazz = clazz;
        this.form.headTeacher = headTeacher;
        this.form.totalStudent = totalStudent;
      },
      handleDelete(index, row) {
        var id = row.id;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          deleteClazz(id).then(
            response => {
              this.tableData.splice(index, 1);
              this.$message({
                  message: response.message,
                  type: 'success'
                });
            }
          )
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消删除'
           });
         });

      },
      handleUpdateClazz(){
        var id = this.form.id;
        var grade = this.form.grade;
        var clazz = this.form.clazz;
        var headTeacher = this.form.headTeacher
        var totalStudent = this.form.totalStudent
        if(id===null || id === ""
          || grade===null || grade === ""
          || clazz===null || clazz === ""
          || headTeacher===null || headTeacher === ""
          || totalStudent===null || totalStudent === ""
        ){
          this.$message({
              message: '请填写完成的信息',
              type: 'warning'
            });
        }else{
          //提交修改请求
          var data = {
            id:id,
            grade:grade,
            clazz:clazz,
            headTeacher:headTeacher,
            totalStudent:totalStudent
          }
          updateClazz(data).then(
            response => {
              var i = this.form.index;
              this.tableData[i].grade = grade;
              this.tableData[i].clazz = clazz;
              this.tableData[i].headTeacher = headTeacher;
              this.tableData[i].totalStudent = totalStudent;
              this.dialogFormVisible = false;
              this.$message({
                  message: response.message,
                  type: 'success'
                });
            }
          );
        }

      }
    },
    mounted: function() {
      this.loadData()
    }
}
</script>
