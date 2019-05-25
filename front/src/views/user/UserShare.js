export default {
  name: 'Container',
  data: function(){
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      username: '',
      isCollapse: false,
      imagesbox: [
        {id: 0, idView: require("@/assets/test1.jpg")},
        {id: 1, idView: require("@/assets/test2.jpg")},
        {id: 2, idView: require("@/assets/test3.jpg")},
        {id: 3, idView: require("@/assets/test4.jpg")},
        {id: 4, idView: require("@/assets/test5.jpg")},
        {id: 5, idView: require("@/assets/test6.jpg")}
      ],
      tableData: [{
        picture: require("@/assets/test1.jpg"),
        date: '2016-05-02',
        name: '王小虎',
        state: '已完成',
        film: '建国大业',
        room: '一号厅',
        open: '2019-8-10 12:12',
        seat: '三排5座 三排4座',
        money: '66',
        num: 2,
      },
        {
          picture: require("@/assets/test1.jpg"),
          date: '2016-05-02',
          name: '王小虎',
          state: '已完成',
          film: '建国大业',
          room: '一号厅',
          open: '2019-8-10 12:12',
          seat: '三排5座 三排4座',
          money: '66',
          num: 2,
        }],

      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },

      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        region:
          [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
        date1:
          [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
        date2:
          [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
        type:
          [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
        resource:
          [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
        desc:
          [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toggleSideBar() {
      this.isCollapse = !this.isCollapse
    },
    logout: function () {
      this.$confirm('确认退出?', '提示', {})
        .then(() => {
          sessionStorage.removeItem('user');
          this.$router.push('/login');
        })
        .catch(() => { });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleEdit(key, keyPath) {
      console.log(key, keyPath);
    },
    handleDelete(key, keyPath) {
      console.log(key, keyPath);
    },
    getMovie(event){
      this.$router.push({path: '/user/MovieList'});
    },
    getmymovie(event){
      this.$router.push({path: '/user/MyMovie'});
    },
    getmycard(event){
      this.$router.push({path: '/user/MyCard'});
    },
    getinfo(event){
      this.$router.push({path: '/user/Info'});
    },
  },
  mounted: function () {
    let user = sessionStorage.getItem('user');
    if (user) {
      this.username = user;
    }
  },
}
