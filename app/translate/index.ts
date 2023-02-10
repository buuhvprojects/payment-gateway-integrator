import * as fs from 'fs-extra';
/**
 * Retorna um texto de acordo com o idioma do usuário
 * @param slug - código do texto
 */
function translate(slug: string, lang?: string) {
    try {
        if (!lang)
            lang = 'pt-br';
        const exist = fs.existsSync('./languages/' + lang);
        if (!exist) {
            lang = 'pt-br';
        }
        let messages = require('./languages/' + lang);
        messages = messages.default;

        const splited = slug.split('.');
        let translatedSlug = null;
        for (let i = 0; i < splited.length; i++) {
            if (i === 0) {
                if (messages[splited[i]]) {
                    translatedSlug = messages[splited[i]];
                }
                else {
                    throw new Error('Incorret slug[' + slug + ']');
                }
            }
            else {
                if (translatedSlug[splited[i]]) {
                    translatedSlug = translatedSlug[splited[i]];
                }
                else {
                    throw new Error('Incorret slug[' + slug + ']');
                }
            }
        }

        return translatedSlug;
    }
    catch (error) {
        return error.message;
    }
}

export default translate;
