using BacklogUI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BacklogUI.Controllers
{
    public class BacklogController : Controller
    {
        private readonly IBacklogSelectorAPIService _backlogSelector;

        public BacklogController(IBacklogSelectorAPIService backlogSelector)
        {
            _backlogSelector = backlogSelector;
        }

        // GET: Backlog
        public ActionResult Index()
        {
            ViewBag.Title = "Backlog Boredom";
            return View();
        }

        [HttpPost]
        public async Task<string> GetSelectedGameAsync(string vanityUrl)
        {
            var result = await _backlogSelector.GetSelectedGame(vanityUrl);
            return result;
        }
    }
}