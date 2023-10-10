// require('dotenv').config();
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const ApiConfig = {
    register: `${baseUrl}api/v1/register`,
    loginUser: `${baseUrl}api/v1/login`,
    registerCustomer: `${baseUrl}api/v1/registerCustomer`,
    getAllAccount: `${baseUrl}api/v1/account/search`,
    getAllRoles: `${baseUrl}api/v1/account/role`,
    deleteAccount: `${baseUrl}api/v1/account/delete`,
    createAccountCustomer: `${baseUrl}api/v1/registerCustomer`,
    getDetailAccount: `${baseUrl}api/v1/account`,
    editDetailAccount: `${baseUrl}api/v1/account/update`,

    // api service
    getAllService: `${baseUrl}api/v1/service/search`,
    getAllTypeService: `${baseUrl}api/v1/service/findAllTypeService`,
    createService: `${baseUrl}api/v1/service/create`,
    updateService: `${baseUrl}api/v1/service/update`,
    getDetailService: `${baseUrl}api/v1/service`,
    deleteService: `${baseUrl}api/v1/service/delete`,

    // api branch
    getBranch: `${baseUrl}api/v1/branch/search`,
    createBranch: `${baseUrl}api/v1/branch/create`,
    deleteBranch: `${baseUrl}api/v1/branch/delete`,
    getDetailBranch: `${baseUrl}api/v1/branch`,
    editBranch: `${baseUrl}api/v1/branch/update`,

    // api booking
    getBooking: `${baseUrl}api/v1/booking/search`,
    createBooking: `${baseUrl}api/v1/booking/create`,
    getDetailBooking: `${baseUrl}api/v1/booking`,
    getDetailBookingDate: `${baseUrl}api/v1/booking/findAllByEmployee_idAndDate_booking`,
    editBooking: `${baseUrl}api/v1/blog/update`,

    // api cloud
    uploadImage: `${baseUrl}api/v1/cloud/uploads`,

    // api order
    getAllOrder: `${baseUrl}api/v1/order/search`,
    createOder: `${baseUrl}api/v1/order/create`,
    createOderDetail: `${baseUrl}api/v1/order/createOrderDetail`,
    getDetailOrder: `${baseUrl}api/v1/order`,
    updateStatusOrder: `${baseUrl}api/v1/order/update/status`,

    // api feedback
    getAllFeedback: `${baseUrl}api/v1/feedback`,
    createFeedback: `${baseUrl}api/v1/feedback/create`,
    getDetailFeedback: `${baseUrl}api/v1/feedback`,
    changeStatusDetailFeedback: `${baseUrl}api/v1/feedback/changeStatus`,
    deleteFeedback: `${baseUrl}api/v1/feedback/deleteRead`,

    // api type service
    createTypeService: `${baseUrl}api/v1/type_service/create`,
    getDetailTypeService: `${baseUrl}api/v1/type_service`,
    updateTypeService: `${baseUrl}api/v1/type_service/update`,
    deleteForTypeService: `${baseUrl}api/v1/type_service/delete`,
    searchTypeService: `${baseUrl}api/v1/type_service/search`,

    // api blog
    getBlog: `${baseUrl}api/v1/blog/search`,
    createBlog: `${baseUrl}api/v1/blog/create`,
    getDetailBlog: `${baseUrl}api/v1/blog`,
    editBlog: `${baseUrl}api/v1/blog/update`,
    deleteBlog: `${baseUrl}api/v1/blog/delete`,

    // api voucher
    createVoucher: `${baseUrl}api/v1/voucher/create`,
    getDetailVoucher: `${baseUrl}api/v1/voucher`,
    getAllVoucher: `${baseUrl}api/v1/voucher/search`,
    deleteVoucherByVoucherCode: `${baseUrl}api/v1/voucher`,

    // api dash board
    getDashBoardHeat: `${baseUrl}api/v1/booking/dashboard-heat`,
    getDashBoardRange: `${baseUrl}api/v1/booking/dashboard-range`,
    getDashBoardPei: `${baseUrl}api/v1/booking/dashboard-pei`,
    getDashBoardColumn: `${baseUrl}api/v1/booking/dashboard-column`,
    getDashBoardLine: `${baseUrl}api/v1/order/dashboard-line`,
    getDashBoardPeiOrder: `${baseUrl}api/v1/order/dashboard-pei`,
    getDashBoardColumnOrder: `${baseUrl}api/v1/order/dashboard-column`,
    getDashBoardStatusOrder: `${baseUrl}api/v1/order/dashboard-status`,
    getDashBoardBarService: `${baseUrl}api/v1/service/dashboard-bar`,
    getDashBoardCountServicesAndStaff: `${baseUrl}api/v1/service/dashboard-count`,
};

export default ApiConfig;
