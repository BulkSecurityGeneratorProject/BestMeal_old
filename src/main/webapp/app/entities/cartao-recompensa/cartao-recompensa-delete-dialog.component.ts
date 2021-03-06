import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICartaoRecompensa } from 'app/shared/model/cartao-recompensa.model';
import { CartaoRecompensaService } from './cartao-recompensa.service';

@Component({
    selector: 'jhi-cartao-recompensa-delete-dialog',
    templateUrl: './cartao-recompensa-delete-dialog.component.html'
})
export class CartaoRecompensaDeleteDialogComponent {
    cartaoRecompensa: ICartaoRecompensa;

    constructor(
        private cartaoRecompensaService: CartaoRecompensaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cartaoRecompensaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cartaoRecompensaListModification',
                content: 'Deleted an cartaoRecompensa'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cartao-recompensa-delete-popup',
    template: ''
})
export class CartaoRecompensaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cartaoRecompensa }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CartaoRecompensaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.cartaoRecompensa = cartaoRecompensa;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
