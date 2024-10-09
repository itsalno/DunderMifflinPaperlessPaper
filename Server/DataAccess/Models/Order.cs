using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Order
{
    public int Id { get; set; }

    public string? OrderDate { get; set; }

    public string? DeliveryDate { get; set; }

    public string Status { get; set; } = null!;

    public double TotalAmount { get; set; }

    public int? CustomerId { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual ICollection<OrderEntry> OrderEntries { get; set; } = new List<OrderEntry>();
}
