/**
* @name DataService Services pour la gestion des clés du localStorage
* @author IDeaFactory (dev-team@ideafactory.fr)
* @package Services
* @version 0.1.0
*/
export class DataService {
    
    /*
    *  Objet du localStorage contenant un éventuel utilisateur
    */  
   private _user: any = {};

   /**
    * Vrai si l'utilisateur est enregistré
    * @var boolean isRegistred
    */
   public isRegistred: boolean = false;

   public constructor(){
       console.log('Constructeur DataService done');
       this._setUser();
   }
   
   public setUser(user: any): void {
       this._user = user;
       // Stocke l'utilisateur dans le localStorage
       localStorage.setItem('radison_guest', JSON.stringify(user));

       this.isRegistred = true;
   }
   /**
    * Récupère l'objet utilisateur du localstorage
    */
   public getUser(): any {
       return this._user;
   }
   
   
   /**
    * Récupère un élément user du localstorage
    * @return void
    */
   private _setUser(): void{
       let user: any = localStorage.getItem('radison_guest');
       
       console.log('Récupération de l\'utilisateur : ' + user);

       if(user !== null){
           this._user = JSON.parse(user);
           this.isRegistred = true;
       }
   }
   
   
}