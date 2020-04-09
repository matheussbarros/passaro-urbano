import { Component, OnInit } from "@angular/core";
import { OfertasService } from "../ofertas.service";
import { Observable, Subject, of } from "rxjs";
import { Oferta } from "../shared/oferta.model";
import {
  switchMap,
  debounceTime,
  distinctUntilChanged,
  catchError
} from "rxjs/operators";

@Component({
  selector: "app-topo",
  templateUrl: "./topo.component.html",
  styleUrls: ["./topo.component.css"],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {
  constructor(private ofertasService: OfertasService) {}

  public ofertas: Observable<Oferta[]>;
 
  private subjectPesquisa: Subject<string> = new Subject<string>();

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        if (termo.trim() === "") {
          //retorna um observable de array de ofertas vazio
          return of<Oferta[]>([]);
        }
        return this.ofertasService.pesquisaOfertas(termo);
      }),
      catchError((erro: any) => {
        console.log(erro);
        return of<Oferta[]>([]);
      })
    );
 
  }

  public pesquisa(termoDaBusca: string): void {
    console.log("keyup caracter:", termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);

    /*
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca);
    this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas),
    (erro: any) => console.log('Error status: ',erro.status));
    */
  }
  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }
}
