<template>
  <div class="order_sub">
    <div class="heard">
      <mt-header title="オプション選択">
        <router-link to="/Order" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="order_sub_list">
      <ul class="sub_list" v-if="foodList.length!=0&&remarks.length!=0">
        <li v-for="(item,index) in foodList" :key="index">
          <img :src="item.logo" alt />
          <div class="sub_con">
            <span>{{item.name}}</span>
            <span>￥{{item.money}}</span>
          </div>
          <div class="sub_change">
            <div class="sub_box" id="box">
              <el-radio-group v-model="remarks[index].change1" @change="chang(index)">
                <el-radio-button label="1">アイス</el-radio-button>
                <el-radio-button label="2">ホット</el-radio-button>
              </el-radio-group>
            </div>
            <div class="sub_box">
              <el-checkbox-group v-model="remarks[index].change2" @change="chang(index)">
                <el-checkbox-button label="珍珠追加">タピオカ追加</el-checkbox-button>
              </el-checkbox-group>
            </div>
            <div class="sub_box" v-show="BuList[index]!=index" @change="chang(index)">
              <span class="sub_change_title">氷</span>
              <el-radio-group v-model="remarks[index].change3">
                <el-radio-button label="1">1</el-radio-button>
                <el-radio-button label="2">2</el-radio-button>
                <el-radio-button label="3">3</el-radio-button>
                <el-radio-button label="4">4</el-radio-button>
                <el-radio-button label="5">5</el-radio-button>
              </el-radio-group>
            </div>
            <div class="sub_box" v-show="BuList[index]!=index" @change="chang(index)">
              <span class="sub_change_title">甘さ</span>
              <el-radio-group v-model="remarks[index].change4">
                <el-radio-button label="1">1</el-radio-button>
                <el-radio-button label="2">2</el-radio-button>
                <el-radio-button label="3">3</el-radio-button>
                <el-radio-button label="4">4</el-radio-button>
                <el-radio-button label="5">5</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </li>
      </ul>
      <div class="shiji">
        <span>決済金額</span>
        <span class="smallHe">
          合計：
          <span>￥{{total}}</span>
        </span>
      </div>
      <div>
        <el-input type="textarea" autosize placeholder="备注" v-model="textarea"></el-input>
      </div>
      <div class="footerBox">
        <span class="totalHe">
          合計：
          <span>￥{{total}}</span>
        </span>
        <span class="footerPay" @click="submit">注文する</span>
      </div>
    </div>
  </div>
</template>

<script>
  import baseUrl from "../Unitls/ip";
  import {
    formatDatemin
  } from "@/Unitls/formatdate";
  export default {
    name: "OrderSub",
    data() {
      return {
        now: "",
        add: false,
        foodList:[],
        total: 0,
        glole: "",
        textarea: "",
        remarks: [],
        productionName: "",
        beizhu: "",
        str: [],
        BuList:[],
      };
    },
    mounted() {
     this.foodList=JSON.parse(localStorage.getItem('list'))
      var fooListNow=[...this.foodList] 
      for (var i in  fooListNow) {
          this.BuList.push(i) 
        if (fooListNow[i].count > 1) {
           for (var j = 1;j < fooListNow[i].count; j++) {
             for(var k in this.foodList){
                if(this.foodList[k].name==fooListNow[i].name){
                   this.foodList.splice(k,0,fooListNow[i]);
                   break
                }
             }

          }
        }
      }
      //根据传过来的foodList的长度，push chang变量的个数
      for (var i = 0; i < this.foodList.length; i++) {
        this.remarks.push({
          change1: "2",
          change2: "",
          change3: "",
          change4: ""
        });
        this.str.push({
          str:
 `
NO.${i+1}
商品名：${this.foodList[i].name}；
ホット；
タピオカ追加：${this.remarks[i].change2 ? "是" : "否"}；`,
          index: i
        });
        this.textarea +=
        `
NO.${i+1}
产品名称：${this.foodList[i].name}；
ホット；
タピオカ追加：${this.remarks[i].change2 ? "是" : "否"}；
----------------------------`;
      }
      this.total = localStorage.getItem('total');
    },
    methods: {
      //提交点单
      submit() {
        if (!localStorage.getItem("UserId")) {
          let time = formatDatemin(new Date());
          let UserId = time + sessionStorage.getItem('store_id');
          localStorage.setItem("UserId", UserId);
        }
        let sz = [];
        this.foodList.forEach((item, index) => {
          sz.push({
            name: item.name,
            img: item.logo,
            num: '1',
            money: item.money,
            dishes_id: item.id,
            spec: "",
            is_qg: "2"
          });
        });
        this.$axios({
          url: baseUrl.baseUrl +
            "/app/index.php?i=2&t=0&v=5.9.8&from=wxapp&c=entry&a=wxapp&do=AddOrder&&m=zh_cjdianc",
          method: "post",
          data: {
            user_id: localStorage.getItem("UserId"),
            store_id: sessionStorage.getItem('store_id'),
            money: this.total,
            note: this.textarea,
            type: "1",
            order_type: "1",
            pay_type: "4",
            sz: JSON.stringify(sz)
          }
        }).then(res => {
          if (res.statusText == "OK") {
            this.$router.push({
              name: 'OrderSee',
              query: {
                store_id: sessionStorage.getItem('store_id'),
              }
            })
            localStorage.removeItem('list')
            localStorage.removeItem('total')
          }
        });
      },
      //选择备注是的设置
      chang(index) {
        if (this.remarks[index].change1 == "1") {
          this.BuList[index]='gg'
        } else {

          this.BuList[index]=index
        }
        this.beizhu =
          this.remarks[index].change1 == "2" ?
        `
NO.${index+1}
商品名：${this.foodList[index].name}；
ホット；
タピオカ追加：${this.remarks[index].change2 ? "是" : "否"}；`:
        `
NO.${index+1}
商品名：${this.foodList[index].name}；
アイス；
タピオカ追加：${this.remarks[index].change2 ? "是" : "否"}；
氷：${this.remarks[index].change3}；
甘さ：${this.remarks[index].change4}；`;
        this.textarea = "";
        for (var i = 0; i < this.str.length; i++) {
          if (this.str[i].index == index) {
            this.add = true;
            this.now = i;
          }
        }
        if (!this.add) {
          this.str.push({
            str: this.beizhu,
            index: index
          });
        } else {
          this.str[this.now].str = this.beizhu;
        }
        for (var j = 0; j < this.str.length; j++) {
          this.textarea += this.str[j].str+`
---------------------------`;
        }
        this.add = false;
        this.productionName = this.foodList[index].title;
      }
    }
  };
</script>

<style>
  @import "../assets/css/index.css";

  .order_sub_list {
    background: #ffffff;
    width: 92%;
    margin: 0 auto;
    padding-top: 1rem;
    margin-bottom: 1.1rem;
  }

  .sub_list {
    background: #f8f8f8;
  }

  .sub_list img {
    float: left;
    vertical-align: middle;
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 20px;
  }

  .sub_list .sub_con {
    width: 4.4rem;
    float: right;
    height: 1rem;
    line-height: 1rem;
    margin-left: 1rem;
    font-size: 0.29rem;
  }

  .sub_list li {
    list-style: none;
    border-bottom: 0.2rem solid #fff;
    padding: 0.1rem 0.3rem;
  }

  .sub_list .sub_con span:nth-child(2) {
    float: right;
    color: #333333;
    font-size: 0.29rem;
  }

  .sub_change .sub_box {
    margin-bottom: 0.1rem;
    text-align: left;
  }

  #box .el-radio-button__inner {
    padding: 0.1rem 0.4rem;
    border: 1px solid #dcdfe6;
  }

  .sub_change .sub_box .el-radio-button {
    margin-right: 0.26rem;
  }

  .sub_change .sub_box .el-radio-button__inner {
    padding: 0.1rem 0.1rem;
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    font-size: 0.2rem;
  }

  .sub_change .sub_box .el-checkbox-button__inner {
    padding: 0.1rem 0.1rem;
    border-radius: 2px;
    font-size: 0.2rem;
  }

  .sub_change .sub_box .sub_change_title {
    display: inline-block;
    width: 1rem;
    font-size: 0.2rem;
  }

  .number {
    font-size: 0.2rem;
    color: #888;
  }

  .shiji {
    font-size: 0.35rem;
    background: #f8f8f8;
    border-bottom: 0.1rem solid #fff;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #888;
  }

  .smallHe {
    float: right;
  }

  .smallHe span {
    color: red;
  }

  .footerBox {
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 0.35rem;
    width: 100%;
    height: 1rem;
  }

  .totalHe {
    display: inline-block;
    margin-left: 2rem;
    /* margin: auto; */
    margin-top: 0.3rem;
    display: inline-block;
    margin-left: 2rem;
  }

  .totalHe span {
    color: red;
  }

  .footerPay {
    position: fixed;
    bottom: 0;
    right: 0;
    text-align: center;
    background: #34aaff;
    color: #fff;
    width: 2.5rem;
    height: 0.9rem;
    line-height: 0.9rem;
  }

  .heard {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }
</style>
