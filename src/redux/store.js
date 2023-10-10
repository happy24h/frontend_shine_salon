// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './authSlice';
// export default configureStore({
//     reducer: {
//         auth: authReducer,
//     },
// });

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import accountReducer from './accountSlice';
import roleReducer from './roleSlice';
import feedbackReducer from './feedback/feedbackSlice';

import blogReducer from './blog/blogSlice';
import branchReducer from './branch/branchSlice';
import bookingReducer from './booking/bookingSlice';

import serviceReducer from './service/serviceSilce';
import cloudReducer from './cloudImage/cloudSlice';
import typeServiceReducer from './type_service/typeServiceSilce';
import orderReducer from './order/orderSilce';
import orderDetailReducer from './order/orderDetailSilce';
import voucherReducer from './voucher/VoucherSilce';

import dashBoarOderReducer from './dashboard/order/dashboardOrderSlice';
import dashBoarBookingReducer from './dashboard/booking/dashboardBookingSlice';
import dashBoarServiceReducer from './dashboard/service/dashboardServiceSlice';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const rootReducer = combineReducers({
    auth: authReducer,
    account: accountReducer,
    feedback: feedbackReducer,
    role: roleReducer,

    blog: blogReducer,
    branch: branchReducer,
    booking: bookingReducer,

    service: serviceReducer,
    cloudImage: cloudReducer,
    typeService: typeServiceReducer,
    order: orderReducer,
    orderDetail: orderDetailReducer,

    voucher: voucherReducer,


    dashBoarOderSlices:dashBoarOderReducer,

    dashBoarBookingSlices:dashBoarBookingReducer,


    dashBoarServiceSlices:dashBoarServiceReducer,



});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
