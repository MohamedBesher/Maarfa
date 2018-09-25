using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;
using AutoMapper;
using Maarfa.Data.Core.Models;
using Newtonsoft.Json.Serialization;
using Saned.Maarfa.Api.Controllers;
using Saned.Maarfa.Api.Models;

namespace Saned.Maarfa.Api
{

    public class AutoMapperConfiguration
    {
        public static void Configure()
        {
            AutoMapper.Mapper.Initialize(x =>
            {
                x.AddProfile<MappingProfile>();
            });
        }
    }
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BookViewModel, Book>();
            CreateMap<VideoViewModel, Video>();
            CreateMap<SummaryViewModel, Summary>();
          
        }
    }
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );


            var enableCorsAttribute = new EnableCorsAttribute("*",
                                               "*",
                                               "*");
            config.EnableCors(enableCorsAttribute);


            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
