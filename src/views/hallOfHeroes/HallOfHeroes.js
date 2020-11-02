export default {
    name: 'HallOfHeroes',
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
                { text: 'Armas', value: 'weapons', sortable: false },
                { text: 'Atributo', value: 'keyAttribute', sortable: false },
                { text: 'Ataque', value: 'atack' },
                { text: 'Experiência', value: 'experience' }
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
        this.$store.dispatch('getList', { url: '/knights/?filter=heroes' })

    },
    computed: {
        dataTable() {
            return this.$store.state.getList.list
        },
    },
    methods: {
        getAge(birthday) {
            const today = new Date();
            const birthDate = new Date(birthday);
            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            return age < 0 ? 0 : age;
        },
        getExperience(item) {
            const exp = Math.floor((this.getAge(item.birthday) - 7) * Math.pow(22, 1.45))
            return exp < 0 ? 0 : exp;
        },
        getAtack(item) {
            const equippedWeapon = item.weapons.find((element) => { return element.equipped });
            const keyAttr = item.attributes[item.keyAttribute];
            const attack = 10 + this.modAttribute(keyAttr) + equippedWeapon.mod
            return attack;
        },
        modAttribute(value) {
            if (value >= 0 && value <= 8) {
                return -2;
            } else if (value > 8 && value <= 10) {
                return -1;
            } else if (value > 10 && value <= 12) {
                return 0;
            } else if (value > 12 && value <= 15) {
                return 1;
            } else if (value > 15 && value <= 18) {
                return 2
            } else if (value > 18 && value <= 20) {
                return 3
            }
        }

    },
}