import config from '~/config';
import HeaderOnly from '~/layouts/HeaderOnly';

import Home from '~/pages/Home';
import Service from '~/pages/Service';
import Learn from '~/pages/Learn';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Library from '~/pages/Library';
import Contact from '~/pages/Contact';
import HairStyle from '~/pages/HairStyle';
import Blog from '~/pages/Blog';
import ViewBranch from '~/pages/Home/Detail/Branch';
// import DetailServiceHome from '~/pages/Home/Detail/Course';
import DetailEmployee from '~/pages/Home/Detail/EmployeeClient/DetailEmployee';
// import OrderModal from '~/pages/Home/Detail/EmployeeClient/OrderModal';
import OrderModal from '~/layouts/components/OrderModal';
import ServiceClient from '~/pages/Home/Detail/ServiceClient';
import AllService from '~/pages/Home/SeeMore/Service/AllService';
import AllBranch from '~/pages/Home/SeeMore/Branch/AllBranch';
import AllEmployee from '~/pages/Home/SeeMore/Employee/AllEmployee';
import AccountConfirm from '~/layouts/components/AccountConfirm';
import SignIn from '~/pages/FormLogin/SignIn';
import FormLogin from '~/pages/FormLogin/FormLogin';
import FormContact from '~/pages/FormContact';
// System
import ManageUser from '~/layouts/System/Page/ManageUser';
import ManageFeedback from '~/layouts/System/Page/Feedback';
import AddAccount from '~/layouts/System/Page/ManageUser/components/AddAccount';
import EditAccount from '~/layouts/System/Page/ManageUser/components/EditAccount';
import ModalEdit from '~/layouts/System/Page/ManageUser/components/EditAccount/ModalEdit';
import DetailAccount from '~/layouts/System/Page/ManageUser/components/DetailAccount/DetailAccount';
import DetailFeedback from '~/layouts/System/Page/Feedback/DetailFeedBack';

// booking
import ManageSchedule from '~/layouts/System/Page/ManageSchedule';
import AddSchedule from '~/layouts/System/Page/ManageSchedule/AddSchedule';

// blog
import ManageBlog from '~/layouts/System/Page/ManageBlog';
import CreateBlog from '~/layouts/System/Page/ManageBlog/CreateBlog';
import DetailBlog from '~/layouts/System/Page/ManageBlog/DetailBlog/DetailBlog';
import EditBlog from '~/layouts/System/Page/ManageBlog/EditBlog/EditBlog';
//branch
import ManageBranch from '~/layouts/System/Page/ManageBranch';
import AddBranch from '~/layouts/System/Page/ManageBranch/components/AddBranch';
import DetailBranch from '~/layouts/System/Page/ManageBranch/components/DetailBranch';
import EditBranch from '~/layouts/System/Page/ManageBranch/components/EditBranch';
//service
import ManagerService from '~/layouts/System/Page/Service/ManagerService';
import AddService from '~/layouts/System/Page/Service/components/Add/AddService';
import DetailService from '~/layouts/System/Page/Service/components/Detail';
import EditService from '~/layouts/System/Page/Service/components/Edit';
import ManagerTypeService from '~/layouts/System/Page/TypeService/ManagerTypeService';
import AddTypeService from '~/layouts/System/Page/TypeService/components/Add/AddTypeService';
import DetailTypeService from '~/layouts/System/Page/TypeService/components/Detail/DetailTypeService';
import EditTypeService from '~/layouts/System/Page/TypeService/components/Edit/EditTypeService';
import ManagerOrder from '~/layouts/System/Page/Order/ManagerOrder';
import OrderDetail from '~/layouts/System/Page/Order/component/Detail/OrderDetail';

//booking
import ManageBooking from '~/layouts/System/Page/ManageBooking';
import AddBooking from '~/layouts/System/Page/ManageBooking/components/AddBooking';
import EditBooking from '~/layouts/System/Page/ManageBooking/components/EditBooking';
import ManageDashBoardBooking from '~/layouts/System/Page/DasBoard/DashboardBooking';
import ManageDashBoardOrder from '~/layouts/System/Page/DasBoard/DashboardOrder';
import ManageDashBoardService from '~/layouts/System/Page/DasBoard/DashboardService';

import ManagerVoucher from '~/layouts/System/Page/Voucher/ManagerVoucher';
import AddVoucher from '~/layouts/System/Page/Voucher/component/Add/AddVoucher';

const publicRouters = [
    { path: config.routes.home, component: Home },
    { path: config.routes.service, component: Service },
    { path: config.routes.library, component: Library },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.hairStyle, component: HairStyle },
    { path: config.routes.formContact, component: FormContact },
    { path: config.routes.learn, component: Learn, changeLayout: HeaderOnly },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.viewBranch, component: ViewBranch, changeLayout: HeaderOnly },
    // { path: config.routes.detailServiceHome, component: DetailServiceHome, changeLayout: HeaderOnly },
    { path: config.routes.detailEmployee, component: DetailEmployee, changeLayout: HeaderOnly },
    { path: config.routes.orderModal, component: OrderModal, changeLayout: HeaderOnly },
    { path: config.routes.serviceClient, component: ServiceClient, changeLayout: HeaderOnly },
    { path: config.routes.allService, component: AllService },
    { path: config.routes.allBranch, component: AllBranch },
    { path: config.routes.allEmployee, component: AllEmployee },
    { path: config.routes.login, component: Login, changeLayout: null },
    { path: config.routes.signIn, component: SignIn, changeLayout: null },
    { path: config.routes.register, component: Register, changeLayout: null },
    { path: config.routes.accountConfirm, component: AccountConfirm, changeLayout: null },
    { path: config.routes.formLogin, component: FormLogin, changeLayout: null },
];

const privateRoutes = [
    // schedule
    { path: config.routes.manageSchedule, component: ManageSchedule },
    { path: config.routes.addSchedule, component: AddSchedule },
    //Account
    { path: config.routes.manageUser, component: ManageUser },
    { path: config.routes.addAccount, component: AddAccount },
    { path: config.routes.editAccount, component: EditAccount },
    { path: config.routes.modalEdit, component: ModalEdit },
    { path: config.routes.detailAccount, component: DetailAccount },
    //FeedBack
    { path: config.routes.manageFeedback, component: ManageFeedback },
    { path: config.routes.detailFeedback, component: DetailFeedback },

    // blog
    { path: config.routes.manageBlog, component: ManageBlog },
    { path: config.routes.createBlog, component: CreateBlog },
    { path: config.routes.detailBlog, component: DetailBlog },
    { path: config.routes.editBlog, component: EditBlog },
    // branch
    { path: config.routes.manageBranch, component: ManageBranch },
    { path: config.routes.addBranch, component: AddBranch },
    { path: config.routes.detailBranch, component: DetailBranch },
    { path: config.routes.editBranch, component: EditBranch },

    //Service
    { path: config.routes.manageService, component: ManagerService },
    { path: config.routes.addService, component: AddService },
    { path: config.routes.detailService, component: DetailService },
    { path: config.routes.editService, component: EditService },

    //Type Service
    { path: config.routes.manageTypeService, component: ManagerTypeService },
    { path: config.routes.addTypeService, component: AddTypeService },
    { path: config.routes.detailTypeService, component: DetailTypeService },
    { path: config.routes.editTypeService, component: EditTypeService },

    //Order
    { path: config.routes.manageOrder, component: ManagerOrder },
    { path: config.routes.detailOrder, component: OrderDetail },

    // booking
    { path: config.routes.manageBooking, component: ManageBooking },
    { path: config.routes.addBooking, component: AddBooking },
    { path: config.routes.editBooking, component: EditBooking },

    //dash board
    { path: config.routes.manageDashBoardBooking, component: ManageDashBoardBooking },
    { path: config.routes.manageDashBoardOrder, component: ManageDashBoardOrder },
    { path: config.routes.manageDashBoardSerivce, component: ManageDashBoardService },

    // voucher
    { path: config.routes.manageVoucher, component: ManagerVoucher },
    { path: config.routes.addVoucher, component: AddVoucher },
];

const privateClient = [
    //Account
    { path: config.routes.editAccount, component: EditAccount },
    { path: config.routes.modalEdit, component: ModalEdit },
    { path: config.routes.detailAccount, component: DetailAccount },

    //Order
    { path: config.routes.manageOrder, component: ManagerOrder },
    { path: config.routes.detailOrder, component: OrderDetail },
];

export { publicRouters, privateRoutes, privateClient };
