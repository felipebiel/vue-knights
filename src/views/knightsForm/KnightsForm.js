import { required, minValue, maxValue } from 'vuelidate/lib/validators';

export default {
    name: 'KnightsForm',
    props: ['id'],
    data() {
        return {
            readonly: "Apenas leitura",
            loading: false,
            form: {
                attributes: {
                    strength: 0,
                    dexterity: 0,
                    constitution: 0,
                    intelligence: 0,
                    wisdom: 0,
                    charisma: 0,
                },
            },
            menu: false,
            attributesList: [
                { name: "Força", value: "strength" },
                { name: "Destreza", value: "dexterity" },
                { name: "Constituição", value: "constitution" },
                { name: "Inteligência", value: "intelligence" },
                { name: "Sabedoria", value: "wisdom" },
                { name: "Carisma", value: "charisma" }
            ]

        }
    },
    validations() {

        return {
            form: {
                name: { required },
                nickname: { required },
                birthday: { required },
                keyAttribute: { required },
                attributes: {
                    strength: { maxValue: maxValue(20), minValue: minValue(0) },
                    dexterity: { maxValue: maxValue(20), minValue: minValue(0) },
                    constitution: { maxValue: maxValue(20), minValue: minValue(0) },
                    intelligence: { maxValue: maxValue(20), minValue: minValue(0) },
                    wisdom: { maxValue: maxValue(20), minValue: minValue(0) },
                    charisma: { maxValue: maxValue(20), minValue: minValue(0) },
                }
            },
        };

    },
    created() {
        if (this.id) {
            this.$store.dispatch('getRead', { url: `/knights/${this.id}` })
                .then(() => {
                    this.form = this.makeFormData();
                })
        }
    },
    methods: {
        makeFormData() {
            return { ...this.instance }
        },
        makeDataPost() {
            return { ...this.form }
        },
        saveForm() {
            try {
                this.$v.form.$touch();
                if (!this.$v.form.$invalid) {
                    if (this.id) {
                        this.edit();
                    } else {
                        this.create();
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
        goToList() {
            this.$router.push({ name: 'Home' });
        },
        create() {
            const data = this.makeDataPost();
            this.$store.dispatch('saveRecord', { url: '/knights', data: data })
                .then(() => {
                    this.goToList();
                });
        },
        edit() {
            const data = this.makeDataPost();
            this.$store.dispatch('editRecord', { url: `/knights/${this.id}`, data: data })
                .then(() => {
                    this.goToList();
                });
        },
        remove() {
            this.$store.dispatch('deleteRecord', { url: `/knights/${this.id}` })
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
        keyAttributeErrors() {
            const errors = []
            if (!this.$v.form.keyAttribute.$dirty) return errors
            !this.$v.form.keyAttribute.required && errors.push('Escolha a habilidade.')
            return errors
        },
        attributeStrengthErrors() {
            const errors = []
            if (!this.$v.form.attributes.strength.$dirty) return errors
            !this.$v.form.attributes.strength.maxValue && errors.push('Valor inválido.')
            !this.$v.form.attributes.strength.minValue && errors.push('Valor inválido.')
            return errors
        },
        attributeDexterityErrors() {
            const errors = []
            if (!this.$v.form.attributes.dexterity.$dirty) return errors
            !this.$v.form.attributes.dexterity.maxValue && errors.push('Valor inválido.')
            !this.$v.form.attributes.dexterity.minValue && errors.push('Valor inválido.')
            return errors
        },
        attributeConstitutionErrors() {
            const errors = []
            if (!this.$v.form.attributes.constitution.$dirty) return errors
            !this.$v.form.attributes.constitution.maxValue && errors.push('Valor inválido.')
            !this.$v.form.attributes.constitution.minValue && errors.push('Valor inválido.')
            return errors
        },
        attributeIntelligenceErrors() {
            const errors = []
            if (!this.$v.form.attributes.intelligence.$dirty) return errors
            !this.$v.form.attributes.intelligence.maxValue && errors.push('Valor inválido.')
            !this.$v.form.attributes.intelligence.minValue && errors.push('Valor inválido.')
            return errors
        },
        attributeWisdomErrors() {
            const errors = []
            if (!this.$v.form.attributes.wisdom.$dirty) return errors
            !this.$v.form.attributes.wisdom.maxValue && errors.push('Valor inválido.')
            !this.$v.form.attributes.wisdom.minValue && errors.push('Valor inválido.')
            return errors
        },
        attributeCharismaErrors() {
            const errors = []
            if (!this.$v.form.attributes.charisma.$dirty) return errors
            !this.$v.form.attributes.charisma.maxValue && errors.push('Valor inválido.')
            !this.$v.form.attributes.charisma.minValue && errors.push('Valor inválido.')
            return errors
        },
        
        
        
    },
}