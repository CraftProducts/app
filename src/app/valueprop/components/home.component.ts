import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ValuePropState } from '../+state/valueprop.state';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { DataTypes, ChildTypes, OrientationTypes, ILayout } from '../template-schema';
import { LoadTemplateAction } from '../+state/valueprop.actions';

const productVisionBoardLayout: ILayout = {
    code: 'productVisionBoard',
    title: 'Product Vision Board',
    summary: 'Roman Pichler’s unique approach to your product’s value proposition doesn’t look at it from the lens of your user, but of your business.',
    orientation: OrientationTypes.Vertical,
    children: [
        { type: ChildTypes.Panel, size: 14, code: "VISION", title: "Vision", summary: "What is your purpose of creating this product", datatype: DataTypes.List },
        {
            type: ChildTypes.Container, size: 43, orientation: OrientationTypes.Horizontal, children: [
                { type: ChildTypes.Panel, size: 25, code: "TARGETGROUP", title: "Target Group", summary: "Summary of TargetGroup", datatype: DataTypes.List },
                { type: ChildTypes.Panel, size: 25, code: "NEEDS", title: "Needs", summary: "Summary of Needs", datatype: DataTypes.List },
                { type: ChildTypes.Panel, size: 25, code: "PRODUCTS", title: "Products", summary: "Summary of Products", datatype: DataTypes.List },
                { type: ChildTypes.Panel, size: 25, code: "BUSINESSGOALS", title: "Business Goals", summary: "Summary of BusinessGoals", datatype: DataTypes.List },
            ]
        },
        {
            type: ChildTypes.Container, size: 43, orientation: OrientationTypes.Horizontal, children: [
                { type: ChildTypes.Panel, size: 25, code: "COMPETITORS", title: "Competitors", summary: "Summary of Competitors", datatype: DataTypes.List },
                { type: ChildTypes.Panel, size: 25, code: "REVENUESTREAMS", title: "Revenue Streams", summary: "Summary of RevenueStreams", datatype: DataTypes.List },
                { type: ChildTypes.Panel, size: 25, code: "COSTFACTORS", title: "Cost Factors", summary: "Summary of Cost Factors", datatype: DataTypes.List },
                { type: ChildTypes.Panel, size: 25, code: "CHANNELS", title: "Channels", summary: "Summary of Channels", datatype: DataTypes.List },
            ]
        }
    ]
}

@Component({
    selector: 'app-valueprop-home',
    templateUrl: './home.component.html'
})
export class ValuePropHomeComponent implements OnInit {
    constructor(public store$: Store<ValuePropState>, public activatedRoute: ActivatedRoute) {
        activatedRoute.queryParams
            .pipe(filter(p => p && p["template"] && p["template"].length > 0), map(p => p["template"]))
            .subscribe(template => store$.dispatch(new LoadTemplateAction(template)));
    }

    layout: any;

    ngOnInit() {
        this.layout = _.cloneDeep(productVisionBoardLayout);
    }

}
