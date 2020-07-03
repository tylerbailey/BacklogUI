using System.Threading.Tasks;

namespace BacklogUI.Services
{
    public interface IBacklogSelectorAPIService
    {
        Task<string> GetSelectedGame(string vanityUrl);
    }
}