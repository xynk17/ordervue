<template>
  <div class="hello">
    <img src="../assets/img/bg.jpg" alt="">
    <div class="btn_img" @click="next">
      跳过{{count}}s
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        count: '3',
      }
    },
    created() {
      this.go()
    },
    methods: {
      go() {
        let store_id=this.$url_params.getUrlKey("store_id");
        sessionStorage.setItem("store_id", store_id);
        //sessionStorage.setItem("store_id", '3');
        const TIME_COUNT = 3;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
              //跳转的页面写在此处
              this.$router.push({
                name: 'Home',
                path: '/Home',
              });
            }
          }, 1000)
        }
      },
      next() {
        this.$router.push({
          name: 'Home',
          path: '/Home',
        });
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .hello img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
  .btn_img{
    color: #FFFFFF;
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    width: 1rem;
    height: 0.4rem;
    background: rgba(225,225,225,0.3);
    border-radius: 10px;
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.24rem;
  }
</style>
