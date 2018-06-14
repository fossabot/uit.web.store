import path from 'path';
import book from './api/book.api';
import user from './api/user.api';
import cart from './api/cart.api';
import importCoupon from './api/importCoupon.api';
import orderCoupon from './api/orderCoupon.api';
import paymentCoupon from './api/paymentCoupon.api';
import supplier from './api/supplier.api';
import employee from './api/employee.api';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    book(app, realm);
    user(app, realm);
    cart(app, realm);
    importCoupon(app, realm);
    orderCoupon(app, realm);
    paymentCoupon(app, realm);
    supplier(app, realm);
    employee(app, realm);

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../../dist/client/index.html'));
    });
    app.get('*', (req, res) => {
        res.status(404).send('Not Found');
    });
}
