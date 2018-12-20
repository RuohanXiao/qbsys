// import contentView from './views/contentView'
// import geoView from './views/geoview'
// import netView from './views/netview'
import home from './views/home'
const routers = [
    // {
    //     path: '/main', component: main
    //     children: [
    //         // { path: 'netView', component: netView },
    //         { path: '/geoView', component: geoView },
    //         { path: '/contentView', component: contentView }
    //     ]
    // },
    {
        path: '/', component: home
        // path: '/', component: netView
    // },
    // {
    //     path: '/netView', component: netView
    // },
    // {
    //     path: '/geoView', component: geoView
    // },
    // {
    //     path: '/contentView', component: contentView
    // },
    // {
    //     path: '/home', component: home
    }
];
export default routers;