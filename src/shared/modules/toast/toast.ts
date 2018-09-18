/**
* @name Toast Service d'affichage d'un toast
* @author IDea Factory (dev-team@ideafactory.fr) - Mars 2018
* @package shared/modules/toast
* @version 1.0.0
* @todo Ajouter la méthode dismiss() lors de la fermeture du toast
* @todo Ajouter la méthode present() pour afficher le toast
*/
interface ToastOptions {
    mainAlertClass?: string;
    subAlertClass?: string;
    mainClass?: string;
    mainAnimatedClass?: string;
    animatedClass?: string;
    animatedOutClass?: string,
    content: string;
    duration?: number;
}

export class Toast {
    public constructor(private options: ToastOptions){
        if(!options.mainAlertClass){
            options.mainAlertClass = 'alert';
        }
        if(!options.subAlertClass){
            options.subAlertClass = 'alert-info';
        }
        if(!options.mainClass){
            options.mainClass = 'toast';
        }
        if(!options.duration || options.duration === 0){
            options.duration = 1.5;
        }
        
        // Exécute l'affichage du toast proprement dit
        this._doToast();
    }
    
    private _doToast(): void {
        let toast = $('<div>');
        toast
            .addClass(this.options.mainAlertClass)
            .addClass(this.options.subAlertClass)
            .addClass(this.options.mainClass);
        if(this.options.mainAnimatedClass && this.options.animatedClass){
            toast.addClass(this.options.mainAnimatedClass)
            .addClass(this.options.animatedClass)            
        }
        toast
            .attr('role', 'alert')
            .html('<strong>' + this.options.content + '</strong>');
        
        toast.appendTo($('body'));
        
        let options = this.options;
        
        setTimeout(function() {
            if(options.mainAnimatedClass && options.animatedClass){
                toast.removeClass(options.mainAnimatedClass)
                .addClass(options.animatedOutClass)            

                setTimeout(function() { toast.remove() }, 1500);
            }  else {
                toast.remove();
            }
            },
            this.options.duration * 1000
        );        
    }
}