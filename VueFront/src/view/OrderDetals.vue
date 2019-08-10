<template>
  <div class="order_sub">
    <div class="heard">
      <mt-header title="注文詳細">
        <router-link to="/OrderSee" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="swriper1">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for='(item,index) in imgList' :key='index'>
          <img :src="item" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="order_sub_list1" style='width: 100%' v-if='foodList.length>0'>
      <ul class="sub_list1">
        <li v-for="(item,index) in foodList" :key='index'>
          <img :src="item.img" alt="">
          <div class="sub_con1">
            <span>{{item.name}}</span>
            <span>￥{{item.money*item.number}}</span>
            <p class='number1'>&times;{{item.number}}</p>
          </div>
        </li>
      </ul>
      <div class='shiji1'>
        <span style='font-size:0.2rem'>決済金額</span>
        <span class='smallHe1'>合計：<span>￥{{order.money}}</span></span>
      </div>
      <div>
        <div class='shiji1'>
          <p style='color:#000;font-size: 0.3rem'>注文詳細</p>
          <p style="font-weight:700;font-size:0.5rem">
            <span>番号</span>
            <span class='orderId'>{{id}}</span>
          </p>
          <p>
            <span>注文番号</span>
            <span class='orderId'>{{order.order_num}}</span>
          </p>
          <p>
            <span>注文時間</span>
            <span class='orderId'>{{order.time}}</span>
          </p>
          <p>
            <el-input type="textarea" :rows="4" placeholder="备注" :disabled="true" autosize disabled id="textarea"
              v-model="order.note">
            </el-input>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import baseUrl from '../Unitls/ip'
  export default {
    name: 'OrderSub',
    data() {
      return {
        id:this.$route.query.id,
        show: false,
        foodList: [], //后台返回的数据
        glole: '',
        order: {},
        imgList: ["http://www.shibaorder.com/attachment/images/2/2019/06/AJ4JUjJxJbJBjJxzUgby9JZjSHsCXj.jpg",
          "http://www.shibaorder.com/attachment/images/2/2019/06/AJ4JUjJxJbJBjJxzUgby9JZjSHsCXj.jpg"
        ]

      }
    },

    mounted() {
      this.$axios({
          url: baseUrl.baseUrl + '/app/index.php',
          method: 'post',
          params: {
            i: '2',
            t: '0',
            v: '5.9.8',
            from: 'wxapp',
            c: 'entry',
            a: 'wxapp',
            do: 'OrderInfo',
            m: 'zh_cjdianc',
            order_id: this.$route.query.id
          }
        })
        .then(res => {
          this.foodList = res.data.good
          this.order = res.data.order
          console.log(res)
        })
    },
    methods: {

    },
  }
</script>

<style>
  @import '../assets/css/index.css';

  .swriper1 {
    height: 3rem;
    margin-top: 0.9rem
  }

  .swriper1 img {
    width: 100%;
    height: 105%;
  }

  .order_sub_list1 {
    background: #FFFFFF;
    width: 92%;
    margin: 0 auto;
    padding-top: 0.15rem;
    margin-bottom: 1rem;
  }

  .order_sub_list1 {
    background: #F8F8F8;

  }

  .order_sub_list1 img {
    float: left;
    vertical-align: middle;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 20px;
  }

  .order_sub_list1 .sub_con1 {

    /* float: right; */
    height: 1rem;
    line-height: 1rem;
    margin-left: 2rem;
    font-size: 0.29rem;
  }

  .order_sub_list1 li {
    list-style: none;
    border-bottom: 0.2rem solid #fff;
    padding: 0.1rem 0.3rem;
    overflow: hidden;
  }

  .order_sub_list1 .sub_con1 span:nth-child(2) {
    float: right;
    color: #333333;
    font-size: 0.29rem;
  }

  .number1 {
    font-size: 0.2rem;
    color: #888;
    margin-top: -0.4rem;
  }

  .shiji1 {

    background: #F8F8F8;
    border-bottom: 0.1rem solid #fff;
    color: #333333;

    line-height: 0.8rem;
    padding: 0 0.3rem;
  }

  .smallHe1 {
    float: right;
    color: #333333;
  }

  .smallHe1 span {
    color: red
  }

  .footerBox {
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 0.35rem;
    width: 100%;
    height: 1rem;
    background: #fff;
  }

  .totalHe {
    display: inline-block;
    margin-left: 2rem;
    /* margin: auto; */
    margin-top: 0.4rem;
    margin-left: 2rem;
  }

  .totalHe span {
    color: red
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

  .shiji1 p {
    font-size: 0.2rem;
  }

  .orderId {
    float: right;
  }

  .heard {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }

  #textarea {
    color: #333333;
    opacity: 1;
    -webkit-text-fill-color: #333333;
  }
</style>
