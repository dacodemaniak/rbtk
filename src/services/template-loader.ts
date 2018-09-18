/**
 * @name TemplateLoader Service de chargement des vues
 * @author IDea Factory (dev-team@ideafactory.fr) - Sept. 2018
 * @package /services
 * @version 1.0.0
 */
import * as $ from 'jquery';

export class TemplateLoader {
    constructor() {}

    public load(from: string, template: string): Promise<any> {
        return new Promise((resolve) => {
            const viewSrc = './src/components/' + from + '/' + template + '.html';

            $.ajax({
                url: viewSrc,
                method: 'get',
                success: (template) => {
                    resolve(($(template)));
                },
                error: (xhr, errorText) => {
                    console.log('Erreur de chargement du template : ' + errorText);
                    resolve(false);
                }
            })
        })
    }
}