import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Oferta } from "./shared/oferta.model";
import { URL_API } from "./app.api";
import { Observable } from "rxjs";
import { map, retry } from "rxjs/operators";
import { async } from "@angular/core/testing";

//import 'rxjs/add/operator/toPromise'

@Injectable()
export class OfertasService {
  //private url_api = "http://localhost:3000/ofertas";

  constructor(private http: HttpClient) {}

  public getOfertas(): Promise<Oferta[]> {
    return this.http
      .get(`${URL_API}/ofertas?destaque=true`)
      .toPromise()
      .then((res: Response) => {
        return res;
      })
      .catch(er => er);
  }

  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
    return this.http
      .get(`${URL_API}/ofertas?categoria=${categoria}`)
      .toPromise()
      .then((res: Response) => {
        return res;
      })
      .catch(er => er);
  }

  public getOfertaPorId(id: number): Promise<Oferta> {
    return this.http
      .get(`${URL_API}/ofertas?id=${id}`)
      .toPromise()
      .then((res: Response) => {
        return res[0];
      })
      .catch(er => er);
  }

  public getComoUsarOfertaPorId(id: number): Promise<string> {
    return this.http
      .get(`${URL_API}/como-usar?id=${id}`)
      .toPromise()
      .then((res: Response) => {
        //console.log(res);
        return res[0].descricao;
      });
  }
  public async getOndeFicaOfertaPorId(id: number): Promise<string> {
    const res = await this.http
      .get(`${URL_API}/onde-fica?id=${id}`)
      .toPromise();
    //console.log(res);
    return res[0].descricao;
  }

  public pesquisaOfertas(termo: string): Observable<Oferta[]> {
    return this.http
      .get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)

      .pipe(
        retry(10),
        map((resp: any) => resp)
      );
  }
}
