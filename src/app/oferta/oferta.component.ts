import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Oferta } from "../shared/oferta.model";
import { OfertasService } from "../ofertas.service";
import { Observable, Observer, Subscription, interval } from "rxjs";

@Component({
  selector: "app-oferta",
  templateUrl: "./oferta.component.html",
  styleUrls: ["./oferta.component.css"],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {
  private tempoObservableSubscription: Subscription;
  private meuObservableTesteSubscription: Subscription;

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) {}

  ngOnInit() {
    this.ofertasService
      .getOfertaPorId(this.route.snapshot.params["id"])
      .then((oferta: Oferta) => {
        this.oferta = oferta;
      });

    let tempo = interval(3000);
    this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
      console.log(intervalo);
    });
    console.log(tempo);

    //observable (observável)
    let meuObservableTeste = Observable.create((observer: Observer<string>) => {
      observer.next("Primeiro evento da stream");
      observer.complete();
      observer.next("Primeiro evento da stream2");
    });
    //observble(observador)
    this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
      (result: any) => console.log(result),
      (erro: string) => console.log(erro),
      () => console.log("stream foi finalizada")
    );
  }

  ngOnDestroy() {
    this.meuObservableTesteSubscription.unsubscribe();

    this.tempoObservableSubscription.unsubscribe();
  }
