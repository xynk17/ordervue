<template>
	<div class="home">
		<div class="heard">
			<mt-header :title="list.name">
			</mt-header>
		</div>
		<div class="swriper">
			<mt-swipe :auto="4000">
				<mt-swipe-item v-for="(item,index) in bannerList" :key="index">
					<img @click="src(item)" :src="item.logo" alt="">
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="business">
			<div class="title">
				<img src="../assets/img/seller_info_img.png" alt="">
				<div>ようこそ</div>
			</div>
			<div class="con">
				<div class="img">
					<img :src="list.logo" alt="">
				</div>
				<div class='orderBox'>
				<div class="con_til">{{list.name}}</div>
				<div class="con_left" @click="diancan">
					注文開始
				</div>
				</div>
			</div>
		</div>
		<div class="milk" v-for=" (item,index) in guangao" :key="index">
			<div class="milk_img">
				<img :src="item.img" alt="">
			</div>
			<div class="milk_tit">
				<div>{{item.title}}</div>
				<div>{{item.desc}}</div>
			</div>
		</div>
		<navbar :selected="selected" :store_id='list.id'></navbar>
	</div>
</template>
<script>
	import Navbar from '../components/Nav.vue'
	import baseUrl from '../Unitls/ip'
	export default {
		name: 'Home',
		data() {
			return {
				selected: 'Home',
        bannerList: [],
        list: {},
		guangao:[
			{
				img: require('../assets/img/bg.jpg'),
				title:"这是一个广告标题",
				desc:"这是一个广告的内容这是一个广告的内容这是一个广告的内容这是一个广告的内容这是一个广告的内容这是一个广告的内容这是一个广告的内容"
			},
			{
				img: require('../assets/img/bg.jpg'),
				title:"这是一个广告标题",
				desc:"这是一个广告的内容这是一个广告的内容这是一个广告的内容这是一个广告的内容这是一个广告的内容这是一个广告的内容这是一个广告的内容"
			},
			{
				img: require('../assets/img/bg.jpg'),
				title:"这是一个广告标题",
				desc:"这是一个广告的内容这是一个广告的内容这是一个广告的内容这是一个广告的内容这是一个广告的内容这是一个广告的内容这是一个广告的内容"
			}
		]
			}
		},
		mounted() {
			this.banner()
			this.milkList()

		},
		methods: {
			banner() {
				this.$axios({
					url: baseUrl.baseUrl+'/app/index.php',
					method: 'get',
					params: {
						i: '2',
						t: '0',
						v: '5.9.8',
						from: 'wxapp',
						c: 'entry',
						a: 'wxapp',
						do: 'ad',
						m: 'zh_cjdianc',
						type: '2',
					}
				})
				.then(res =>{
					this.bannerList = res.data
				})
			},
			milkList() {
				this.$axios({
					url:  baseUrl.baseUrl+'/app/index.php',
					method: 'get',
					params: {
						i: '2',
						t: '0',
						v: '5.9.8',
						from: 'wxapp',
						c: 'entry',
						a: 'wxapp',
						do: 'StoreInfo',
						m: 'zh_cjdianc',
						store_id: sessionStorage.getItem('store_id'),
					}
				})
				.then(res =>{
					this.list = res.data.store
				})
			},
      src(index) {
        window.open(index.src2)
      },
			diancan() {
				this.$router.push({
					name: 'Order',
				})
			}
		},
		components: {
			Navbar
		}
	}
</script>

<style>
	@import '../assets/css/index.css';

	.swriper {
		height: 3.5rem;
		margin-top:0.9rem;
	}

	.swriper img {
		width: 100%;
	}

	.business {
		background: #FFFFFF;
		margin-top: 0.2rem;
		padding: 0.2rem 0.3rem 0;
		box-sizing: border-box;
	}

	.business .title {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #666;
	}

	.business .title img {
		width: 0.4rem;
		height: 0.4rem;
		margin-right: 0.2rem;
	}

	.business .con {
		height: auto;
		padding: 0.2rem 0;
		border-bottom: 1px solid #E5E5E5;
	}

	.business .con div {
		display: inline-block;
		vertical-align: middle;
	}

	.business .con .img {
		width: 25%;
		height: 100%;
	}

	.business .con .img img {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 5px;
	}

	.business .con .con_til {
		height: 1rem;
    line-height: 1rem;
    font-size: 0.3rem;
    font-weight: 700;
}


	.business .con .con_left {
		    width: 3.3rem;
           height: 0.6rem;
                line-height: 0.6rem;
    padding: 0 0.1rem;
    background: #fc6167;
    border-radius: 5px;
    color: #FFFFFF;
    text-align: center;
    font-size: 0.43rem;
    padding: 0.1rem;
    display: block;
	}

	.milk {
		background: #FFFFFF;
		margin-top: 0.15rem;
		font-size: 0.28rem;
		padding: 0 0.3rem;
		height: 2.2rem;
		box-sizing: border-box;
	}

	.milk .milk_img {
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
		margin-top: 0.35rem;
	}

	.milk .milk_img img {
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	.milk .milk_tit {
		display: inline-block;
		width: 4.6rem;
		height: 1.5rem;
		margin-left: 0.2rem;
		vertical-align: bottom;
	}

	.milk .milk_tit div:nth-child(1) {
		font-size: 0.3rem;
		font-weight: bold;
		height: 0.4rem;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.milk .milk_tit div:nth-child(2) {
		font-size: 0.24rem;
		margin-top: 0.2rem;
		color: #000000;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
		.heard {
z-index: 999;
    height: 0.88rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
.orderBox{
	margin-left: 0.6rem
}
</style>
