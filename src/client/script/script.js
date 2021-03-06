import money from 'v-money';
import Vue from 'vue';
import { Facebook, read } from './modules';
import router from './router';
import { initialize, socket } from './socket/socket';
import app from './vue/app/app.vue';
import store from './vuex/store';
import('../style/index.scss');

Vue.use(money);

(async function() {
    await Facebook.initialize();
    const status = await Facebook.status(socket);

    new Vue({
        el: '#app',
        router,
        store,
        mounted() {
            initialize(this);
            this.checkLogin();
        },
        methods: {
            checkLogin() {
                if (!status.isLogin) {
                    store.commit('authorize', {});
                    router.push('/authorize/login');
                } else {
                    store.commit('authorize', status.res);
                    if (typeof status.res.employeeId === 'number') {
                        router.push('/admin/pos');
                        // models.forEach(_ =>
                        //     this.$store.dispatch('read', { return: 'json', _ }),
                        // );
                    } else {
                        router.push('/authorize/error');
                    }
                }
            },
        },
        render: h => h(app, { ref: 'app' }),
    });
})();
