export default {
    name: 'Home',
    created () {
        this.$store.dispatch('getList', {url: '/knights/'})
    },
    computed: {
        dataTable() {
            return this.$store.state.getList.list
        }
    },
}