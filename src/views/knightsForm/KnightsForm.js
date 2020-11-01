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
                nickname: { required },
                birthday: { required }
            },
        };

    },
    created () {
        if(this.id) {            
            this.$store.dispatch('getRead', { url: `/knights/${this.id}`})
            .then(() => {
                this.form = this.makeFormData();
            })
        }
    },
    methods: {
        makeFormData() {
            return {...this.instance}
        },
        makeDataPost() {
            return {...this.form}
        },
        saveForm() {
            try {
                this.$v.form.$touch();
                if (!this.$v.form.$invalid) {
                    if (this.id) {
                        // EDITA
                    } else {
                        this.create();                  
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
        goToList() {
            this.$router.push({name: 'Home'});
        },
        create() {
            const data = this.makeDataPost();
            this.$store.dispatch('saveRecord', { url: '/knights', data: data })
                .then(() => {
                    this.goToList();
                });
        },
        remove() {
            this.$store.dispatch('deleteRecord', { url: `/knights/${this.id}`})
            .then(() => {
                this.goToList();
            })
        }
    },
    computed: {
        instance() {
            return this.$store.state.getRead.instance;
        },
        nameErrors() {
            const errors = []
            if (!this.$v.form.name.$dirty) return errors
            !this.$v.form.name.required && errors.push('Escreva um nome.')
            return errors
        },
        nicknameErrors() {
            const errors = []
            if (!this.$v.form.nickname.$dirty) return errors
            !this.$v.form.nickname.required && errors.push('Escreva um apelido.')
            return errors
        },
        birthdayErrors() {
            const errors = []
            if (!this.$v.form.birthday.$dirty) return errors
            !this.$v.form.birthday.required && errors.push('Escreva um nascimento.')
            return errors
        },
    },
}