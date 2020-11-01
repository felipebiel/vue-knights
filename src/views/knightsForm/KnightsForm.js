export default {
    name: 'KnightsForm',
    props: ['id'],
    data() {
        return {
            readonly: "Apenas leitura",
            loading: false,
            form : {},
            menu: false,

        }
    },
    computed: {
        nameErrors() {
            return []
        }
    },
}