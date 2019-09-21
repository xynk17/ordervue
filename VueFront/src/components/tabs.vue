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
            <div class="vip">
              <div v-if="item.money!=0">
                <b style="font-size:0.3rem;color:black;">S</b>
                <span style="font-size:0.2rem;color:black">号杯</span>
                <b style="font-size:0.2rem;color:red">￥{{item.money}}</b>
                <p class="price">
                  <span class="ding">
                    <el-collapse-transition name=".el-zoom-in-center">
                      <span class="priceBox" v-show="item.counts>0">
                        <i class="el-icon-remove-outline fuhao" @click="dropJ(item,foods,'s')"></i>
                        <span style="color:#888">{{item.counts?item.counts:''}}</span>
                      </span>
                    </el-collapse-transition>
                    <i class="el-icon-circle-plus fuhao" @click="drop($event,item,foods,'s')"></i>
                  </span>
                </p>
              </div>
              <div v-if="item.money2!=0">
                <b style="font-size:0.3rem;color:black">M</b>
                <span style="font-size:0.2rem;color:black">号杯</span>
                <b style="font-size:0.2rem;color:red">￥{{item.money2}}</b>
                <p class="price">
                  <span class="ding">
                    <el-collapse-transition name=".el-zoom-in-center">
                      <span class="priceBox" v-show="item.countm>0">
                        <i class="el-icon-remove-outline fuhao" @click="dropJ(item,foods,'m')"></i>
                        <span style="color:#888">{{item.countm?item.countm:''}}</span>
                      </span>
                    </el-collapse-transition>
                    <i class="el-icon-circle-plus fuhao" @click="drop($event,item,foods,'m')"></i>
                  </span>
                </p>
              </div>
              <div v-if="item.dn_money!=0">
                <b style="font-size:0.3rem;color:black">L</b>
                <span style="font-size:0.2rem;color:black">号杯</span>
                <b style="font-size:0.2rem;color:red">￥{{item.dn_money}}</b>
                <p class="price">
                  <span class="ding">
                    <el-collapse-transition name=".el-zoom-in-center">
                      <span class="priceBox" v-show="item.countl>0">
                        <i class="el-icon-remove-outline fuhao" @click="dropJ(item,foods,'l')"></i>
                        <span style="color:#888">{{item.countl?item.countl:''}}</span>
                      </span>
                    </el-collapse-transition>
                    <i class="el-icon-circle-plus fuhao" @click="drop($event,item,foods,'l')"></i>
                  </span>
                </p>
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
            <div class="vip">
              <div v-if="item.money!=0">
                <b style="font-size:0.3rem;color:black;">S</b>
                <span style="font-size:0.2rem;color:black">号杯</span>
                <b style="font-size:0.2rem;color:red">￥{{item.money}}</b>
                <p class="price">
                  <span class="ding">
                    <el-collapse-transition name=".el-zoom-in-center">
                      <span class="priceBox" v-show="item.counts>0">
                        <i class="el-icon-remove-outline fuhao" @click="dropJ(item,foods,'s')"></i>
                        <span style="color:#888">{{item.counts?item.counts:''}}</span>
                      </span>
                    </el-collapse-transition>
                    <i class="el-icon-circle-plus fuhao" @click="drop($event,item,foods,'s')"></i>
                  </span>
                </p>
              </div>
              <div v-if="item.money2!=0">
                <b style="font-size:0.3rem;color:black">M</b>
                <span style="font-size:0.2rem;color:black">号杯</span>
                <b style="font-size:0.2rem;color:red">￥{{item.money2}}</b>
                <p class="price">
                  <span class="ding">
                    <el-collapse-transition name=".el-zoom-in-center">
                      <span class="priceBox" v-show="item.countm>0">
                        <i class="el-icon-remove-outline fuhao" @click="dropJ(item,foods,'m')"></i>
                        <span style="color:#888">{{item.countm?item.countm:''}}</span>
                      </span>
                    </el-collapse-transition>
                    <i class="el-icon-circle-plus fuhao" @click="drop($event,item,foods,'m')"></i>
                  </span>
                </p>
              </div>
              <div v-if="item.dn_money!=0">
                <b style="font-size:0.3rem;color:black">L</b>
                <span style="font-size:0.2rem;color:black">号杯</span>
                <b style="font-size:0.2rem;color:red">￥{{item.dn_money}}</b>
                <p class="price">
                  <span class="ding">
                    <el-collapse-transition name=".el-zoom-in-center">
                      <span class="priceBox" v-show="item.countl>0">
                        <i class="el-icon-remove-outline fuhao" @click="dropJ(item,foods,'l')"></i>
                        <span style="color:#888">{{item.countl?item.countl:''}}</span>
                      </span>
                    </el-collapse-transition>
                    <i class="el-icon-circle-plus fuhao" @click="drop($event,item,foods,'l')"></i>
                  </span>
                </p>
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
    drop(event, id, foods,size) {
      let key=`count${size}`
      if (!id[key]) {
        this.$set(id, key, 1);
      } else { 
       id[key]++;
        this.$set(id, key, id[key]);
      }
      console.log(id[key])
      this.$emit("drop", id, this.names, event);
    },
    //在页面减少产品数量
    dropJ(id, foods,size) {
      let key=`count${size}`
       id[key]--;
      if (id[key] < 0) {
        id[key] = 0;
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
