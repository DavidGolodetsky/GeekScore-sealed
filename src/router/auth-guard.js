import store from '@/store';

export default (to, from, next) => {
    if (store.getters['user/user']) {
        next()
    } else {
        next({ name: "signIn" })
    }
}   