﻿using HCN.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace HCN.Admin.Permissions;

public class AdminPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        //Catalog
        var catalogGroup = context.AddGroup(AdminPermissions.CatalogGroupName, L("Permission:HCNAdminCatalog"));

        //Add Formula
        var formulaPermission = catalogGroup.AddPermission(AdminPermissions.Formula.Default, L("Permission:HCNAdminCatalog.Formula"));
        formulaPermission.AddChild(AdminPermissions.Formula.Create, L("Permission:HCNAdminCatalog.Formula.Create"));
        formulaPermission.AddChild(AdminPermissions.Formula.Update, L("Permission:HCNAdminCatalog.Formula.Update"));
        formulaPermission.AddChild(AdminPermissions.Formula.Delete, L("Permission:HCNAdminCatalog.Formula.Delete"));

        //Add Formula category
        var formulaCategoryPermission = catalogGroup.AddPermission(AdminPermissions.FormulaCategory.Default, L("Permission:HCNAdminCatalog.FormulaCategory"));
        formulaCategoryPermission.AddChild(AdminPermissions.FormulaCategory.Create, L("Permission:HCNAdminCatalog.FormulaCategory.Create"));
        formulaCategoryPermission.AddChild(AdminPermissions.FormulaCategory.Update, L("Permission:HCNAdminCatalog.FormulaCategory.Update"));
        formulaCategoryPermission.AddChild(AdminPermissions.FormulaCategory.Delete, L("Permission:HCNAdminCatalog.FormulaCategory.Delete"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<HCNResource>(name);
    }
}