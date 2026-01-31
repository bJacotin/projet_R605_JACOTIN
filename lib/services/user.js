'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    async create(user){
        try {
            // Utilise this.server.models() car this.models() semble indisponible
            const { User } = this.server.models();
            const { mailService } = this.server.services();

            // 1. Insertion en base
            const newUser = await User.query().insertAndFetch(user);

            // 2. Envoi du mail
            try {
                await mailService.envoyerMail({
                    to: newUser.email,
                    subject: 'Bienvenue !',
                    text: `Félicitations ${newUser.firstName}, ton compte est prêt.`
                });
            } catch (mailErr) {
                console.warn('⚠️ Mail non envoyé :', mailErr.message);
            }

            return newUser;

        } catch (globalError) {
            console.error('❌ ERREUR CRITIQUE :', globalError.message);
            throw globalError;
        }
    }
}