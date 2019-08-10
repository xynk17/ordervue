<template>
  <div class="order">
    <div class="heard">
      <mt-header title="商品選択">
        <router-link to="/Home" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="order_tit">
    </div>
    <div class="foods-list">
      <div class="tabss">
        <div class="tab-tilte">
          <ul>
            <li @click="tancXian(0)" :class="{active1:cur==0}">人気商品</li>
            <li @click="tancXian(index+1)" :class="{active1:cur==index+1}" v-for='(item,index) in foodsList' :key='index'>{{item.type_name}}</li>
          </ul>
        </div>
        <div class="tab-content">
          <li id="anchor0">
            <p class="productName">人気商品</p>
            <div style="width:100%">
              <tabs
                :showw="false"
                names="人気商品"
                :foods="foodsListHot"
                @drop="drop"
                @dropj="dropj"
              />
            </div>
          </li>
          <li v-for='(item,index) in foodsList' :key='index'>
            <p class="productName">{{item.type_name}}</p>
            <div style="width:100%">
              <tabs
                :showw="true"
                :names="item.type_name"
                :foods="item.good"
                @drop="drop"
                @dropj="dropj"
              />
            </div>
          </li>
        </div>
      </div>
      <cart ref="shopcartRef" :selectFoods="foods" @change="change" :x="x" :y="y"></cart>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Nav.vue";
import tabs from "../components/tabs.vue";
import Cart from "./cart.vue";
import baseUrl from '../Unitls/ip'
export default {
  components: {
    Cart,
    tabs,
    Navbar
  },
  name: "Order",
  data() {
    return {
      IsClick:false,
      gun: true,
      x: 0,
      y: 0,
      cur: 0,
      selected: "Order",
      tabPosition: "left",
      //购物车里面的数据（产品和数量）
      foods: [],
      //后台获取的页面商品数据
      foodsList: [],
      foodsListHot: [],
    }
  },
  mounted(){
    this.hotList()
    this.getFoodList()
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    //热销数据获取
    hotList(){
      	this.$axios({
					url: baseUrl.baseUrl+'/app/index.php',
					method: 'get',
					params: {
					i:'2',
          t:'0',
          v:'5.9.8',
          from:'wxapp',
          c:'entry',
          a:'wxapp',
          do:'Hot',
          m:'zh_cjdianc',
          sign:'70e5b826b994eb14de2b07da143f2982',
          store_id:sessionStorage.getItem('store_id'),
          type:'2',
					}
				})
				.then(res =>{
				    this.foodsListHot=res.data
				})
    },
    //其他非热销foodList
     getFoodList(){
       this.$axios({
					url: baseUrl.baseUrl+'/app/index.php',
					method: 'get',
					params: {
					i:'2',
          t:'0',
          v:'5.9.8',
          from:'wxapp',
          c:'entry',
          a:'wxapp',
          do:'DishesList',
          m:'zh_cjdianc',
          sign:'ec9c01b3be4b8a39c019498d06737aee',
          store_id:sessionStorage.getItem('store_id'),
          type:'2',
					}
				})
				.then(res =>{
				    this.foodsList=res.data
				})
     },
    //根据返回的name判断是哪个模块（热销等）
    judgement(name) {
      if(name=='人気商品'){
       return this.foodsListHot
      }else{ 
         for(var i=0;i<this.foodsList.length;i++){
               if(name==this.foodsList[i].type_name){
             return this.foodsList[i]
          }
         }   
      }
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
        var anchorOffsetList=document.querySelectorAll(".tab-content li")
         for(var i=0 ;i<anchorOffsetList.length;i++){
          if(anchorOffsetList[i]&&!this.IsClick){

             if(scrollTop > anchorOffsetList[i].offsetTop&&i==anchorOffsetList.length-1){
             this.cur = i;
             break;
           }
            if(scrollTop > anchorOffsetList[i].offsetTop && scrollTop < anchorOffsetList[i+1].offsetTop){
               this.cur = i;
            }
          }
      }

         this.IsClick=false
    },
    //tab点击事件
    tancXian(num) {
      this.cur = num;
      this.IsClick=true
      var anchorOffsetList=document.querySelectorAll(".tab-content li")
         document.body.scrollTop =anchorOffsetList[num].offsetTop+5;
         document.documentElement.scrollTop =anchorOffsetList[num].offsetTop+5;
    },
    //同步页面商品数量同步
    change(food) {
      this.foods.forEach((item, index) => {
        if (item.id == food.id) {
          item.count = food.count;
        }
      });
    },
    //增加产品数量
    drop(target, name, event) {
      //判断是哪个tab需改对应tab的数据，来更新页面产品数量
      if(this.judgement(name)){
        if(name=='人気商品'){
           this.judgement(name).forEach((item, index) => {
        if (item.id == target.id) {
          item.count = target.count;
        }
      }); 
        }else{
          this.judgement(name).good.forEach((item, index) => {
        if (item.id == target.id) {
          item.count = target.count;
        }
      });   
         
      }
      }
      //同步购物车的产品数量
      let folge = false;
      let idx = -1;
       this.x = event.clientX;
       this.y = event.clientY;
      this.foods.forEach((item, index) => {
        if (item.id == target.id) {
          folge = true;
          idx = index;
        }
      });
      if (folge && idx >= 0) {
        if (!this.foods[idx].count && this.foods[idx]) {
          this.$set(this.foods[idx], "count", target.count);
        } else {
          this.foods[idx].count = target.count;
        }
      } else {
        this.foods.push(target);
      }
      //性能优化，异步异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcartRef.drop(target);
      });
    },
    //减少产品数量
    dropj(target, name) {
      if(this.judgement(name)){
        if(name=='人気商品'){
           this.judgement(name).forEach((item, index) => {
        if (item.id == target.id) {
          item.count = target.count;
        }
      }); 
        }else{
          this.judgement(name).good.forEach((item, index) => {
        if (item.id == target.id) {
          item.count = target.count;
        }
      });   
         
      }
      }
      let folge = false;
      let idx = -1;
      this.foods.forEach((item, index) => {
        if (item.id == target.id) {
          folge = true;
          idx = index;
        }
      });
      if (folge && idx >= 0) {
        if (target.count <= 0) {
          this.foods.splice(idx, 1);
        } else {
          this.foods[idx].count = target.count;
        }
      }
    }
  }
};
</script>

<style>
@import "../assets/css/index.css";
.heard{
  position:fixed;
  top:0;
  left: 0;
}
.foods-list {
  height: auto;
}
.order_tit {
  height:0.9rem;
  width: 100%;
}
.order_tit img {
  width: 1.4rem;
  height: 1.4rem;
  margin-right: 0.2rem;
  border-radius: 20px;
  float: left;
}
.order_tit div {
  height: 1.6rem;
  line-height: 1.6rem;
  font-size: 0.3rem;
  font-weight: bold;
  margin-left: 1.8rem;
}
.image {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 5px;
  margin-top: 0.25rem;
}
.image img{
  width:1.6rem;
  height: .6rem
}
.vip img {
  width: 0.2rem;
  vertical-align: middle;
}
.title {
  font-weight: 700;
}
.hot {
  float: right;
  width: 0.8rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border: 1px solid red;
  border-radius: 40px;
  text-align: center;
  color: red;
  font-size: 0.1rem;
}
.intro {
  font-size: 0.15rem;
  color: #ccc;
  margin: 0.1rem 0;
}
.send {
  color: orangered;
  font-size: 10px;
  width: 0.1rem;
  height: 0.1rem;
  border: 1px solid orangered;
  border-radius: 4px;
  margin-left: 0.2rem;
}
.vip-left {
  margin-top: 0.1rem;
  background: #000;
  width: 0.7rem;
  color: orange;
}
.vip-price {
  width: 1rem;
  background: orange;
  height: 0.2rem;
}
.price {
  position: relative;
  font-weight: 700;
  color: red;
  font-size: 0.3rem;
  margin-top: 0.1rem;
}

.old {
  color: #ddd;
  font-size: 12px;
}
.vip {
  margin-top: 0.1rem;
}
.fuhao {
  display: inline-block;
  height: 0.3rem;
  line-height: 0px;
  border-radius: 5rem;
  font-size: 0.4rem;
  font-weight: 700;
  color: #34aaff;
}
.priceBox {
  display: inline-block;
  margin-left: 0.2rem;
}
.rightBox {
  padding-left: 2rem;
}
.tabss .tab-tilte {
  position: fixed;
  left: 0;
}
.tab-tilte li {
  width: 1.7rem;
  height: 40px;
  text-align: right;
  margin: 5px 10px 5px 0;
  line-height: 40px;
  font-size: 0.24rem;
  font-weight: 400;
}
.tabss .tab-content {
  position: absolute;
  left: 2.1rem;
  width: 5.3rem;
  padding-bottom: 1rem;
  font-size: 0.29rem;
  font-weight: 400;
}
.tab-content li{
  list-style:none;
}

.active1 {
  border-left: 0.1rem solid #34aaff;
  width: 1.7rem;
  height: 40px;
  text-align: right;
  margin: 5px 10px 5px 0;
  line-height: 40px;
  font-size: 0.29rem;
  font-weight: 400;
}
.heard .mint-header {
  height: 0.88rem;
  background: #34aaff;
  color: #ffffff;
  width: 100%;
  font-size: 0.3rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.productName {
  /* position: absolute;
  left:0;
  top:0;
  z-index: 666; */
  height: 0.5rem;
  /* background: #fff; */
  /* margin-top: 0.1rem; */
  width: 100%;
}
</style>
