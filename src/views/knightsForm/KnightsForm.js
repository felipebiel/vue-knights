import { required, minValue, maxValue, requiredIf } from 'vuelidate/lib/validators';

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
                weapons: []
            },
            menu: false,
            attributesList: [
                { name: "Força", value: "strength" },
                { name: "Destreza", value: "dexterity" },
                { name: "Constituição", value: "constitution" },
                { name: "Inteligência", value: "intelligence" },
                { name: "Sabedoria", value: "wisdom" },
                { name: "Carisma", value: "charisma" }
            ],
            dialog: false,
            dialogTitle: '',
            dialogForm: { name: '', mod: 0, attr: '', equipped: false },
            createNew: false,
            dictAttribute: {
                strength: 'Força',
                dexterity: 'Destreza',
                constitution: 'Constituição',
                intelligence: 'Inteligência',
                wisdom: 'Sabedoria',
                charisma: 'Carisma',
            },
            selectedItem: null,
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
                },
                equippedWeapon: {
                    required: requiredIf(function () {                        
                        return !this.isEquipped;
                    })
                },
            },
            dialogForm: {
                name: {
                    required,
                },
                mod: { maxValue: maxValue(20), minValue: minValue(0) },
                attr: { required }
            }
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
        alertDisplay() {
            this.$swal('Sucesso!', 'Guerreiro criado com sucesso!', 'success');
        },
        alertEdit() {
            this.$swal('Sucesso!', 'Guerreiro editado com sucesso!', 'success');
        },
        async alertRemove() {
            this.$swal({
                title: '',
                text: "Tem certeza que deseja excluir?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim'
            }).then((result) => {
                if (result.value) {
                    this.loading = true;
                    this.remove();
                    setTimeout(() => {
                        this.$swal(
                            '',
                            'Esse guerreiro virou um herói!',
                            'success'
                        );
                        this.goToList();
                    }, 1000);

                }
            })
        },
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
                    this.alertDisplay();
                    this.goToList();
                });
        },
        edit() {
            const data = this.makeDataPost();
            this.$store.dispatch('editRecord', { url: `/knights/${this.id}`, data: data })
                .then(() => {
                    this.alertEdit();
                    this.goToList();
                });
        },
        remove() {
            this.$store.dispatch('deleteRecord', { url: `/knights/${this.id}` })
        },
        openNewItem() {
            this.dialogTitle = 'Nova Arma';
            this.$v.dialogForm.$reset();
            this.dialogForm = { name: '', mod: 0, attr: '', equipped: false };
            this.createNew = true;
            this.dialog = true;
        },
        selectItem(item) {
            this.selectedItem = item;
            this.dialogForm = { name: this.selectedItem.name, mod: this.selectedItem.mod, attr: this.selectedItem.attr, equipped: this.selectedItem.equipped };
            this.dialogTitle = 'Editar Arma',
                this.createNew = false;
            this.dialog = true;
        },
        editItem() {
            this.$v.dialogForm.$touch();
            if (!this.$v.dialogForm.$invalid) {
                this.selectedItem.name = this.dialogForm.name;
                this.selectedItem.mod = this.dialogForm.mod;
                this.selectedItem.attr = this.dialogForm.attr;
                this.selectedItem.equipped = this.dialogForm.equipped;
                this.dialogForm = { name: '', mod: 0, attr: '', equipped: false };
                this.dialog = false;
            }
        },
        deleteItem(item) {
            this.form.weapons.splice(this.form.weapons.indexOf(item), 1);
        },
        addNewItem() {
            this.$v.dialogForm.$touch();
            if (!this.$v.dialogForm.$invalid) {
                this.form.weapons.push({ ...this.dialogForm });
                this.dialog = false;
            }
        },
    },
    computed: {
        isEquipped() {
            return this.form.weapons.find(element => {return element.equipped})? true : false;
        },
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
        nameDialogErrors() {
            const errors = []
            if (!this.$v.dialogForm.name.$dirty) return errors
            !this.$v.dialogForm.name.required && errors.push('Escreva um nome.')
            return errors
        },
        modDialogErrors() {
            const errors = []
            if (!this.$v.dialogForm.mod.$dirty) return errors
            !this.$v.dialogForm.mod.maxValue && errors.push('Valor inválido.')
            !this.$v.dialogForm.mod.minValue && errors.push('Valor inválido.')
            return errors
        },
        attrDialogErrors() {
            const errors = []
            if (!this.$v.dialogForm.attr.$dirty) return errors
            !this.$v.dialogForm.attr.required && errors.push('Escolha a habilidade.')
            return errors
        },
        weaponsErrors() {
            const errors = []
            if (!this.$v.form.equippedWeapon.$dirty) return errors
            !this.$v.form.equippedWeapon.required && errors.push('Esolha pelo menos uma arma equipada.')
            return errors
        },
        headers() {
            if (this.id) {
                return [
                    {
                        text: 'Nome',
                        align: 'Name',
                        value: 'name',
                    },
                    { text: 'Modo', value: 'mod', sortable: false },
                    { text: 'Atributo', value: 'attr', sortable: false },
                    { text: 'Equipada', value: 'equipped' },
                ];
            } else {
                return [
                    {
                        text: 'Nome',
                        align: 'Name',
                        value: 'name',
                    },
                    { text: 'Modo', value: 'mod', sortable: false },
                    { text: 'Atributo', value: 'attr', sortable: false },
                    { text: 'Equipada', value: 'equipped' },
                    { text: 'Ações', value: 'actions', sortable: false },
                ];
            }
        }
    },
}