using Microsoft.AspNetCore.Mvc;
using sync.service.Interfaces;

namespace sync.service.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{

    private void Teste1(ICustomerCommand command) {
        command.Delete(null);
        command.Save(null);
    }

    private void Teste2(ICustomerQuery query) {
        query.FindById(Guid.NewGuid());
        query.ListAll();
        query.SearchBy(null);
    }


    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly ICustomerCommand _command;
    private readonly ICustomerQuery _query;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, ICustomerCommand command, ICustomerQuery query)
    {
        _command = command;
        _query = query;
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {

        Teste1(_command);
        Teste2(_query);

        _logger.LogWarning("teste warning");
        _logger.LogInformation("info ???");

        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
