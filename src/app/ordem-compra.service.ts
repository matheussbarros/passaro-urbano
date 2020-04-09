import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Pedido } from "./shared/pedido.model";
import { Observable } from "rxjs";

import { URL_API } from "./app.api";
import { map } from "rxjs/operators";

@Injectable()
export class OrdemCompraService {
  constructor(private http: HttpClient) {}

  private options = {
    headers: new HttpHeaders().append("Content-type", "application/json"),
   // params: new HttpParams().append("key", "value")
  };

  public efetivarCompra(pedido: Pedido): Observable<number> {
    return this.http
      .post(`${URL_API}/pedidos`, JSON.stringify(pedido), this.options)
      .pipe(map((resp: any) => resp.id ));
  }
}
