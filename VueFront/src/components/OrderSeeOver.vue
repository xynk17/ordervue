<template>
  <div class="see_no">

    <div class="sno_list" @click="details(itme)" v-for="(itme,index) in foodOrder" :Key='index'>
      <div class="sno_list_tit">
        <span style='font-weight:700;font-size:0.5rem'>番号：{{itme.order.id}}</span>
      </div>
      <div class="sno_list_tit">
        <span>注文番号：{{itme.order.order_num}}</span>
      </div>
      <div class="sno_list_con">
        <div class="sno_img">
          <img :src="itme.order.logo" alt="">
        </div>
        <div class="sno_list_title">
          <div class="title_name">
           {{itme.order.store_name}}
          </div>
          <div class="title_time">
            {{itme.order.time}}
          </div>
        </div>
        <div class="sno_img_right">
          <img src="../assets/img/blackjt.png" alt="">
        </div>
      </div>
      <div class="sno_list_bot">
        <span>{{itme.good[0].name}}</span>&nbsp;&nbsp;
        <span>等{{itme.num}}件商品</span>
        <span>￥{{itme.order.money}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OrderSeeNo',
    data() {
      return {

      }
    },
    props:{
      foodOrder:{
        type:Array,
      }
    },
    mounted(){
      console.log(this.foodOrder)
    },
    methods: {
     details(itme){
        this.$router.push({
          name: 'OrderDetals',
          query:{
            id:itme.order.id
          }
        })
      }
    }
  }
</script>

<style>
  .sno_list {
    background-color: #FFFFFF;
    padding: 0.32rem 0.24rem 0;
    margin-bottom: 0.2rem;
    border-bottom: 1px solid #E3E3E3;
  }

  .sno_list_tit {
    font-size: 0.28rem;
    color: #000000;
  }

  .sno_list_con {
    padding: 0.1rem 0;
    border-top: 1px solid #E3E3E3;
  }

  .sno_img {
    display: inline-block;
    vertical-align: middle;
  }

  .sno_img img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 5px;
    margin-right: 0.2rem;
  }

  .sno_list_title {
    display: inline-block;
    width: 5.4rem;
    vertical-align: middle;
  }

  .title_name {
    font-size: 0.32rem;
    font-weight: bold;
  }

  .title_time {
    font-size: 0.22rem;
    color: #999999;
  }

  .sno_img_right {
    display: inline-block;
    vertical-align: middle;
  }

  .sno_img_right img {
    width: 0.4rem;
    height: 0.4rem;
  }
  .sno_list_bot{
    border-bottom: 1px solid #EEEEEE;
    border-top: 1px solid #EEEEEE;
    padding: 0.12rem 0 0.12rem 1rem;
    font-size: 0.3rem;
  }
  .sno_list_bot span:last-child{
    float: right;
    font-weight: bold;
  }
</style>
