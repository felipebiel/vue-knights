export default {
    name: 'Header',
    data() {
        return {
            drawer: false,
            group: null,
        }
    },
    methods: {
        goToHome() {
            if (this.$router.history.current.name !== 'home') {
                this.$router.push({ name: 'home' });
            }
        },
        goToHall() {
            if (this.$router.history.current.name !== 'hall-of-heroes') {
                this.$router.push({ name: 'hall-of-heroes' });
            }
        }
    },
    watch: {
        group() {
            this.drawer = false
        },
    },
}