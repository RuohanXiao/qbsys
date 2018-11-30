import contentView from './views/contentView'
import geoView from './views/geoview'
import netView from './views/netview'
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
        path: '/', component: netView
    },
    {
        path: '/netView', component: netView
    },
    {
        path: '/geoView', component: geoView
    },
    {
        path: '/contentView', component: contentView
    }   
];
export default routers;