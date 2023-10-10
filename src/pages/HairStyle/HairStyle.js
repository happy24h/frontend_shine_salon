import classNames from 'classnames/bind';
import styles from './HairStyle.module.scss';
// import Button from '~/components/Button';
import './HairStyle.scss';
import './gird.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles);

const dataHairStyle = [
    {
        image: 'https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_mau_nhuom_hoc_sinh_58a481c6ef.jpg',
    },
    { image: 'https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_middepart_2c13d2f78a.jpg' },
    {
        image: 'https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_side_part_vuot_ru_6dce22fce7.jpg',
    },
    { image: 'https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_Artboard_33_198a8efad1.png' },
    { image: 'https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_Hoang_Dung_cd7a187836.png' },
    { image: 'https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_giu_form_toc_bcf8d15204.jpg' },
    {
        image: 'https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_layer_moi_highlight_bach_kim_1_02b1485ec0.png',
    },
    { image: 'https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_dreadlock_1a67466bbc.jpg' },
    { image: 'https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_png_2adc7d7b23.png' },
    { image: 'https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_Viet_Hung_c21e6ce922.png' },
];
function HairStyle() {
    return (
        <div className={cx('wrapper')}>
            <div className="grid wide">
                <div className="row">
                    {dataHairStyle &&
                        dataHairStyle.map((item, index) => {
                            return (
                                <div className="col l-2-4 m-4 c-6" key={index}>
                                    <div
                                        className="item"
                                        style={{
                                            backgroundImage: `url(${item.image})`,
                                        }}
                                    >
                                        <span>Kiểu tóc đẹp</span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default HairStyle;
