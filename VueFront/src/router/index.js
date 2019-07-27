import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/view/HelloWorld'
import Home from '@/view/Home'
import Order from '@/view/Order'
import OrderSee from '@/view/OrderSee'
import OrderSub from '@/view/OrderSub'
import OrderDetals from '@/view/OrderDetals'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
		{
		  path: '/Home',
		  name: 'Home',
		  component: Home
		},
			{
		  path: '/Order',
		  name: 'Order',
		  component: Order
		},{
		  path: '/OrderSub',
		  name: 'OrderSub',
		  component: OrderSub
		},
		{
		  path: '/OrderSee',
		  name: 'OrderSee',
		  component: OrderSee
		},
		{
		  path: '/OrderDetals',
		  name: 'OrderDetals',
		  component: OrderDetals
		}
  ]
})
