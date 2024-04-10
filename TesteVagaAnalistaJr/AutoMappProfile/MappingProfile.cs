using AutoMapper;
using TesteVagaAnalistaJr.DTOs;
using TesteVagaAnalistaJr.Models;

namespace Backend.AutoMapperProfile;

public class MappingProfile: Profile
{
    public MappingProfile() {
        CreateMap<Company, CompanyResponseDTO>();
        CreateMap<CreateCompanyRequestDTO, Company>();
        CreateMap<UpdateCompanyRequestDTO, Company>();
    }
}
