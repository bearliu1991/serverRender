import Vue from 'vue'
import {
    Button,
    Carousel,
    CarouselItem,
    Rate,
    Tooltip,
    InputNumber,
    Collapse,
    CollapseItem,
    Breadcrumb,
    BreadcrumbItem,
    Drawer,
} from 'element-ui'
import '../assets/style/element-variables.scss'
import '../assets/style/element-reset.scss'

Vue.use(Button)
Vue.use(Carousel).use(CarouselItem)
Vue.use(Rate)
Vue.use(Tooltip)
Vue.use(InputNumber)
Vue.use(Collapse).use(CollapseItem)
Vue.use(Breadcrumb).use(BreadcrumbItem)
Vue.use(Drawer)
