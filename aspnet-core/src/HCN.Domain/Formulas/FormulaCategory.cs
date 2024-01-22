﻿using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace HCN.Formulas
{
    public class FormulaCategory : CreationAuditedAggregateRoot<Guid>
    {
        public FormulaCategory()
        { }

        public string Name { get; set; }
        public string Slug { get; set; }
        public string CoverPicture { get; set; }
        public string Description { get; set; }
        public string KeywordSEO { get; set; }
        public string DescriptionSEO { get; set; }
        public Guid? ParentId { get; set; }
    }
}