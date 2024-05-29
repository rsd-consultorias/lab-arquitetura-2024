using System.Collections.ObjectModel;

namespace sync.service.Interfaces;

public interface ICustomerQuery {

    object FindById(Guid id);
    Collection<object> ListAll();
    Collection<object> SearchBy(object predicates);
}