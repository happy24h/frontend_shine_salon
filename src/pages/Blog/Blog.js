import './Blog.scss';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import { useSelector } from 'react-redux';
import { getBlog } from '~/redux/blog/apiBlog';
import { useEffect } from 'react';
import { useState } from 'react';
const cx = classNames.bind(styles);

// const dataBlog = [
//     {
//         image: 'https://blog.30shine.com/wp-content/uploads/2021/05/94441749_264609604926201_5080382077019357184_o-300x210.jpg',
//         title: '7 LÝ DO AN TÂM KHI ĐẾN 30SHINE',
//         content:
//             'Luôn mong muốn mang đến những trải nghiệm trọn vẹn và an tâm nhất cho khách hàng,30Shine cam kết đồng hành cùng quý khách hàng, chung tay góp sức đẩy lùi dịch bệnh,bảo vệ sức khoẻ cộng đồng. Tất cả các salon của 30Shine đã & đang thực hiện đồng loạt các biện pháp.',
//     },
//     {
//         image: 'https://blog.30shine.com/wp-content/uploads/2021/05/94441749_264609604926201_5080382077019357184_o-300x210.jpg',
//         title: '7 LÝ DO AN TÂM KHI ĐẾN 30SHINE',
//         content:
//             'Luôn mong muốn mang đến những trải nghiệm trọn vẹn và an tâm nhất cho khách hàng,30Shine cam kết đồng hành cùng quý khách hàng, chung tay góp sức đẩy lùi dịch bệnh,bảo vệ sức khoẻ cộng đồng. Tất cả các salon của 30Shine đã & đang thực hiện đồng loạt các biện pháp.',
//     },
//     {
//         image: 'https://blog.30shine.com/wp-content/uploads/2021/05/94441749_264609604926201_5080382077019357184_o-300x210.jpg',
//         title: '7 LÝ DO AN TÂM KHI ĐẾN 30SHINE',
//         content:
//             'Luôn mong muốn mang đến những trải nghiệm trọn vẹn và an tâm nhất cho khách hàng,30Shine cam kết đồng hành cùng quý khách hàng, chung tay góp sức đẩy lùi dịch bệnh,bảo vệ sức khoẻ cộng đồng. Tất cả các salon của 30Shine đã & đang thực hiện đồng loạt các biện pháp.',
//     },
// ];

const dataBlogRight = [
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

const Blog = () => {
    const [dataBlog, setDataBlog] = useState([]);
    const listBlog = useSelector((state) => state.blog.blog?.listData?.content);
    console.log('check list', listBlog);
    useEffect(() => {
        getBlog();

        setDataBlog(listBlog);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className="blog-content-left">
                    <div className="header-content-blog">Blog</div>
                    {dataBlog &&
                        listBlog.map((item) => {
                            return (
                                <div>
                                    <div className="row-content-blog">
                                        <div
                                            className="img-content-blog"
                                            style={{ backgroundImage: `url(${item?.thumbnail})` }}
                                        ></div>
                                        <div className="content-blog-text">
                                            <h4>{item?.title}</h4>
                                            <span>{item?.content}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    {/* <div>
                        <div className="row-content-blog">
                            <div className="img-content-blog">img</div>
                            <div className="content-blog-text">
                                <h4>7 LÝ DO AN TÂM KHI ĐẾN 30SHINE</h4>
                                <span>
                                    Luôn mong muốn mang đến những trải nghiệm trọn vẹn và an tâm nhất cho khách hàng,
                                    30Shine cam kết đồng hành cùng quý khách hàng, chung tay góp sức đẩy lùi dịch bệnh,
                                    bảo vệ sức khoẻ cộng đồng. Tất cả các salon của 30Shine đã & đang thực hiện đồng
                                    loạt các biện.
                                </span>
                            </div>
                        </div>
                        <div className="row-content-blog">
                            <div className="img-content-blog">img</div>
                            <div className="content-blog-text">
                                <h4>7 LÝ DO AN TÂM KHI ĐẾN 30SHINE</h4>
                                <span>
                                    Luôn mong muốn mang đến những trải nghiệm trọn vẹn và an tâm nhất cho khách hàng,
                                    30Shine cam kết đồng hành cùng quý khách hàng, chung tay góp sức đẩy lùi dịch bệnh,
                                    bảo vệ sức khoẻ cộng đồng. Tất cả các salon của 30Shine đã & đang thực hiện đồng
                                    loạt các biện.
                                </span>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="blog-content-right">
                    <div className="header-content-blog">VÌ SAO NÊN CHỌN SHINE SALON</div>
                    <div>
                        {dataBlogRight &&
                            dataBlogRight.map((item) => {
                                return (
                                    <div className="row-content-blog-right">
                                        <div className="wrapper-img-content-right">
                                            <div
                                                className="img-content-blog-right"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            ></div>
                                        </div>
                                        <div className="content-blog-text-right">
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
export default Blog;
