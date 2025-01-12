import { UserEntity } from '../model/user.entity';
import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { toUserDto } from 'src/shared/mapper';
import { LoginUserDto } from '../dto/user-login.dto';
import { CreateUserDto } from '../dto/user-create.dto';
import { comparePasswords } from 'src/shared/utils';
import { CreateUserFolderDto } from '../dto/user-folder.dto';
import { UserSignDto } from '../dto/user-sign.dto';
import { CoursesService } from 'src/modules/courses/service/courses-services.service';
import { CoursesEntity } from 'src/modules/courses/model/course.entity';
const fs = require('fs');

@Injectable()
export class UserService {
constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
            private readonly coursesService: CoursesService
            ) {}

    async findOne(options?: object): Promise<UserDto> {
        const user = await this.userRepo.findOne(options);    
        return toUserDto(user);  
    }

    async findByMail({ mail, password }: LoginUserDto): Promise<UserDto> {  
        const user = await this.userRepo
        .createQueryBuilder("user")
        .where({mail})
        .addSelect('user.password')
        .getOne()
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
        }
        
        // compare passwords    
        const areEqual = await comparePasswords(user.password, password);
        
        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
        }
        
        return toUserDto(user);  
    }

    async findByPayload({ mail }: any): Promise<UserDto> {
        return await this.findOne({ 
            where:  { mail } });  
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {    
        const { mail, password, name, secondname, role } = userDto;
        
        // check if the user exists in the db    
        const userInDb = await this.userRepo.findOne({ 
            where: { mail } 
        });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);    
        }
        
        const user: UserEntity = this.userRepo.create({ mail, password, name, secondname, role });
        await this.userRepo.save(user);
        return toUserDto(user);  
    }

    async UserDatabyMail(mail): Promise<UserDto> {    
        const user = await this.userRepo.findOne({ where: { mail } });
        
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
        }
        
        return toUserDto(user);  
    }

    async UpdateUserData(userDto:UserDto): Promise<UserDto>{
        const {id, name, secondname, about, pfp_path} = userDto;
        await this.userRepo.createQueryBuilder()
        .update()
        .set({name:name, secondname:secondname, about:about, pfp_path:pfp_path})
        .where("id=:id",{id:id})
        .execute()
        const user = await this.userRepo.findOne({where:{id}})
        return toUserDto(user);
    }

    async createUserFolder(createUserFolder:CreateUserFolderDto){
        const folderName = "assets/users/" + createUserFolder.name;
        try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
        } catch (err) {
        console.error(err);
        }
        return folderName
    }

    async signUserToCourse(signDto:UserSignDto): Promise<UserEntity>{
        const {userid, courseid} = signDto
        const user = await this.userRepo.findOne({relations:['signedCourses'],where: {id: userid}})

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
        }

        const course = await this.coursesService.FindCourseEntityByID(courseid)

        user.signedCourses.push(course)

        return await this.userRepo.save(user)
    }

    async UserCoursesByRole(mail:string) {
        const user = await this.UserDatabyMail(mail)

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
        }

        if(user.role == 'teacher') {
            return {
                courses: [...await this.TeacherCourses(user.id)],
                type: 'teacher'
            }
        }

        if(user.role == 'student') {
            return {
                courses: [...await this.StudentCourses(user.id)],
                type: 'student'
            }
        }

    }

    async StudentCourses(id:number): Promise<CoursesEntity[]>{
        if (!id) {
            throw new BadRequestException('invalid data')
        }
        
        const userSignedCourses = await this.userRepo
        .createQueryBuilder('user')
        .where("user.id=:id",{id:id})
        .leftJoinAndSelect('user.signedCourses','course')
        .getOne()

        return userSignedCourses.signedCourses
    }

    async TeacherCourses(id:number): Promise<CoursesEntity[]>{
        if (!id) {
            throw new BadRequestException('invalid data')
        }

        return await this.coursesService.CourseListWithSignedUsers(id)
    }

}
