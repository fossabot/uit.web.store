import { isNameValid, isAddressValid, isPhoneValid } from '../utils/Validation';
import Model from '../utils/Model';

class Supplier extends Model {
    static isRawValid(supplier) {
        if (
            !isNameValid(supplier.name) ||
            !isAddressValid(supplier.address) ||
            !isPhoneValid(supplier.phone)
        )
            return false;
        return true;
    }
    /**
     * @param {Realm} realm
     * @param {String} name
     */
    static getByName(realm, name) {
        return realm.objects('Supplier').filtered(`name LIKE $0`, name)[0];
    }

    /**
     *
     * @param {Realm} realm
     * @param {Supplier} rawSupplier
     */
    static create(realm, rawSupplier) {
        return new Promise((resolve, reject) => {
            if (!Supplier.isRawValid(rawSupplier)) {
                reject('Information Error');
                return;
            }
            if (Supplier.getByName(realm, rawSupplier.name) !== undefined) {
                reject('Supplier is exist');
                return;
            }
            realm.write(() => {
                resolve(
                    realm.create(
                        'Supplier',
                        {
                            id: Supplier.getNextId(realm),
                            name: rawSupplier.name,
                            address: rawSupplier.address,
                            phone: rawSupplier.phone,
                        },
                        true,
                    ),
                );
            });
        });
    }

    get loan() {
        let money = 0;
        money += this.paymentCoupons.sum('money');
        this.importCoupons.forEach(importCoupon => (money -= importCoupon.total));
        return money;
    }
    /**
     * công nợ đến thời điểm bất kỳ
     * vd: tháng, năm, quý
     * @param {Date} end
     */
    async loanTo(end) {
        return new Promise((resolve, reject) => {
            let money = 0;
            if (typeof end != 'object' || end.constructor.name !== 'Date') {
                reject(`Date is invalid`);
                return;
            }

            money += this.paymentCoupons.filtered('create < $0', end).sum('money');
            this.importCoupons
                .filtered('create < $0', end)
                .forEach(importCoupon => (money -= importCoupon.total));
            resolve(money);
        });
    }
    /**
     * công nợ trong 1 khoảng thời gian
     * vd: tháng, năm, quý
     * @param {Date} begin
     * @param {Date} end
     */
    async loanAround(begin, end) {
        return new Promise((resolve, reject) => {
            let money = 0;
            if (
                typeof end != 'object' ||
                end.constructor.name !== 'Date' ||
                typeof begin != 'object' ||
                begin.constructor.name !== 'Date'
            ) {
                reject(`Date is invalid`);
                return;
            }
            money += this.paymentCoupons
                .filtered('$0 < create AND create < $1', begin, end)
                .sum('money');
            this.importCoupons
                .filtered('$0 < create AND create < $1', begin, end)
                .forEach(importCoupon => (money -= importCoupon.total));
            resolve(money);
        });
    }
}

Supplier.schema = {
    name: 'Supplier',
    primaryKey: 'id',

    properties: {
        id: 'int',
        name: 'string',
        address: 'string',
        phone: 'string',

        orderCoupons: {
            type: 'linkingObjects',
            objectType: 'OrderCoupon',
            property: 'supplier',
        },
        importCoupons: {
            type: 'linkingObjects',
            objectType: 'ImportCoupon',
            property: 'supplier',
        },
        paymentCoupons: {
            type: 'linkingObjects',
            objectType: 'PaymentCoupon',
            property: 'supplier',
        },
    },
};

export default Supplier;
