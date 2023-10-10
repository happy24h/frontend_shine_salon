import ContentSlider from './components/ContentSlider/ContentSlider';
import classNames from 'classnames/bind';
import styles from './Service.module.scss';
// import Slider from '~/layouts/components/Slider';
const cx = classNames.bind(styles);
function Service() {
    return (
        <div className={cx('wrapper')}>
            {/* <Slider /> */}
            <div className={cx('content')}>
                <ContentSlider />
            </div>
        </div>
    );
}

export default Service;
