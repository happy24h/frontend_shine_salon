import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            hello: 'hello world',
            manageUser: {
                title: 'welcome to hanoi',
            },
            systemSidebar: {
                users: {
                    title: 'Users',
                    data: {
                        title1: 'List user',
                        title2: 'Blog',
                    },
                },
                employees: {
                    title: 'Employee',
                    data: {
                        title1: 'Add appointment',
                        title2: 'Hair salon',
                    },
                },
                information: {
                    title: 'Information',
                    data: {
                        title1: 'Booking',
                        title2: 'Service',
                    },
                },
                feedback: {
                    title: 'Feedback',
                    data: {
                        title1: 'List feedback',
                        title2: 'List service',
                    },
                },
                dashboard: {
                    title: 'DashBoard',
                    data: {
                        title_booking: 'Booking chart',
                        title_order: 'Order chart',
                        title_service: 'Service chart',
                        title_guest: 'Guest chart',
                        title_branch: 'Branch chart',
                    },
                },
                table: {
                    title: 'Table',
                    data: {
                        title_employee: 'Timesheets',
                        title_branch: 'Branch revenue table',
                        title_booking: 'Appointment table',
                        title_order: 'Order table',
                    },
                },
            },
        },
    },
    vi: {
        translation: {
            hello: 'xin chào thế giới',
            manageUser: {
                title: 'chào mừng đến hà nội',
            },
            systemSidebar: {
                accounts: {
                    title: 'Tài khoản',
                    data: {
                        list: 'Danh sách',
                        create: 'Tạo',
                    },
                },
                blog: {
                    title: 'Bài viết',
                    data: {
                        list: 'Danh sách',
                        create: 'Tạo',
                    },
                },
                booking: {
                    title: 'Lịch làm việc',
                    data: {
                        list: 'Danh sách',
                        create: 'Tạo',
                    },
                },
                branch: {
                    title: 'Chi nhánh',
                    data: {
                        list: 'Danh sách',
                        create: 'Tạo',
                    },
                },
                service: {
                    title: 'Dịch vụ',
                    data: {
                        list: 'Danh sách dịch vụ',
                        create: 'Tạo dịch vụ',
                    },
                },
                type_service: {
                    title: 'Loại dịch vụ',
                    data: {
                        list: 'Danh sách loại dịch vụ',
                        create: 'Tạo loại dịch vụ',
                    },
                },
                voucher: {
                    title: 'Mã giảm giá',
                    data: {
                        list: 'Danh sách',
                        create: 'Tạo',
                    },
                },
                feedback: {
                    title: 'Phản hồi',
                    data: {
                        list: 'Danh sách',
                        create: 'Tạo',
                    },
                },
                dashboard: {
                    title: 'Biểu đồ',
                    data: {
                        title_booking: 'Biểu đồ lịch hẹn',
                        title_order: 'Biểu đồ đơn hàng',
                        title_service: 'Biểu đồ dịch vụ',
                        title_guest: 'Biểu đồ khách hàng',
                        title_branch: 'Biểu đồ chi nhánh',
                    },
                },
                table: {
                    title: 'Bảng',
                    data: {
                        title_employee: 'Bảng chấm công',
                        title_branch: 'Bảng doanh thu chi nhánh',
                        title_booking: 'Bảng lịch hẹn',
                        title_order: 'Bảng đơn hàng',
                    },
                },
            },
        },
    },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'vi', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
