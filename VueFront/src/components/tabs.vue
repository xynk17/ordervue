<template>
  <div>
    <el-card :body-style="{ padding: '0px' }" v-for="(item,index) in foods " :key="index">
      <el-row v-if="showw">
        <el-col :span="6">
          <img :src="item.logo" class="image" />
        </el-col>
        <el-col :span="18">
          <div style="padding: 14px 10px 14px 30px;" class="right-content">
            <span class="title">{{item.name}}</span>
            <!--<p class="intro">月销{{item.sales}}笔</p>-->
            <div class="vip">
              <div class="price">
                <span>￥{{item.money}}</span>
                <span class="ding">
                  <el-collapse-transition name=".el-zoom-in-center">
                    <span class="priceBox" v-show="item.count>0">
                      <i class="el-icon-remove-outline fuhao" @click="dropJ(item,foods)"></i>
                      <span style="color:#888">{{item.count?item.count:''}}</span>
                    </span>
                  </el-collapse-transition>
                  <i class="el-icon-circle-plus fuhao" @click="drop($event,item,foods)"></i>
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="!showw">
        <el-col :span="6">
          <img :src="item.logo" class="image" />
        </el-col>
        <el-col :span="18">
          <div style="padding:13px 5px 14px 20px" class="right-content">
            <span class="title">{{item.name}}</span>
            <span class="hot">大人気</span>
            <p class="intro">{{item.content}}</p>
            <div>
              <!--<span class="intro">月销{{item.sales}}笔</span>-->
              <!--<span class="send">{{item.start_num}}份起送</span>-->
            </div>
            <div class="vip">
              <span class="vip-left">
                <img src="../assets/img/huang.png" alt />WEB注文限定
              </span>
              <span class="vip-price">￥{{item.vip_money}}</span>
              <div class="price">
                <span>￥{{item.money}}</span>
                <span class="ding">
                  <el-collapse-transition name=".el-zoom-in-center">
                    <span class="priceBox" v-show="item.count>0">
                      <i class="el-icon-remove-outline fuhao" @click="dropJ(item,foods)"></i>
                      <span style="color:#888">{{item.count?item.count:''}}</span>
                    </span>
                  </el-collapse-transition>
                  <i class="el-icon-circle-plus fuhao" @click="drop($event,item,foods)"></i>
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "tabs",
  data() {
    return {
      count: 0
    };
  },
  props: {
    foods: {
      type: Array,
      default: function() {
        return [];
      }
    },
    names: {
      type: String,
      default: ""
    },
    showw: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    //在页面增加产品数量
    drop(event, id, foods) {
      if (!id.count) {
        this.$set(id, "count", 1);
      } else {
        id.count++;
        this.$set(id, "count", id.count);
      }
      this.$emit("drop", id, this.names, event);
    },
    //在页面减少产品数量
    dropJ(id, foods) {
      id.count--;
      if (id.count < 0) {
        id.count = 0;
      }
      this.$emit("dropj", id, this.names);

     }
  }
};
</script>

<style>
.ding {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
