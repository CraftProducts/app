export interface Templates {
  redirectTo: string;
//  breadcrumb: boolean;
  groups: any;
  groupTemplates: any;
}

export interface TemplatesState {
  readonly templates: Templates;
}
