import { Repository } from "typeorm"
import { City } from "../../entities/city.entity"
import { AppDataSource } from "../../data-source"
import { CityCreateDto } from "./dto/cityCreate.dto"
import { CityUpdateDto } from "./dto/cityUpdate.dto"
import { ErrorResponse } from "../../middlewares/types/errorResponse"

class Service {
    repository:Repository<City>
    constructor(){
        this.repository = AppDataSource.getRepository(City)
    }
    async findAll():Promise<City[]> {
        return this.repository.find({relations:['districts'], where:{deleted:false}})
    }

    async findOne(id:number):Promise<City | null> {
        return this.repository.findOne({relations:['districts'], where:{id,deleted:false}})
    }

    async create(dto:CityCreateDto):Promise<City> {
        const city = new City()
        city.name = dto.name
        return this.repository.save(city)
    }

    async update(dto:CityUpdateDto):Promise<City> {
        const city = await this.repository.findOneBy({id:dto.id})
        if(!city) {
            throw ErrorResponse.notFound("CITY_NOT_FOUND")
        }
        city.name = dto.name
        return this.repository.save(city)
    }

    async delete(id:number):Promise<void> {
        const city = await this.repository.findOneBy({id})
        if(!city) {
            throw ErrorResponse.notFound("CITY_NOT_FOUND")
        }
        city.deleted = true
        await this.repository.save(city)
    }
}

export default new Service()