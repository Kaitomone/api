import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  constructor(private http: HttpClient) {}


  minString = 3;
  maxString = 40;

  listeBateau = new Array;
  listeMesures = new Array;

  bateau = "";

  api = "https://iwa2021.edriki.com/api/Boat/Search/";

  rechercheDeBateau = "";

  apiRef = "https://iwa2021.edriki.com/api/Boat/ByRef/";

  ref  = "";

  rechercheAvanceBateau = this.apiRef + this.ref;

  apiPrix = "https://iwa2021.edriki.com/api/Item/Items";

  rechercheAvancePrix = "";


  lengthm = "";
  gvsl = "";
  gvl = "";
  gve = "";
  gm = "";
  ge = "";
  ss = "";
  sa = "";
  gs = "";

  descriptiongvl1 = "Premiere description";
  nomgvl1 = "";


  changeMonBateau($event:any)
  {
    this.bateau = $event.target.value;
    console.log($event.target.value);
    this.rechercheDeBateau = this.api + this.bateau;

    console.log(this.rechercheDeBateau);

    this.rechercheBateau($event);
  }

  rechercheBateau($event:any)
  {
      var term = $event.target.value;
      if(term.length >= this.minString && term.length < this.maxString)
      {
        this.http.get<any>(this.rechercheDeBateau).subscribe(respond => {
          this.listeBateau = respond.response.datas;
          console.log(this.listeBateau);
        });
      }


  };

  choixBateau()
  {
    this.rechercheAvanceBateau = this.apiRef + this.bateau;

    console.log(this.rechercheAvanceBateau);

    this.rechercheMesure(this.bateau);
  };

  rechercheMesure($event:any)
  {
      var element = <HTMLInputElement> document.getElementById("boutonLongueur");
      element.disabled = false;

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


  prixVoiles()
  {
    this.rechercheAvancePrix = this.apiPrix + "?length=" + this.lengthm + "&gvsl=" + this.gvsl+ "&gvl=" + this.gvl
    + "&gve=" + this.gve +"&gm=" + this.gm + "&ge=" + this.ge + "&ss=" + this.ss + "&sa=" + this.sa +"&gs=" + this.gs;

    console.log(this.rechercheAvancePrix);

    this.recherchePrixVoiles();
  };

  recherchePrixVoiles()
  {
    this.http.get<any>(this.rechercheAvancePrix).subscribe(respond => {
      console.log(respond.response.datas);
      this.descriptiongvl1 = respond.response.datas.description;
      console.log(this.descriptiongvl1);


    });
  };


  ngOnInit(): void {}
}
