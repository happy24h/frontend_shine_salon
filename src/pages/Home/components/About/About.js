import classNames from 'classnames/bind';
import styles from './About.module.scss';
const cx = classNames.bind(styles);
function About() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-about')}>
                <div className="">
                    <div className={cx('title-about')} style={{ fontSize: '20px' }}>
                        Truyền thông nói về Salon Hair
                    </div>
                    <div className={cx('row-about')}>
                        <div className={cx('content-left')}>
                            <iframe
                                src="https://www.youtube.com/embed/RdezgkJJjak"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                            ></iframe>
                        </div>
                        <div className={cx('content-right')}>
                            <p>
                                ✔ Quá trình tìm kiếm và hoàn thiện bản thân là bất tận. Mỗi kiểu tóc mới đại diện một
                                tinh thần mới mà người đàn ông luôn hướng đến để tìm thấy phiên bản tốt nhất của chính
                                mình. Hãy cùng lắng nghe những câu chuyện hành trình lột xác dưới đây để tìm thấy niềm
                                cảm hứng đổi mới cho bạn.
                            </p>{' '}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
