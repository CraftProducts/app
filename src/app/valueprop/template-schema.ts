
export enum OrientationTypes {
    Horizontal = "horizontal",
    Vertical = "vertical"
}

export enum ChildTypes {
    Panel = "Panel",
    Container = "Container"
}

export enum DataTypes {
    Text = 'Text',
    List = 'List'
}
export interface ILayout {
    code: string,
    title: string,
    summary: string,
    orientation: OrientationTypes,
    children: Array<IChild>
}
export interface IChild {
    type: ChildTypes,
    size: number,
    orientation?: OrientationTypes,

    icon?: string,
    code?: string,
    title?: string,
    summary?: string,

    datatype?: DataTypes,
    maxRecords?: number,    //applicable when datatype = LIST
    data?: any, // this is not part of the template

    children?: Array<IChild>
}
