import { useState, useEffect } from 'react';
import Slider from 'react-slick';

import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../ContentSlider/ContentSlider.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getBranch } from '~/redux/branch/apiBranch';
import { getBlog } from '~/redux/blog/apiBlog';

const cx = classNames.bind(styles);
function Blog({ settings }) {
    let dataBranch = {
        name: '',
        address: '',
        hot_line: '',
        start: '',
        end: '',
        page: 1,
        limit: 6,
        // sort: 'desc',
        sort: 'asc',
        status: '',
    };

    const dispatch = useDispatch();

    const navigate = useNavigate();
    // const user = useSelector((state) => state.auth.login?.currentUser);
    const listBlog = useSelector((state) => state.blog.blog?.listData?.content);
    const user = useSelector((state) => state.auth.login?.currentUser);
    console.log('check list branch', listBlog);
    useEffect(() => {
        getBlog(dataBranch, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleViewDetailBranch = (item) => {
        navigate(`/blog`);
    };

    const handleSeeMore = () => {
        navigate(`/blog`);
    };

    return (
        <div className="section-share section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Bài Viết</span>
                    <button className="btn-section" onClick={handleSeeMore}>
                        Xem tất cả bài viết
                    </button>
                </div>

                <div className={cx('slider')}>
                    <Slider className={cx('container')} {...settings}>
                        {listBlog &&
                            listBlog.length > 0 &&
                            listBlog.map((item, index) => (
                                <div
                                    key={index}
                                    className="section-customize2"
                                    style={{ display: 'flex ', width: '600px' }}
                                    onClick={() => handleViewDetailBranch(item)}
                                >
                                    <div
                                        className="bg-image section-specialty"
                                        style={{ backgroundImage: `url(${item.thumbnail})` }}
                                    ></div>
                                    <div className="text-content-blog-mobile">
                                        <div className="child-text-content-blog">{item?.title}</div>
                                        {/* <div className="name-specialty">{item?.content}</div> */}
                                    </div>
                                </div>
                            ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Blog;
