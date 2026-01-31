'use strict';

const { Service } = require('@hapipal/schmervice');
const myEncrypt = require('../modules/pwd_encrypt');

module.exports = class UserService extends Service {

    async create(user){
        try {
            const { User } = this.server.models();
            const { mailService } = this.server.services();

            const newUser = await User.query().insertAndFetch(user);

            try {
                await mailService.envoyerMail({
                    to: newUser.email,
                    subject: 'Bienvenue !',
                    text: `Félicitations ${newUser.firstName}, ton compte est prêt.`
                });
            } catch (mailErr) {
                console.warn('Mail non envoyé :', mailErr.message);
            }

            return newUser;

        } catch (globalError) {
            console.error('ERREUR CRITIQUE :', globalError.message);
            throw globalError;
        }
    }

    async login(email, password) {
        const { User } = this.server.models();

        const user = await User.query().findOne({ email });

        if (!user) {
            return null;
        }

        const isPasswordValid = myEncrypt.comparePassword(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        return user;
    }

    async list() {
        const { User } = this.server.models();
        return User.query();
    }

    async delete(id) {
        const { User } = this.server.models();
        return User.query().deleteById(id);
    }

    async modify(id, user) {
        const { User } = this.server.models();
        return User.query().patchAndFetchById(id, user);
    }
}