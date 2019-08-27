<template>
  <div class="order_sub">
    <div class="heard">
      <mt-header title="注文詳細">
        <router-link to="/OrderSee" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <!-- <div style="height: .9rem;"></div> -->
    <div class="order_sub_code" v-for="(itme,index) in this.$route.query.res.data.data.goods">
      <div class="order_sub_code_tit">
        <img :src="itme.logo" alt="" v-if="itme.logo !==''">
        <img src="../assets/img/no.jpg" alt="" class="order_sub_code_div" v-else>
        <span>{{itme.name}}</span>
        <span style="float: right;">￥{{itme.money}}</span>
      </div>
      <div class="order_barcode">
        <!-- <img id="barcode"/> -->
        <svg class="barcode" jsbarcode-format="CODE128" :jsbarcode-value="itme.bar_code" jsbarcode-textmargin="0"
          jsbarcode-fontoptions="bold">
        </svg>
      </div>
    </div>
    <div class="swriper1">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for='(item,index) in imgList' :key='index'>
          <img :src="item" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="order_details_bottom">
      <span>決済金額</span>
      <span class="span_right">合計：￥{{this.$route.query.res.data.data.money_sum}}</span>
    </div>
  </div>
</template>

<script>
  import baseUrl from '../Unitls/ip'
  import JsBarcode from 'jsbarcode'
  export default {
    name: 'OrderSub',
    data() {
      return {
        id: this.$route.query.id,
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
      this.code()
      // this.$axios({
      //     url: Url.Url + '/orderapi/',
      //     method: 'get',
      //     params: {
      //       i: '2',
      //       t: '0',
      //       v: '5.9.8',
      //       from: 'wxapp',
      //       c: 'entry',
      //       a: 'wxapp',
      //       do: 'OrderInfo',
      //       m: 'zh_cjdianc',
      //       order_id: this.$route.query.id
      //     }
      //   })
      // 修改

    },
    methods: {

      code() {
        console.log(this.$route.query.res.data.data.goods)
        //         JsBarcode("#barcode", " ", {
        //
        //           format: "CODE128", //选择要使用的条形码类型
        //
        //           text: '123131',
        //
        //
        //           displayValue: true, //是否在条形码下方显示文字
        //
        //           textPosition: "bottom" //设置文本的垂直位置
        //
        //         })
        JsBarcode(".barcode").init();
      }
    },
  }
</script>

<style>
  @import '../assets/css/index.css';
  .swriper1 {
    height: 3rem;
    margin-bottom: 1rem;
  }

  .swriper1 img {
    width: 100%;
    height: 105%;
  }
  .barcode{
    width: 100%;
    text-align: center;
  }

  .order_sub_code{
    width: 100%;
    /* height: 5rem; */
    margin-top: .24rem;
    background: #90939936;
  }
  .order_sub_code_tit {
    height: 1rem;
    font-weight: bold;
    padding-right: .2rem;
    padding-top: .1rem;
    padding-left: .1rem;
  }
  .order_sub_code_tit img{
    width: .6rem;
    height: .6rem;
    display: inline;
    vertical-align: middle;
    margin-right: .2rem;
  }
  .order_sub_code_div{
    width: .6rem;
    height: .6rem;
    display: inline;
    vertical-align: middle;
  }
  .order_details_bottom{
    position: fixed;
    bottom: 0;
    height: .8rem;
    width: 100%;
    background-color: #FFFFFF;
    line-height: .8rem;
    padding: 0 .2rem;
    font-size: .3rem;
    font-weight: bold;
  }
  .order_details_bottom .span_right{
    float: right;
    padding-right: .4rem;
  }

</style>
