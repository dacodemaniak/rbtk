/**
 * @name SignupForm Formulaire de demande d'invitation
 * @author IDea Factory (dev-team@ideafactory.fr) - Sept. 2018
 * @package /components/signup
 * @version 1.0.0
 */
import * as $ from 'jquery';

import { DataService } from './../../shared/services/data-service';
import { TemplateLoader } from './../../services/template-loader';
import { Constants } from './../../shared/constants/constants';

export class SignupForm {
    /**
     * Instance du service de données localStorage
     */
    private _dataService: DataService;

    /**
     * Instancie la classe de gestion du formulaire
     * Charge les listeners pour la validation
     */
    constructor() {
        const loader = new TemplateLoader();

        const placeHolder = $('[signup-form]');

        this._dataService = new DataService();

        loader.load('signup', 'signup').then((template) => {
            if (template) {
                template.appendTo(placeHolder);
                this._setListeners();
            }
        });
    }

    /**
     * Définit les différents listener du formulaire
     */
    public _setListeners(): void {
        console.log('Définition des listeners du formulaire de demande');

        const _jQueryFormData = $('#signup-form input');

        _jQueryFormData.on(
            'keyup',
            (event: any): void => this._keyupListener(event)
        );

        _jQueryFormData.on(
            'blur',
            (event: any): void => this._blurListener(event)
        );

        const _jqueryForm = $('#signup-form');
        _jqueryForm.on(
            'submit',
            (event: any): void => this._submitListener(event)
        );
    }
    
    /**
     * Gère le formulaire de saisie à chaque touche du clavier
     * @param event Evénément détecté
     */
    private _keyupListener(event: any): void {
        const field: JQuery = $(event.target);

        let isValid: Boolean = true;

        // Contrôle les champs obligatoires
        $('#signup-form input.required').each( function() {
            if($(this).val() === '') {
                isValid = false;
            } else {
                if ($(this).attr('type') === 'email') {
                    // Vérifier la forme de l'adresse
                    const regex: RegExp = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    if (!regex.test($(this).val())) {
                        isValid = false;
                    } else {
                        if (!$(this).next('p').hasClass('helper')) {
                            $(this).next('p').addClass('helper');
                        }
                    }
                } else {
                    if (!$(this).next('p').hasClass('helper')) {
                        $(this).next('p').addClass('helper');
                    }                    
                }
            }
            
        });

        // Gère le bouton de soumission en conséquence
        if (isValid) {
            $('#send-it').removeAttr('disabled');
        } else {
            $('#send-it').attr('disabled', 'disabled');
        }
    }

    /**
     * Affiche ou masque les champs obligatoires
     * @param event Evénément propagé
     */
    private _blurListener(event: any): void {
        const field: JQuery = $(event.target);
        
        

        if (field.val() === '') {
            field.next('p').removeClass('helper');
        } else {
            if (field.attr('type') === 'email') {
                // Vérifier la forme de l'adresse
                const regex: RegExp = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!regex.test($(this).val())) {
                    field.next('p').removeClass('helper');
                } else {
                    field.next('p').addClass('helper');
                }               
            } else {
                field.next('p').addClass('helper');
            }
        }
    }

    private _submitListener(event: any): void {
        event.preventDefault(); // Ne pas propager l'événement

        const uri: string = Constants._API_ROOT;

        const _formData: any = $('#signup-form input');
        const content: any = {};

        _formData.each(function() {
            content[$(this).attr('id')] = $(this).val();
        });

        // Met à jour le service de données
        this._dataService.setUser(content);

        // Charge le formulaire de checkOut

    }

}