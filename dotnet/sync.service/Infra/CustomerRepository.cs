using System.Collections.ObjectModel;
using sync.service.Interfaces;

public class CustomerRepository : ICustomerCommand, ICustomerQuery
{
    public void Delete(object customer)
    {
        var a = 1;
    }

    public object FindById(Guid id)
    {
        var a = 1;
        return null;
    }

    public Collection<object> ListAll()
    {
        var a = 1;
        return null;
    }

    public void Save(object customer)
    {
        var a = 1;
    }

    public Collection<object> SearchBy(object predicates)
    {
        var a = 1;
        return null;
    }
}