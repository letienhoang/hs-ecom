import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '@abp/ng.core';
import { FormulaCategoryComponent } from './formulaCategory/formula-category.component';
import { MaterialCategoryComponent } from './materialCategory/material-category.component';
import { ToolCategoryComponent } from './toolCategory/tool-category.component';
import { TopicComponent } from './topic/topic.component';

const routes: Routes = [
  {
    path: 'formula-category',
    component: FormulaCategoryComponent,
    canActivate: [PermissionGuard],
    data: {
      requiredPolicy: 'HCNAdminCatalog.FormulaCategory',
    },
  },
  {
    path: 'material-category',
    component: MaterialCategoryComponent,
    canActivate: [PermissionGuard],
    data: {
      requiredPolicy: 'HCNAdminCatalog.MaterialCategory',
    },
  },
  {
    path: 'tool-category',
    component: ToolCategoryComponent,
    canActivate: [PermissionGuard],
    data: {
      requiredPolicy: 'HCNAdminCatalog.ToolCategory',
    },
  },
  {
    path: 'topic',
    component: TopicComponent,
    canActivate: [PermissionGuard],
    data: {
      requiredPolicy: 'HCNAdminCatalog.Topic',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
