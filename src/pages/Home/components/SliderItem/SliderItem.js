function SliderItem({ data, image, handleViewDetailTeacher }) {
    return (
        <div className="section-customize" onClick={() => handleViewDetailTeacher(data)}>
            <div className="bg-image section-specialty" style={{ backgroundImage: `url(${image})` }}></div>
            <div className="name-specialty">{`${data.lastName} ${data.firstName}`}</div>
        </div>
    );
}

export default SliderItem;
