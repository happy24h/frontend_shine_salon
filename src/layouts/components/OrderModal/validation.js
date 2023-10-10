const validation = (values) => {
    let errors = {};
    // if (!values.fullname) {
    //     errors.fullname = 'name is required.';
    // }
    if (!values.username) {
        errors.username = 'Vui lòng nhập tên của bạn';
    } else if (values.username.length < 5) {
        errors.username = 'Vui lòng nhập số điện thoại333.';
    }
    if (!values.email) {
        errors.email = 'Vui lòng nhập Email.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Vui lòng nhập địa chỉ email hợp lệ.';
    }
    if (!values.phone) {
        errors.phone = 'Vui lòng nhập số điện thoại.';
    } else if (values.phone.length < 10) {
        errors.phone = 'Vui lòng nhập số điện thoại hợp lệ.';
    }

    // if (!values.password) {
    //     errors.password = 'Password is required.';
    // } else if (values.password.length < 5) {
    //     errors.password = 'Password must be more than five characters.';
    // }

    // setErrors(errors);

    return errors;
};
export default validation;
