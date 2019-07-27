<template>
	<div class="navbar" ref="navbar">
		<mt-tabbar v-model="selected" fixed>
			<mt-tab-item id="Home">
				<img slot="icon" src="../assets/img/tabindexf.png" v-if="this.selected == 'Home' ">
				<img slot="icon" src="../assets/img/tabindex.png" v-else >
				首页
			</mt-tab-item>
			<mt-tab-item id="Order">
				<img slot="icon" src="../assets/img/tabddf.png" v-if="this.selected == 'Order' ">
				<img slot="icon" src="../assets/img/tabdd.png" v-else >
				开始点餐
			</mt-tab-item>
			<mt-tab-item id="OrderSee">
				<img slot="icon" src="../assets/img/tabmyf.png" v-if="this.selected == 'OrderSee' ">
				<img slot="icon" src="../assets/img/tabmy.png" v-else >
				订单查看
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	export default {
		name:'Navbar',
		data() {
			return {
				//选中的tabbar值message为外面页面传入的值selected
				selected:'selected'
			};
		},
		props:{
			store_id:{
				type:String
			},
			names:{
				type:String
			} 
		},
// 		props:['selected'],
		created(){
			// 将数据放在当前组件的数据内
			this.selected = this.$route.name;
			// console.log(this.selected)
// 			this.$axios({
//
// 			})
		},
		watch: {
			// 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
			'$router': 'getParams',

			selected: function(val,oldVal){
				 // 这里就可以通过 val 的值变更来确定去向
            switch(val){
                case 'Home':
                    this.$router.push({
						path: '/Home',
						name:'Home'
					});
                break;
                case 'Order':
                   	this.$router.push({
					name: 'Order',
					query:{
						store_id:this.store_id,
					}
				})
                break;
                case 'OrderSee':
                    this.$router.push({
						name: 'OrderSee',
						query:{
						store_id:this.store_id,
					}
					});
                break;
            }


			}
		}
	}
</script>

<style>
	.navbar{
		height: 0.98rem;
	}
	.mint-tabbar{
		background-color: #FFFFFF;
		height: 0.88rem;
	}
	.mint-tab-item-label{
		font-size: 0.24rem;
	}
	.mint-tabbar .mint-tab-item.is-selected{
		color: #649CFF !important;
		background: none !important;
	}
	.mint-tab-item-label{
		margin-top: -3px;
	}
	.mint-tab-item{
		padding: 2px 0;
	}

</style>
