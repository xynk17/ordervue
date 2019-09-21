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
      <ul class="sub_list" v-if="foodList&&foodList.length!=0&&remarks.length!=0">
        <li v-for="(item,index) in foodList" :key="index">
          <img :src="item.logo" alt />
          <div class="sub_con">
            <span style='display:inline-block;width:3rem;height: 1.5rem'>{{item.name}}<span style="font-size:0.008rem;">{{`（${item.cut}）`}}</span></span>
            <span>￥{{chengjiage(item)}}</span>
          </div>
          <div class="sub_change">
            <div class="sub_box" id="box">
              <el-radio-group v-model="remarks[index].change1" @change="chang(index)">
                <el-radio-button v-if='item.is_zp=="1"' label="1">アイス</el-radio-button>
                <el-radio-button  v-if='item.is_tj=="1"' label="2">ホット</el-radio-button>
              </el-radio-group>
            </div>
            <div class="sub_box" style="width:4rem">
              <el-checkbox-group  v-model="remarks[index].change2" @change="chang(index)">
                <el-checkbox-button v-for='(item,index1) in option' :label="item.id" :key='index1'>{{item.name}}</el-checkbox-button>
              </el-checkbox-group >
            </div>
            <div class="sub_box" v-show="remarks[index].change1=='1'&&item.is_zp=='1'" @change="chang(index)">
              <span class="sub_change_title">氷</span>
              <el-radio-group v-model="remarks[index].change3">
                    <el-radio-button v-for='(item,index2) in ice' :label="item.id" :key='index2'>{{item.name}}</el-radio-button>
              </el-radio-group>
            </div>
            <div class="sub_box" @change="chang(index)">
              <span class="sub_change_title">甘さ</span>
              <el-radio-group  v-model="remarks[index].change4">
                <el-radio-button v-for='(item,index3) in suger' :label="item.id" :key='index3'>{{item.name}}</el-radio-button>
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
  import Url from '../Unitls/ip'
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
        ice:[],
        option:[],
        suger:[],
        note:[],
        pricse:[],
        idx:''
      };
    },
    created(){
       this.getinfo()
    },
    mounted() {
     this.foodList=JSON.parse(localStorage.getItem('list'))
      var fooListNow=this.foodList&&[...this.foodList]
      if(fooListNow){
          for (var i in  fooListNow) {
        if (fooListNow[i].counts > 0||fooListNow[i].countm > 0||fooListNow[i].countl > 0) {
           let a=fooListNow[i].counts||0
           let b=fooListNow[i].countm||0
           let c=fooListNow[i].countl||0
           for (var j = 1;j <= a+b+c; j++) {
             for(var k in this.foodList){
                if(this.foodList[k].name==fooListNow[i].name){
                  if(j<=a){
                    let obj={...fooListNow[i]}
                    this.$set(obj,'cut','S杯')
                    this.foodList.splice(k+1,0,obj);
                  }else if(j>a&&j<=a+b){
                    let obj={...fooListNow[i]}
                    this.$set(obj,'cut','M杯')
                    this.foodList.splice(k+1,0,obj)
                  }else{
                    let obj={...fooListNow[i]}
                    this.$set(obj,'cut','L杯')
                    this.foodList.splice(k+1,0,obj)
                  }
                  if(!this.foodList[k].hasOwnProperty('cut')){
                    this.foodList.splice(k,1)
                  }
                   break
                }
             }


          }
        }
      }
      }
     

      //根据传过来的foodList的长度，push chang变量的个数
      for (var i = 0; i < this.foodList.length; i++) {
        this.remarks.push({
          change1: this.foodList[i]['is_zp']=='0'&&this.foodList[i]['is_tj']=='0'?'':'1',
          change2: [],
          change3: this.foodList[i]['is_zp']=='0'&&this.foodList[i]['is_tj']=='0'?'':"2",
          change4: "2"
        });
        this.pricse.push(this.chengjiage(this.foodList[i]))
         this.note.push({
              "goods_id": this.foodList[i]['id'],
              "size":this.chgngess(this.foodList[i]),
              "hot_ice": this.remarks[i].change1=='1'?"ice":this.foodList[i]['is_zp']=='0'&&this.foodList[i]['is_tj']=='0'?'':"hot",
              "ice":this.foodList[i]['is_zp']=='0'&&this.foodList[i]['is_tj']=='0'?'':"2",
              "suger":"2",
              "option":[]

        })
      }
      this.total = localStorage.getItem('total');
      console.log(this.pricse,88888)
    },
    methods: {
       chgngess(obj){
          switch(obj.cut){
          case 'S杯':return '1';
                break
          case 'M杯':return '2';
                break
          case 'L杯':return '3';
                break
        }
       },
      chengjiage(obj){
        switch(obj.cut){
          case 'S杯':return obj.money;
                break
          case 'M杯':return obj.money2;
                break
          case 'L杯':return obj.dn_money;
                break
        }
      },
      chengjiageName(obj){
        switch(obj.cut){
          case 'S杯':return "money";
                break
          case 'M杯':return "money2";
                break
          case 'L杯':return "dn_money";
                break
        }
      },
      getinfo(){
        this.$axios({
          url: Url.Url + '/orderapi/',
          method: 'get',
          params: {
           service: 'StoreSet.index',
           store_id: sessionStorage.getItem('store_id'),
          }
        })
        .then(res => {
          this.ice=res.data.data.ice
          this.option=res.data.data.option
          this.suger=res.data.data['suger']
        })
      },
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
            note: JSON.stringify(this.note),
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
         if(this.idx==index){
             this.foodList[index][`${this.chengjiageName(this.foodList[index])}`]=this.pricse[index]
             this.idx=''
         }
        var mom=0
        this.total=0
        for(let b in this.remarks[index].change2){
             for(let a in this.option){
           if(this.remarks[index].change2[b]==this.option[a].id){
               mom+=this.option[a].money*1
           }

        }
        }
         this.foodList[index][`${this.chengjiageName(this.foodList[index])}`]=this.pricse[index]*1+mom
         this.idx=index
         this.note[index]={
          "goods_id": this.foodList[index]['id'],
          "size":this.chgngess(this.foodList[index]),
          "hot_ice":this.remarks[index].change1=='1'?"ice":(this.foodList[index]['is_zp']=='0'&&this.foodList[index]['is_tj']=='0')?'':"hot",
          "ice":this.remarks[index].change1=='1'?this.remarks[index].change3:'',
          "suger":this.remarks[index].change4,
          "option":this.remarks[index].change2
        }
        for(var i in this.foodList){
          this.total+=this.foodList[i][`${this.chengjiageName(this.foodList[i])}`]*1
        }
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
    line-height: 0.5rem;
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
#box{
  height:1.5rem
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
