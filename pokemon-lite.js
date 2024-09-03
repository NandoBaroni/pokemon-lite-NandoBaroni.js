
class Pokemon {
    constructor(name, health, magic) {
        this.name = name;
        this.health = health;
        this.magic = magic;
        this.skills = [];
        this.counter = 0;
    }

    learnAttackSkill(newSkill) {
        this.skills.push(newSkill);
    }

    showStatus() {
        console.log(`${this.name} Status: Health = ${this.health}, Magic = ${this.magic}`);
        if (this.counter > 3) {
            console.log(`${this.name} has won the battle!`);
        }
    }

    getMagics() {
        const magicBoost = Math.floor(Math.random() * 21);
        this.magic += magicBoost;
        console.log(`${this.name} gained ${magicBoost} magic points!`);
    }

    hasEnoughMagic(skillName) {
        const skill = this.skills.find(skill => skill.attack === skillName);
        return this.magic >= skill.magic;
    }

    isAlive() {
        return this.health > 0;
    }

    attack(skillName, opponent) {
        const skill = this.skills.find(skill => skill.attack === skillName);

        if (!this.isAlive()) {
            console.log(`${this.name} is unable to attack because it's defeated.`);
            return;
        }

        if (!opponent.isAlive()) {
            console.log(`${opponent.name} is already defeated. ${this.name} wins!`);
            return;
        }

        if (!this.hasEnoughMagic(skillName)) {
            console.log(`${this.name} does not have enough magic to use ${skillName}.`);
            return;
        }


        this.magic -= skill.magic;
        opponent.health -= skill.damage;
        this.counter++;
        console.log(`${this.name} uses ${skillName} on ${opponent.name}!`);
        console.log(`${opponent.name} takes ${skill.damage} damage.`);


        this.showStatus();
        opponent.showStatus();


        if (!opponent.isAlive()) {
            console.log(`${opponent.name} is defeated. ${this.name} wins!`);
        }
    }
}


class AttackSkill {
    constructor(attack, damage, magic) {
        this.attack = attack;
        this.damage = damage;
        this.magic = magic;
    }
}


let pikachu = new Pokemon("Pikachu", 120, 80);
let bulbasaur = new Pokemon("Bulbasaur", 95, 105);


let lightning = new AttackSkill("Lightning", 40, 30);
let poisonSeed = new AttackSkill("PoisonSeed", 20, 20);


pikachu.learnAttackSkill(lightning);
pikachu.learnAttackSkill(poisonSeed);


bulbasaur.learnAttackSkill(lightning);
bulbasaur.learnAttackSkill(poisonSeed);


pikachu.attack("Lightning", bulbasaur);
bulbasaur.attack("PoisonSeed", pikachu);
pikachu.attack("PoisonSeed", bulbasaur);
bulbasaur.attack("Lightning", pikachu);
pikachu.attack("Lightning", bulbasaur);
pikachu.attack("PoisonSeed", bulbasaur);
