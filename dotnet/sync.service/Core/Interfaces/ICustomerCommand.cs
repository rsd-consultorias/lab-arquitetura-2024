namespace sync.service.Interfaces;

public interface ICustomerCommand
{
    void Save(object customer);
    void Delete(object customer);
}