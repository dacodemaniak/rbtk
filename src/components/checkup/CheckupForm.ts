

/**
 * @name CheckupForm Formulaire de confirmation d'invitation
 * @author IDea Factory (dev-team@ideafactory.fr) - Sept. 2018
 * @package /components/checkup
 * @version 1.0.0
 */
import * as $ from 'jquery';

import { TemplateLoader } from '../../services/template-loader';
import { Constants } from '../../shared/constants/constants';
import { Toast } from './../../shared/modules/toast/toast';
import { DataService } from './../../shared/services/data-service';

export class CheckupForm {
    private _dataService: DataService;
    
    public user: any;

    /**
     * Instancie la classe de gestion du formulaire
     * Charge les listeners pour la validation
     */
    constructor() {
        const loader = new TemplateLoader();

        const placeHolder = $('[signup-form]');
        
        // Efface le contenu courant, si nécessaire
        placeHolder.html('');

        // Récupère l'utilisateur courant identifié
        this._dataService = new DataService();
        this.user = this._dataService.getUser();

        loader.load('checkup', 'checkup').then((template) => {
            if (template) {
                template.appendTo(placeHolder);

                // Ajoute les données utilisateur
                $('#user-name').html('<strong>' + this.user.forname + ' ' + this.user.name + '</strong>');
                $('#user-company').html(this.user.company);

                // Définit les listeners
                this._setListeners();
            }
        });
    }

    /**
     * Définit les différents listener du formulaire
     */
    public _setListeners(): void {
        console.log('Définition des listeners du formulaire de confirmation');

        const _jqueryForm = $('#checkup-form');
        _jqueryForm.on(
            'submit',
            (event: any): void => this._submitListener(event)
        );
    }

    private _submitListener(event: any): void {
        event.preventDefault(); // Ne pas propager l'événement

        const uri: string = Constants._API_ROOT;

        const today: Date = new Date();

        const _dataService: DataService = new DataService();
        const _user: any = _dataService.getUser();

        // Exécute l'appel Ajax
        if (today == Constants._EVENT_DATE) {
            $.ajax({
                url: uri,
                method: 'put',
                dataType: 'json',
                data: _user,
                success: function (results) {
    
                },
                error: function(xhr, errorText) {
    
                }
            });
        } else {
            // Pas encore la date du jour, ou date dépassée
            const _options = {
                content: 'Bonjour,<br>Malheureusement, notre événement n\'a pas encore démarré.<br>Rendez-vous le 27 !'
            }
            const _toast = new Toast(_options);
        }
        
    }

}