using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace BacklogUI.Services
{
    public class BacklogSelectorAPIService : IBacklogSelectorAPIService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;
        public BacklogSelectorAPIService(IConfiguration config, IHttpClientFactory httpClientFactory)
        {
            _config = config;
            _httpClientFactory = httpClientFactory;
        }


        public async Task<string> GetSelectedGame(string vanityUrl)
        {
            string result;
            using (HttpClient client = _httpClientFactory.CreateClient())
            {
                var address = _config["BacklogAPI"].ToString();
                var content = new StringContent($"\"{ vanityUrl }\"", Encoding.UTF8, "application/json");
                var response = await client.PostAsync(address, content);
                result = await response.Content.ReadAsStringAsync();
            }
            return result;
        }
    }
}