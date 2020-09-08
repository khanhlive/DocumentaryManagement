using System.ComponentModel.DataAnnotations;

namespace DocumentaryManagement.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}