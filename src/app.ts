import * as $ from 'jquery';

import { DataService } from './shared/services/data-service';
import { SignupForm } from './components/signup/SignupForm';
import { CheckupForm } from './components/checkup/CheckupForm';

window.onload = () => {
    console.log('Application démarrée');
    
    const dataService: DataService = new DataService();
    
    
    if (!dataService.isRegistred) {
        // Instancie le formulaire de demande d'invitation
        const signupForm = new SignupForm();
    } else {
        const checkupForm = new CheckupForm();
    }
}