import keys from './models';
export default {
    app: {
        name: 'Tiệm sách thông minh',
        address: 'Khu phố 6, Phường Linh Trung, Quận Thủ Đức, Thành phố Hồ Chí Minh',
        phone: '(028) 372 51993',
    },
    authorize: {
        id: -1,
        name: '...',
        point: 0,
        employeeId: -1,
    },
    gui: {
        fullSideBarSize: true,
    },
    data: keys.reduce((object, key) => {
        object[`${key}s`] = [];
        return object;
    }, {}),
    markdown: {
        admin_book_add: require('./markdown/admin-book-create.md'),
        admin_book_detail: require('./markdown/admin-book-detail.md'),
        admin_user: require('./markdown/admin-user.md'),
        authorize_login: require('./markdown/authorize-login.md'),
        authorize_error: require('./markdown/authorize-error.md'),
        information: require('./markdown/information.md'),
    },
};
