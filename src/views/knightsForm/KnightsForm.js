import { required } from 'vuelidate/lib/validators';

export default {
    name: 'KnightsForm',
    props: ['id'],
    data() {
        return {
            readonly: "Apenas leitura",
            loading: false,
            form: {},
            menu: false,

        }
    },
    validations() {

        return {
            form: {
                name: { required },
            },
        };

    },
    methods: {
        saveForm() {
            try {
                this.$v.form.$touch();
                if (!this.$v.form.$invalid) {
                    if (this.id) {
                        // EDITA
                    } else {
                        // SALVA                        
                    }
                }
            } catch (e) {
                console.log('ActivitiesForm.js - submitForm():' + { e });
            }
        }
    },
    computed: {
        nameErrors() {
            const errors = []
            if (!this.$v.form.name.$dirty) return errors
            !this.$v.form.name.required && errors.push('Escreva um nome.')
            return errors
        },
    },
}