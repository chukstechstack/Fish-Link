using System.ComponentModel.DataAnnotations;

namespace LinkPulse.API.Models;

public class Link
{
    public int Id { get; set; }
    [Required(ErrorMessage = "Title is required")]
    public string Title { get; set; } = string.Empty;

    [Required(ErrorMessage = "URL is required")]
    [Url(ErrorMessage = "That doesnt look like a valid URL")]
    public string Url { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}