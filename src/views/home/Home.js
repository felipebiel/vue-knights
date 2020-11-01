export default {
    name: 'Home',
    data() {
        return {
            headers: [
                {
                    text: 'Nome',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Apelido', value: 'nickname' },
            ],
        }
    },
    created() {
        this.$store.dispatch('getList', { url: '/knights/' })
    },
    computed: {
        dataTable() {
            return this.$store.state.getList.list
        }
    },
}