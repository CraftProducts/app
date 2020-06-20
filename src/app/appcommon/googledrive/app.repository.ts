import { Injectable } from "@angular/core";
import { UserRepository } from "./user.repository";
import { FileRepository } from "./file.repository";

@Injectable({ providedIn: 'root' })
export class AppRepository {
    constructor(
        private fileRepository: FileRepository,
        private userRepository: UserRepository
    ) {

    }
    get File(): FileRepository {
        return this.fileRepository;
    }
    get User(): UserRepository {
        return this.userRepository;
    }
}