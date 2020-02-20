import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Oferta } from "./shared/oferta.model";
import { URL_API } from "./app.api";

//import 'rxjs/add/operator/toPromise'

@Injectable()
export class OfertasService {
  //private url_api = "http://localhost:3000/ofertas";

  constructor(private http: HttpClient) {}

  public getOfertas(): Promise<Oferta[]> {
    return this.http
      .get(`${URL_API}/ofertas?destaque=true`)
      .toPromise()
      .then((res: Promise<Oferta[]>) => {
        console.log(res);
        return res;
      });
  }

  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
    return this.http
      .get(`${URL_API}/ofertas?categoria=${categoria}`)
      .toPromise()
      .then((res: Promise<Oferta[]>) => {
        return res;
      });
  }

  public getOfertaPorId(id: number): Promise<Oferta> {
    return this.http
      .get(`${URL_API}/ofertas?id=${id}`)
      .toPromise()
      .then((res: Promise<Oferta>) => {
        return res[0];
      });
  }

  public getComoUsarOfertaPorId(id: number): Promise<string> {
    return this.http
      .get(`${URL_API}/como-usar?id=${id}`)
      .toPromise()
      .then((res: any) => {
        console.log(res);
        return res[0].descricao;
      });
  }
  public getOndeFicaOfertaPorId(id: number): Promise<string> {
    return this.http
      .get(`${URL_API}/onde-fica?id=${id}`)
      .toPromise()
      .then((res: any) => {
        console.log(res);
        return res[0].descricao;
      });
  }
}
