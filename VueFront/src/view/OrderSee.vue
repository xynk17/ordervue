<template>
  <div class="ordersee">
    <div class="heard">
      <mt-header title="注文確認">
      </mt-header>
    </div>
    <div class="order_see_tit">
      <!--<mt-navbar v-model="orderSelected">-->
        <!--&lt;!&ndash;<mt-tab-item id="1">未支払</mt-tab-item>&ndash;&gt;-->
        <!--&lt;!&ndash;<mt-tab-item id="2">支払済</mt-tab-item>&ndash;&gt;-->
      <!--</mt-navbar>-->
      <div class="swriper">
        <mt-swipe :auto="4000">
         <mt-swipe-item v-for='(item,index) in imgList' :key='index'>
					<img :src="item" alt="">
				</mt-swipe-item>
        </mt-swipe>
      </div>
      <mt-tab-container v-model="orderSelected">
        <mt-tab-container-item id="1">
          <OrderSeeNo v-if='OrderSeeNoList.length>0' :foodOrder='OrderSeeNoList'></OrderSeeNo>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <OrderSeeOver  v-if='OrderSeeOverList.length>0' :foodOrder='OrderSeeOverList' ></OrderSeeOver>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <navbar :selected='selected' :id='this.$route.query.store_id'></navbar>
  </div>
</template>

<script>
  import Navbar from '../components/Nav.vue'
  import OrderSeeNo from '../components/OrderSeeNo.vue'
  import OrderSeeOver from '../components/OrderSeeOver.vue'
  import baseUrl from '../Unitls/ip'
  export default {
    name: 'OrderSee',
    data() {
      return {
        selected: 'OrderSee',
        orderSelected: '1',
        OrderSeeNoList:[],
        OrderSeeOverList:[],
         imgList:["http://www.shibaorder.com/attachment/images/2/2019/06/AJ4JUjJxJbJBjJxzUgby9JZjSHsCXj.jpg","http://www.shibaorder.com/attachment/images/2/2019/06/AJ4JUjJxJbJBjJxzUgby9JZjSHsCXj.jpg"]
      }
    },
    components: {
      Navbar,
      OrderSeeNo,
      OrderSeeOver
    },
    mounted(){
      console.log(this.$route.query.store_id)
      this.ClickWill()
    },
    watch:{
    orderSelected:{
      handler(val,old){
            if(val=="1"){
           this.ClickWill()
        }else if(val=='2'){
           this.ClickDone()

        }

      }
    }
    },
    methods:{
      //待发货
      ClickWill(){
        this.$axios({
					url:  baseUrl.baseUrl+'/app/index.php',
				  method: 'post',
				 	params: {
					 i:'2',
           t:'0',
           v:'5.9.8',
           from:'wxapp',
           c:'entry',
           a:'wxapp',
           do:'MyOrder',
           m:'zh_cjdianc',
           dn_state:'',
           state:'2',
           user_id:localStorage.getItem('UserId'),
           page:'1',
           pagesize:'10'
					  }
			   	})
				.then(res =>{
          this.OrderSeeNoList=res.data
            console.log(this.OrderSeeNoList,22)
				})
      },
      //待收货
      ClickDone(){
         this.$axios({
					url:  baseUrl.baseUrl+'/app/index.php',
				  method: 'post',
				 	params: {
					 i:'2',
           t:'0',
           v:'5.9.8',
           from:'wxapp',
           c:'entry',
           a:'wxapp',
           do:'MyOrder',
           m:'zh_cjdianc',
           dn_state:'',
           state:'3',
           user_id:localStorage.getItem('UserId'),
           page:'1',
           pagesize:'10'
					  }
			   	})
				.then(res =>{
          this.OrderSeeOverList=res.data
          console.log(this.OrderSeeOverList,22)
				})
      },
    }
  }
</script>

<style>
  @import '../assets/css/index.css';

  .order_see_tit .mint-navbar .mint-tab-item-label {
    font-size: 0.26rem;
  }

  .order_see_tit .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 1px solid;
  }

  .order_see_tit .mint-tab-container {
    margin-top: 0.16rem;
  }

  .ordersee .swriper {
    height: 3.5rem;
    width: 100%;
    margin-top: 1rem
  }

  .ordersee .swriper img {
    width: 100%;
  }
  .order_see_tit .mint-navbar{
    position: fixed;
    top: 0.88rem;
    left: 0;
    height: 0.88rem;
    width: 100%;
    z-index: 999;
  }
  .heard{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index:999;
  }
</style>
