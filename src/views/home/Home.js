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
                { text: 'Idade', value: 'age' },
                { text: 'Armas', value: 'weapons', sortable: false},
                { text: 'Atributo', value: 'keyAttribute', sortable: false}
            ],
            dictAttribute: {
                strength: 'Força',
                dexterity: 'Destreza',
                constitution: 'Constituição',
                intelligence: 'Inteligência',
                wisdom: 'Sabedoria',
                charisma: 'Carisma',
            }
        }
    },
    created() {
        this.$store.dispatch('getList', { url: '/knights/' })

    },
    computed: {
        dataTable() {
            return this.$store.state.getList.list
        },
    },
    methods: {
        goToCreate() {
            this.$router.push({ name: 'knight-add' })
        },
        selectLine(item) {
            this.$router.push({ name: 'knight-edit', params: { id: item._id } })
        },
        getAge(birthday) {
            const today = new Date();
            const birthDate = new Date(birthday);
            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            return age < 0? 0 : age ;
        }
    },
}