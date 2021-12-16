import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

// On a un seul composant
@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  constructor(private http: HttpClient) {}

  // Variables pour les lettres minimum et maximum pour la recherche
  minString = 3;
  maxString = 40;

  // Liste où l'on mets tout nos bateaux pour le sélectionner
  listeBateau = new Array;

  // Variable pour le bateau
  bateau = "";

  // Première api pour rechercher tous nos beateaux
  api = "https://iwa2021.edriki.com/api/Boat/Search/";

  // Variable regroupant l'api et le nom du bateau
  rechercheDeBateau = "";

  // Deuxième api pour avoir les mesures des voiles du bateau selon la référence
  apiRef = "https://iwa2021.edriki.com/api/Boat/ByRef/";

  // Variable de la référence
  ref  = "";

  // Variable pour lier l'api et la référence
  rechercheAvanceBateau = this.apiRef + this.ref;

  // Troisième api pour la description et le prix des voiles
  apiPrix = "https://iwa2021.edriki.com/api/Item/Items";

  // Variable pour avoir l'api et les mesures
  rechercheAvancePrix = "";

  // Variables des mesures de la voile
  lengthm = "";
  gvsl = "";
  gvl = "";
  gve = "";
  gm = "";
  ge = "";
  ss = "";
  sa = "";
  gs = "";

  //Description et prix pour les voiles GVL
  descriptiongvl1 = " ";
  prixgvl1 = " ";
  descriptiongvl2 = " ";
  prixgvl2 = " ";
  descriptiongvl3 = " ";
  prixgvl3 = " ";

  //Description et prix pour les voiles GVE
  descriptiongve1 = " ";
  prixgve1 = " ";
  descriptiongve2 = " ";
  prixgve2 = " ";
  descriptiongve3 = " ";
  prixgve3 = " ";

  //Description et prix pour les voiles Spi SS
  descriptionspi1 = " ";
  prixspi1 = " ";
  descriptionspi2 = " ";
  prixspi2 = " ";
  descriptionspi3 = " ";
  prixspi3 = " ";

  //Description et prix pour les voiles Spi SA
  descriptionspi4 = " ";
  prixspi4 = " ";
  descriptionspi5 = " ";
  prixspi5 = " ";
  descriptionspi6 = " ";
  prixspi6 = " ";


  // Fonction pour récupérer les lettres pour rechercher les bateaux
  changeMonBateau($event:any)
  {
    this.bateau = $event.target.value;
    this.rechercheDeBateau = this.api + this.bateau;

    this.rechercheBateau($event);
  }

  // Appel de l'api et envoi dans la liste listeBateau
  rechercheBateau($event:any)
  {
      var term = $event.target.value;
      // On vérifie si nous sommes dans les bornes pour l'api
      if(term.length >= this.minString && term.length < this.maxString)
      {
        // Première api
        this.http.get<any>(this.rechercheDeBateau).subscribe(respond => {
          this.listeBateau = respond.response.datas;
          console.log(respond.response.datas);
        });
      }


  };

  // Fonction qui envoie la référence pour retourner nos mesures
  choixBateau()
  {
    this.rechercheAvanceBateau = this.apiRef + this.bateau;

    this.rechercheMesure(this.bateau);
  };

  // Appel de la deuxième api pour avoir les mesures pour la voile
  rechercheMesure($event:any)
  {
      var element = <HTMLInputElement> document.getElementById("boutonLongueur");
      element.disabled = false;

      // Deuxieme api
      this.http.get<any>(this.rechercheAvanceBateau).subscribe(respond => {
        console.log(respond.response.datas);
        this.lengthm = respond.response.datas.lengthm;
        this.gvsl = respond.response.datas.sails.gvsl;
        this.gvl = respond.response.datas.sails.gvl
        this.gve = respond.response.datas.sails.gve;
        this.gm = respond.response.datas.sails.gm;
        this.ge = respond.response.datas.sails.ge;
        this.ss = respond.response.datas.sails.ss;
        this.sa = respond.response.datas.sails.sa;
        this.gs = respond.response.datas.sails.gs;
      });
  };

  // Fonction pour créer notre appel d'api
  prixVoiles()
  {
    this.rechercheAvancePrix = this.apiPrix + "?length=" + this.lengthm + "&gvsl=" + this.gvsl+ "&gvl=" + this.gvl
    + "&gve=" + this.gve +"&gm=" + this.gm + "&ge=" + this.ge + "&ss=" + this.ss + "&sa=" + this.sa +"&gs=" + this.gs;

    this.recherchePrixVoiles();
  };

  // Permet d'avoir le prix et la description pour les voiles
  recherchePrixVoiles()
  {
    // Troisième api
    this.http.get<any>(this.rechercheAvancePrix).subscribe(respond => {
      console.log(respond.response.datas);
      // On fait une boucle qui permet de passer par toutes les voiles
      for (let i = 0; i < 25; i++)
      {
        // On fait un switch case pour déterminer le type de voile qu'on veut
        let type = respond.response.datas[i].type;
        switch (type) {
          // Les grande voile lattée
          case "GVL":
            if(respond.response.datas[i].price.unitPrice !=  0)
            {
              if(respond.response.datas[i].unitPrice != 0  && this.descriptiongvl1 == " ")
              {
                this.descriptiongvl1 = respond.response.datas[i].description;
                this.prixgvl1 = respond.response.datas[i].price.unitPrice;
              }
              if (respond.response.datas[i].unitPrice != 0 && this.descriptiongvl2 == " " && respond.response.datas[i].description != this.descriptiongvl1)
              {
                  this.descriptiongvl2 = respond.response.datas[i].description;
                  this.prixgvl2 = respond.response.datas[i].price.unitPrice;
              }
              if (respond.response.datas[i].unitPrice != 0 && this.descriptiongvl3 == " " && respond.response.datas[i].description != (this.descriptiongvl1 || this.descriptiongvl2))
              {
                  this.descriptiongvl3 = respond.response.datas[i].description;
                  this.prixgvl3 = respond.response.datas[i].price.unitPrice;
              }
            }
            break;
          // Les voiles d'avants
          case "GVE":
            if(respond.response.datas[i].price.unitPrice !=  0)
            {
              if (respond.response.datas[i].unitPrice != 0  && this.descriptiongve1 == " ")
              {
                this.descriptiongve1 = respond.response.datas[i].description;
                this.prixgve1 = respond.response.datas[i].price.unitPrice;
              }
              if (respond.response.datas[i].unitPrice != 0 && this.descriptiongve2 == " " && respond.response.datas[i].description != this.descriptiongve1)
              {
                  this.descriptiongve2 = respond.response.datas[i].description;
                  this.prixgve2 = respond.response.datas[i].price.unitPrice;
              }
              if (respond.response.datas[i].unitPrice != 0 && this.descriptiongve3 == " " && respond.response.datas[i].description != (this.descriptiongve1 || this.descriptiongve2))
              {
                  this.descriptiongve3 = respond.response.datas[i].description;
                  this.prixgve3 = respond.response.datas[i].price.unitPrice;
              }
            }

            break;

          // Les voiles de portant
          case "SS":
            if(respond.response.datas[i].price.unitPrice !=  0)
            {
              if (respond.response.datas[i].unitPrice != 0  && this.descriptionspi1 == " ")
              {
                this.descriptionspi1 = respond.response.datas[i].description;
                this.prixspi1 = respond.response.datas[i].price.unitPrice;
              }
              if (respond.response.datas[i].unitPrice != 0 && this.descriptionspi2 == " " && respond.response.datas[i].description != this.descriptionspi1)
              {
                  this.descriptionspi2 = respond.response.datas[i].description;
                  this.prixspi2 = respond.response.datas[i].price.unitPrice;
              }
              if (respond.response.datas[i].unitPrice != 0 && this.descriptionspi3 == " " && respond.response.datas[i].description != (this.descriptionspi1 || this.descriptionspi2))
              {
                  this.descriptionspi3 = respond.response.datas[i].description;
                  this.prixspi3 = respond.response.datas[i].price.unitPrice;
              }
            }
            break;

          // Les voiles de portant
          case "SA":
            if(respond.response.datas[i].price.unitPrice !=  0)
            {
              if (respond.response.datas[i].unitPrice != 0  && this.descriptionspi4 == " ")
              {
                this.descriptionspi4 = respond.response.datas[i].description;
                this.prixspi4 = respond.response.datas[i].price.unitPrice;
              }
              if (respond.response.datas[i].unitPrice != 0 && this.descriptionspi5 == " " && respond.response.datas[i].description != this.descriptionspi4)
              {
                  this.descriptionspi5 = respond.response.datas[i].description;
                  this.prixspi5 = respond.response.datas[i].price.unitPrice;
              }
              if (respond.response.datas[i].unitPrice != 0 && this.descriptionspi6 == " " && respond.response.datas[i].description != (this.descriptionspi5 || this.descriptionspi6))
              {
                  this.descriptionspi6 = respond.response.datas[i].description;
                  this.prixspi6 = respond.response.datas[i].price.unitPrice;
              }
            }
            break;
        }
      }

    });
  };


  ngOnInit(): void {}
}
