<!-- 购物车 组件 -->
<template>
  <div class="shopcart">
    <!-- 购物车 -->
    <div class="content">
      <!-- 主要内容 -->
      <div class="main-content" @click="toggleList">
        <div class="left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'logoLight': totalCount > 0}">
              <i class="el-icon-shopping-cart-2"></i>
              <div class="totalCount" v-show="totalCount > 0">{{ totalCount }}</div>
            </div>
          </div>
          <div class="price" :class="{'priceLight':totalCount > 0}">{{totalCount > 0?'￥'+totalPrice:'カートに商品なし' }}</div>
        </div>

        <div class="right" @click.stop="pay">
          <div class="pay" :class="{'payLight': this.totalPrice >0}">次へ</div>
        </div>
      </div>

      <!-- 飞行小球 -->
      <div class="ball-content">
        <div v-for="(ball,index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>

      <!-- 购物车列表 -->
      <transition name="fold" v-if="selectFoods.length!=0">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">
              <i class="gun"></i>
              ショッピングカート
            </h1>
            <span class="empty" @click="empty">
              <i class="el-icon-delete">&emsp;</i>クリア
            </span>
          </div>

          <div class="list-content" ref="listContentRef">
            <ul>
              <li class="food" v-for="(food,index) in selectFoodsList" :key="index" v-if="food.count>0">
                <div>
                  <span class="name">{{ food.name }}</span>
                  <div class="price">
                    <span>￥{{ food.money * food.count }}</span>
                  </div>
                  <div class="control">
                    <cart-control :food="food" @changeNum="changeNum"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>

    <!-- 模糊背景 -->
    <transition name="fade">
      <div class="background" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
  import CartControl from "@/components/cart-control";
  import BScroll from "better-scroll";
  import {
    MessageBox
  } from "mint-ui";

  export default {
    components: {
      CartControl
    },
    data() {
      return {
        //选择的食物列表
        selectFoodsList: [],
        // 每个小球当前的状态
        balls: [{
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        // 已经下落的小球（show = true）
        dropBalls: [],
        // 购物车列表是否折叠
        listShow: false
      };
    },
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      x: {
        type: Number
      },
      y: {
        type: Number
      },
      // 配送费
      deliveryPrice: {
        type: Number,
        default: 0
      },
      // 起送费
      minPrice: {
        type: Number,
        default: 30
      }
    },
    watch: {
      selectFoods() {
        if (this.scroll) {
          this.scroll.refresh();
        }
      }
    },
    methods: {
      //改变商品个数
      changeNum(num, name) {
        //赋值给this.selectFoodsList
        for (var i = 0; i < this.selectFoodsList.length; i++) {
          if (this.selectFoodsList[i].name == name) {
            this.selectFoodsList[i].count = num;
          }
        }
        this.$emit("change", num, name);
      },
      // 点击 + 派发的事件
      // 取一个未下落的小球执行接下来的下落动作
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      // 对 show = true 的小球设置动作
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            // let rect =el.getBoundingClientRect()
            // let x = rect.left - 32
            // let y = -(window.innerHeight - rect.top - 22)
            el.style.display = "";
            el.style.webkitTransform = `translate3d(0,${this.y}px,0)`;
            el.style.transform = `translate3d(0,${this.y}px,0)`;

            let inner = el.getElementsByClassName("inner-hook")[0];
            inner.style.webkitTransform = `translate3d(${this.x}px,0,0)`;
            inner.style.transform = `translate3d(${this.x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; // 重绘，否则小球不会消失
        this.$nextTick(() => {
          el.style.webkitTransform = "translate3d(0,0,0)";
          el.style.transform = "translate3d(0,0,0)";

          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = "translate3d(0,0,0)";
          inner.style.transform = "translate3d(0,0,0)";

          el.addEventListener("transitionend", done);
        });
      },
      // 动作做完就把该小球 show=false
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = "none";
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }

        this.listShow = !this.listShow;

        // 初始化 better-scroll
        if (this.listShow) {
          // setTimeout
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContentRef, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          }, 20);
        }
      },
      // 支付 提交订单
      pay() {
        console.log(this.totalPrice)
        if (this.totalPrice == '0') {
          // mint UI
          MessageBox("INFO", "お好きな商品を選択してください");
          return;
        }
        this.$router.push({
          name: 'OrderSub',
          })
        localStorage.setItem('list',JSON.stringify(this.selectFoodsList))
        localStorage.setItem('total',this.totalPrice)
      },
      // 清空
      empty() {
        Array.isArray(this.selectFoods) &&
          this.selectFoods.forEach(food => {
            food.count = 0;
          });

        this.listShow = false;
      },
      hideList() {
        this.listShow = false;
      }
    },
    filters: {},
    computed: {
      // 所选商品总价
      totalPrice() {
        let total = 0;
        Array.isArray(this.selectFoodsList) &&
          this.selectFoodsList.forEach(food => {
            total += food.money * food.count;
          });
        return total;
      },
      // 所选商品总数量
      totalCount() {
        let total = 0;
        Array.isArray(this.selectFoodsList) &&
          this.selectFoodsList.forEach(food => {
            total += food.count;
          });
        return total;
      },
      // 20元起送 、 还差10元起送 、 去结算
      payDesc() {
        if (this.totalPrice === 0) {
          return `${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          return `还差${this.minPrice - this.totalPrice}元起送`;
        } else {
          return "去结算";
        }
      }
    },
    mounted() {
      this.selectFoodsList = this.selectFoods;
    },
    destroyed() {}
  };
</script>

<style lang="scss" scoped>
  // @import '~@/assets/scss/const.scss';
  // @import '~@/assets/scss/mixin.scss';

  .shopcart {
    .content {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 48px;
      z-index: 50;

      .main-content {
        display: flex;
        width: 100%;
        height: 48px;
        font-size: 0.7rem;
        background-color: #141d27;

        .left {
          flex: 1;
          background: #fff;

          .logo-wrapper {
            display: inline-block;
            padding-left: 0.2rem;

            .logo {
              & i {
                color: #333;
              }
            }

            .logoLight {
              color: #00a0dc;

              & i {
                color: #00a0dc;
              }
            }

            .totalCount {
              position: absolute;
              left: 0.6rem;
              top: 1px;
              width: 0.4rem;
              height: 0.4rem;
              line-height: 0.4rem;
              border-radius: 50%;
              font-size: 0.24rem;
              font-weight: 700;
              color: rgb(240, 20, 20);
              background-color: #fff;
              border: 2px solid #00a0dc;
              line-height: 0.4rem;
              text-align: center;
            }
          }

          .price {
            display: inline-block;
            box-sizing: border-box;
            margin-top: 10px;
            padding-left: 0.6rem;
            vertical-align: top;
            font-size: 18px;
            line-height: 24px;
            font-weight: 500;
            color: #999;

            // border-right: 1px solid rgba(255, 255, 255, 0.1);
            &.priceLight {
              color: red;
            }
          }

          .desc {
            display: inline-block;
            vertical-align: top;
            line-height: 24px;
            margin: 12px 0 0 12px;
            font-size: 10px;
            color: rgba(255, 255, 255, 0.4);
          }
        }

        .right {
          flex: 0 0 105px;
          width: 105px;
          text-align: center;

          .pay {
            height: 48px;
            line-height: 48px;
            font-size: 0.3rem;
            font-weight: 400;
            color: #fff;
            background-color: gray;

            &.payLight {
              background-color: #00a0dc;
              color: #ffffff;
            }
          }
        }

        // 适配 iPhone 5
        @media screen and (max-width: 320px) {
          .right {
            flex: 0 0 80px;
            width: 80px;
            text-align: center;
          }
        }
      }

      // 飞行小球
      .ball-content {
        .ball {
          position: fixed;
          left: 32px;
          bottom: 22px;
          z-index: 200;
          // http://cubic-bezier.com
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        }

        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #34aaff;
          transition: all 2s linear;
        }
      }

      // 购物车列表
      .shopcart-list {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        transform: translate3d(0, -100%, 0);

        &.fold-enter-active,
        &.fold-leave-active {
          transition: all 0.5s;
        }

        &.fold-enter,
        &.fold-leave-active {
          transform: translate3d(0, 0, 0);
        }

        .list-header {
          height: 40px;
          line-height: 40px;
          padding: 0 18px;
          background-color: #ececff;
          //border-bottom: 1px solid rgba(7, 17, 27, 0.1);

          .title {
            float: left;
            font-size: 0.25rem;
            position: relative;

            .gun {
              display: inline-block;
              height: 23px;
              width: 0.1rem;
              background: #00a0dc;
              margin: 8px 0.1rem;
              position: absolute;
              top: 1px;
              left: -0.24rem;
            }
          }

          .empty {
            float: right;
            font-size: 0.25rem;
            color: #888;
          }
        }

        .list-content {
          max-height: 217px;
          padding: 0 18px;
          background-color: #fff;
          overflow: hidden;

          .food {
            position: relative;
            padding: 12px 0;
            box-sizing: border-box;

            // border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .name {
              line-height: 24px;
              font-size: 14px;
              color: rgb(7, 17, 27);
            }

            .price {
              position: absolute;
              right: 95px;
              bottom: 12px;
              line-height: 24px;
              font-size: 14px;
              font-weight: 700;
              color: rgb(240, 20, 20);
            }

            .control {
              position: absolute;
              right: 0;
              bottom: -5px;
            }
          }
        }
      }
    }

    // 模糊背景
    .background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 40;
      opacity: 1;
      backdrop-filter: blur(10px);
      background-color: rgba(7, 17, 27, 0.6);

      &.fold-enter-active,
      &.fold-leave-active {
        transition: all 0.5s;
      }

      &.fold-enter,
      &.fold-leave-active {
        opacity: 0;
        background: rgba(7, 17, 27, 0);
      }
    }
  }
</style>
