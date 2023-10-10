import './Library.scss';
import classNames from 'classnames/bind';
import styles from './Library.module.scss';
const cx = classNames.bind(styles);

const dataLibrary = [
    {
        image: 'https://library.30shine.com/wp-content/uploads/2021/05/94441749_264609604926201_5080382077019357184_o-300x210.jpg',
        title: '- STYLIST - THỢ CẮT TẠI HỒ CHÍ MINH',
        content: 'Thu nhập: 9.000.000 - 15.000.000 đồng',
    },
    {
        image: 'https://library.30shine.com/wp-content/uploads/2021/05/94441749_264609604926201_5080382077019357184_o-300x210.jpg',
        title: '- SKINNER - THỢ GỘI TẠI ĐÀ NẴNG',
        content: 'Thu nhập: 9.000.000 - 15.000.000 đồng',
    },
    {
        image: 'https://library.30shine.com/wp-content/uploads/2021/05/94441749_264609604926201_5080382077019357184_o-300x210.jpg',
        title: '- STYLIST - THỢ CẮT TẠI ĐÀ NẴNG',
        content: 'Thu nhập: 9.000.000 - 15.000.000 đồng',
    },
    {
        image: 'https://library.30shine.com/wp-content/uploads/2021/05/94441749_264609604926201_5080382077019357184_o-300x210.jpg',
        title: '- STYLIST - THỢ CẮT TẠI BÌNH DƯƠNG',
        content: 'Thu nhập: 9.000.000 - 15.000.000 đồng',
    },
    {
        image: 'https://library.30shine.com/wp-content/uploads/2021/05/94441749_264609604926201_5080382077019357184_o-300x210.jpg',
        title: '- SKINNER - THỢ GỘI TẠI HÀ NỘI',
        content: 'Thu nhập: 9.000.000 - 15.000.000 đồng',
    },
    {
        image: 'https://library.30shine.com/wp-content/uploads/2021/05/94441749_264609604926201_5080382077019357184_o-300x210.jpg',
        title: '- SKINNER - THỢ GỘI TẠI ĐÀ NẴNG',
        content: 'Thu nhập: 9.000.000 - 15.000.000 đồng',
    },
];

const dataLibraryRight = [
    {
        image: 'https://s3-ap-southeast-1.amazonaws.com/tuyendung.30shine.org/data/images/TuyenDung/Icon1.png',
        title: 'DỄ DÀNG ĐẠT THU NHẬP 10-24 TRIỆU',
        content: 'Anh em được hỗ trợ bởi quy trình, công nghệ để tăng năng suất tối đa',
    },
    {
        image: 'https://s3-ap-southeast-1.amazonaws.com/tuyendung.30shine.org/data/images/TuyenDung/icon2.png',
        title: 'LÀM VIỆC LINH HOẠT',
        content: 'Anh em có thời gian bên gia đình mà vẫn đảm bảo thu nhập rất tốt',
    },
    {
        image: 'https://s3-ap-southeast-1.amazonaws.com/tuyendung.30shine.org/data/images/TuyenDung/icon3.png',
        title: 'CƠ HỘI THĂNG TIẾN HẤP DẪN',
        content: 'Mọi vị trí công việc tại Shine Salon luôn có lộ trình thăng tiến (Lên Quản Lý), lên bậc (Tăng lương)',
    },
    {
        image: 'https://s3-ap-southeast-1.amazonaws.com/tuyendung.30shine.org/data/images/TuyenDung/icon4.png',
        title: 'TAY NGHỀ GIỎI NHANH',
        content: 'Liên tục được đào tạo nâng cao tay nghề',
    },
    {
        image: 'https://s3-ap-southeast-1.amazonaws.com/tuyendung.30shine.org/data/images/TuyenDung/icon5.png',
        title: 'CHẾ ĐỘ NHƯ CÔNG TY NƯỚC NGOÀI',
        content: 'Bảo hiểm XH và Y Tế, chế độ thai sản (Nghỉ vẫn nhận lương), Phúc lợi các dịp hiếu, hỉ, ốm đau...',
    },
];
const Library = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className="library-content-left">
                    <div className="header-content-library">VIỆC LÀM LƯƠNG CAO</div>
                    {dataLibrary &&
                        dataLibrary.map((item) => {
                            return (
                                <div>
                                    <div className="row-content-library">
                                        <div className="content-library-text">
                                            <h4>{item.title}</h4>
                                            <span>{item.content}</span>
                                        </div>
                                        <div className="wrapper-hot-library">
                                            <div className="hot-content-library">HOT</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className="library-content-right">
                    <div className="header-content-library">VÌ SAO NÊN CHỌN SHINE SALON</div>
                    <div>
                        {dataLibraryRight &&
                            dataLibraryRight.map((item) => {
                                return (
                                    <div className="row-content-library-right">
                                        <div className="wrapper-img-content-right">
                                            <div
                                                className="img-content-library-right"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            ></div>
                                        </div>
                                        <div className="content-library-text-right">
                                            <h3>{item.title}</h3>
                                            <span>{item.content}</span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Library;
