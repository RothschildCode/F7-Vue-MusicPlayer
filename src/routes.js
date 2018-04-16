export default [
	// {
	// 	path: '/search/',
	// 	component: require('./pages/library-search.vue')
	// },
	// {
	// 	path: '/singer/',
	// 	component: require('./pages/Singer.vue')
	// },
	// {
	// 	path: '/singer-list/',
	// 	component: require('./pages/SingerList.vue')
	// },
	// {
	// 	path: '/classify-post/',
	// 	component: require('./pages/classify-post.vue')
	// },
	// {
	// 	path: '/song-list/',
	// 	component: require('./pages/song-list.vue')
	// },
	// {
	// 	path: '/search/album/post/',
	// 	component: require('./pages/Album.vue' )
	// },
	// {
	// 	path:'/musicset/',
	// 	component: require('./pages/MusuicSet.vue')
	// },
	// {
	// 	path: '/staranchor/',
	// 	component: require('./pages/staranchor.vue')
	// },
	// {
	// 	path: '/singerMoldList/',
	// 	component: require('./pages/SingerMoldList.vue')
	// },
	{
		path: '/search/',
		component: require('./views/SearchPage.vue')
	},
	{
		path: '/singer-list/',
		component: require('./views/SingerListPage.vue')
	},
	{
		path: '/singer-areas/',
		component: require('./views/SingerAreasPage.vue')
	},
	{
		path: '/singer-detail/',
		component: require('./views/SingerDetailPage.vue')
	},
	{
		path: '/special-detail/',
		component: require('./views/SpecialDetailPage.vue')
	}
]