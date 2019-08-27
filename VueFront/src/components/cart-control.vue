<!-- 购物车控制 ( - num + ) 组件 -->

<template>
  <div class="cart-control">
    <transition name="move">
      <div class="decrease" @click.stop.prevent="decrease($event)">
        <i v-if="this.food[keys] > 0" class="el-icon-remove"></i>
        <i v-else class="el-icon-remove-outline"></i>
      </div>
    </transition>

    <div class="num">{{ this.food[keys] }}</div>

    <div class="add" @click.stop.prevent="add($event)">
      <i class="el-icon-circle-plus"></i>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  components: {},
  data() {
    return {
      num: ""
    };
  },
  props: {
    // 操作哪个商品
    food: {
      type: Object
    },
    keys:{
      type:String
    }
  },
  watch: {},
  methods: {
    decrease(event) {
      // 解决移动端响应两次点击事件的问题
      // if (!event._constructed) {
      //     return
      // }
      if (this.food[this.keys] <= 0) {
        this.food[this.keys] = 0;
        return;
      }
      this.food[this.keys]--;
      //this.$emit("changeNum", this.food.count, this.food.name);
      this.$emit("changeNum", this.food,this.keys);
    },
    add(event) {
      // 解决移动端响应两次点击事件的问题
      // if (!event._constructed) {
      //   return
      // }
      // 修改对象的一个不存在的属性时（this.food.count = 1），DOM 不会更新
      // 需要使用 Vue.set()
      this.food[this.keys]++;
      // 将当前 dom 传递出去，用来做小球飞入效果
      //this.$emit("changeNum", this.food.count, this.food.name);
      this.$emit("changeNum", this.food,this.keys)
    }
  }
};
</script>

<style lang="scss" scoped>
// @import '~@/assets/scss/const.scss';
// @import '~@/assets/scss/mixin.scss';

.cart-control {
  font-size: 0.3rem;
  line-height: 53px;
  .decrease,
  .add {
    display: inline-block;
    padding: 0.05rem;
    i {
      font-size: 0.3rem;
      color: #00a0dc;
      display: inline-block;
    }
  }
  .num {
    display: inline-block;
    padding: 0.05rem;
    font-size: 0.3rem;
    text-align: center;
    color: rgb(147, 153, 159);
    vertical-align: top;
  }
}

.move-enter-active,
.move-leave-active {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: all 0.4s;
  i {
    transform: rotate(0);
    transition: all 0.4s;
  }
}
.move-enter,
.move-leave-to {
  opacity: 0;
  transform: translate3d(24px, 0, 0);
  transition: all 0.4s;
  i {
    transform: rotate(360deg);
    transition: all 0.4s;
  }
}
</style>
