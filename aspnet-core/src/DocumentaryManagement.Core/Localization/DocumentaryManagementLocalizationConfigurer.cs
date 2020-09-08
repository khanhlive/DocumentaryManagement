using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace DocumentaryManagement.Localization
{
    public static class DocumentaryManagementLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(DocumentaryManagementConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(DocumentaryManagementLocalizationConfigurer).GetAssembly(),
                        "DocumentaryManagement.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
